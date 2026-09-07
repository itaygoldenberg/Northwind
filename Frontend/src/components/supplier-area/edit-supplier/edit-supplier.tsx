/* eslint-disable react-hooks/incompatible-library */
import "./edit-supplier.css";
import { useForm } from "react-hook-form";
import { SupplierModel } from "../../../models/supplier-model";
import { supplierService } from "../../../services/supplier-service";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { notify } from "../../../utils/notify";


export function EditSupplier() {

    const { register, handleSubmit , reset } = useForm<SupplierModel>();
    const navigate = useNavigate();
    const params = useParams();
    const _id = params.supId!; // MongoDB _id is a string — do NOT wrap it in Number()

// Init supplier details in the form fields:
useEffect(() => {
    supplierService.getOneSupplier(_id)
        .then(dbSupplier => reset({ ...dbSupplier, countryName: dbSupplier.country?.name }))
        .catch(err => notify.error(err));
}, []);

    async function send(supplier: SupplierModel) {
        try {

        supplier._id = _id;
        await supplierService.updateSupplier(supplier);
        notify.success("Supplier has been updated.");
        navigate("/suppliers");
    }
    catch (err) {
    if (err instanceof Error) {
        notify.error(err);
    }
}

    }
      return (
        <div className="EditSupplier">

            <h2 className="page-main-title">Edit Supplier</h2>

            <form onSubmit={handleSubmit(send)}>

               <label>Company</label>
                <input type="text" {...register("companyName")} required minLength={2} maxLength={100} />

                <label>Contact Name</label>
                <input type="text" {...register("contactName")} required minLength={2} maxLength={40} />

                <label>Contact Title</label>
                <input type="text" {...register("contactTitle")} required minLength={2} maxLength={40} />

                <label>Country</label>
                <input type="text" {...register("countryName")} required minLength={2} maxLength={50} />

                <label>City</label>
                <input type="text" {...register("city")} required minLength={2} maxLength={15} />

                  <label>Address</label>
                <input type="text" {...register("address")} required minLength={5} maxLength={60} />

                <label>Phone</label>
                <input type="text" {...register("phone")} required minLength={7} maxLength={24} />

                <button> 📝 Update</button>

            </form>

        </div>
    );
}