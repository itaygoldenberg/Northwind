// The country object that comes back inside a populated supplier.
export type CountryModel = {
    _id: string;
    name: string;
}

// Matches the mongoose schema in Backend\src\models\supplier-model.ts.
// MongoDB has no numeric id and suppliers have no image — the key is _id, a 24-char string.
export type SupplierModel = {
    _id: string;
    companyName: string;
    contactName: string;
    contactTitle: string;
    city: string;
    address: string;
    phone: string;
    fax: string;

    countryId: string;      // The foreign key actually stored in the document
    country: CountryModel;  // Virtual field — only filled when the server calls .populate("country")

    countryName: string;    // Free text typed in the form; the server turns it into countryId
}
