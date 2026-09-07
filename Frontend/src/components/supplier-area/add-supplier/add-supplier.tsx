/* eslint-disable react-hooks/incompatible-library */
import { useForm } from "react-hook-form";
import { SupplierModel } from "../../../models/supplier-model";
import { supplierService } from "../../../services/supplier-service";
import { useNavigate } from "react-router-dom";
import "./add-supplier.css";
import { notify } from "../../../utils/notify";

export function AddSupplier() {

    const { register, handleSubmit } = useForm<SupplierModel>();
    const navigate = useNavigate();

    async function send(supplier: SupplierModel) {
        try {
            // Send:
            await supplierService.addSupplier(supplier);
            notify.success("Supplier has been added.");
            navigate("/suppliers");
        } 
        catch (err) {
            if (err instanceof Error) {
                notify.error(err);
            }
        }
    }

    return (
        
        <div className="AddSupplier">
                 <h2 className="add-supplier-main-title">Add supplier</h2>
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

                <button> ➕ Add</button>

            </form>

        </div>
    );
}