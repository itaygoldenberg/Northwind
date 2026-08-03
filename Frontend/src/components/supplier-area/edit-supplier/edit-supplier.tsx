/* eslint-disable react-hooks/incompatible-library */
import "./edit-supplier.css";
import { useForm } from "react-hook-form";
import { SupplierModel } from "../../../models/supplier-model";
import { supplierService } from "../../../services/supplier-service";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { notify } from "../../../utils/notify";


export function EditSupplier() {

    const { register, handleSubmit , reset , watch } = useForm<SupplierModel>();
    const navigate = useNavigate();
    const params = useParams();
    const id = Number(params.supId);



const imageFileList = watch("image") as unknown as FileList;
const existingImageUrl = watch("imageUrl")
const previewSrc = imageFileList && imageFileList.length > 0 ? URL.createObjectURL(imageFileList[0]) : existingImageUrl;

// Init supplier details in the form fields:
useEffect(() => {
    supplierService.getOneSupplier(id)
        .then(dbSupplier => reset(dbSupplier))
        .catch(err => notify.error(err));
}, []);

    async function send(supplier: SupplierModel) {
        try {

       supplier.id = id;
        if(supplier.image) {
            supplier.image = (supplier.image as unknown as FileList)[0];
        }
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
                <input type="file" accept="image/*" {...register("image")}  />
                 
                {previewSrc && <img src={previewSrc} alt="preview" className="preview" />}
                 


                <button> 📝 Update</button>

            </form>

        </div>
    );
}