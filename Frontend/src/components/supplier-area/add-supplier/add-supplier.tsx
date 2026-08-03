/* eslint-disable react-hooks/incompatible-library */
import { useForm } from "react-hook-form";
import { SupplierModel } from "../../../models/supplier-model";
import { supplierService } from "../../../services/supplier-service";
import { useNavigate } from "react-router-dom";
import "./add-supplier.css";
import { notify } from "../../../utils/notify";

export function AddSupplier() {

    const { register, handleSubmit, watch } = useForm<SupplierModel>();
    const navigate = useNavigate();
    
const imageFileList = watch("image") as unknown as FileList;
const previewSrc = imageFileList && imageFileList.length > 0 ? URL.createObjectURL(imageFileList[0]) : "";


    async function send(supplier:SupplierModel) {
        try {
            // Extract the single File from the FileList back into supplier.image:
            supplier.image = (supplier.image as unknown as FileList)[0];
            

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
                <input type="text" {...register("company")} required minLength={2} maxLength={40} />

                <label>Country</label>
                <input type="text" {...register("country")} required minLength={2} maxLength={15} />

                <label>City</label>
                <input type="text" {...register("city")} required minLength={2} maxLength={15} />

                  <label>Address</label>
                <input type="text" {...register("address")} required minLength={5} maxLength={60} />

                <label>Phone</label>
                <input type="text" {...register("phone")} required minLength={7} maxLength={24} />

            
                <label>Image</label>
                <input type="file" accept="image/*" {...register("image")} required />
                
                {previewSrc && <img src={previewSrc} alt="preview" className="preview" />}
                 

                <button> ➕ Add</button>

            </form>

        </div>
    );
}