// Runs from docker-entrypoint-initdb.d, after import.sh has restored the dump.
// Files there run in alphabetical order, and "import" sorts before "migrate".
//
// The dump stores each supplier's country as a plain string:
//     { companyName: "Exotic Liquids", country: "UK", ... }
//
// but SupplierSchema declares countryId and a virtual named "country" that
// populates from the countries collection. The virtual has the same name as the
// stored string, so it shadows it, and every supplier answers country: null -
// which is why the COUNTRY column renders empty.
//
// This lifts the seeded data into the shape the model expects: one document per
// country, a countryId on each supplier, and the old string removed. The write
// path already does the same thing through getCountryId().
//
// Idempotent - running it twice changes nothing the second time.

const northwind = db.getSiblingDB("northwind");

const pending = northwind.suppliers.find({ country: { $type: "string" } }).toArray();
let migrated = 0;

for (const supplier of pending) {
    const name = supplier.country;

    let country = northwind.countries.findOne({ name: name });
    if (!country) {
        const result = northwind.countries.insertOne({ name: name });
        country = { _id: result.insertedId };
    }

    northwind.suppliers.updateOne(
        { _id: supplier._id },
        { $set: { countryId: country._id }, $unset: { country: "" } }
    );
    migrated++;
}

print("migrate-countries: " + migrated + " supplier(s) migrated, " +
      northwind.countries.countDocuments() + " country document(s) present.");
