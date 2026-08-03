/* eslint-disable react-hooks/incompatible-library */
import { useForm } from "react-hook-form";
import { ProductModel } from "../../../models/product-model";
import { productService } from "../../../services/product-service";
import { useNavigate } from "react-router-dom";
import "./add-product.css";
import { notify } from "../../../utils/notify";

export function AddProduct() {

    const { register, handleSubmit, watch } = useForm<ProductModel>();
    const navigate = useNavigate();
    
const imageFileList = watch("image") as unknown as FileList;
const previewSrc = imageFileList && imageFileList.length > 0 ? URL.createObjectURL(imageFileList[0]) : "";


    async function send(product: ProductModel) {
        try {
            // Extract the single File from the FileList back into product.image:
            product.image = (product.image as unknown as FileList)[0];
         

            // Send:
            await productService.addProduct(product);
            notify.success("Product has been added.");
            navigate("/products");
        } 
        catch (err) {
            if (err instanceof Error) {
                notify.error(err);
            }
        }
    }

    return (
        
        <div className="AddProduct">
                 <h2 className="add-product-main-title">Add product</h2>
            <form onSubmit={handleSubmit(send)}>

                <label>Name</label>
                <input type="text" {...register("name")} required minLength={2} maxLength={50} />

                <label>Price</label>
                <input type="number" {...register("price")} required min={0} max={1000} step={0.01} />

                <label>Stock</label>
                <input type="number" {...register("stock")} required min={0} max={1000} />

                <label>Image</label>
                <input type="file" accept="image/*" {...register("image")} required />
                
                {previewSrc && <img src={previewSrc} alt="preview" className="preview" />}
                 

                <button> ➕ Add</button>

            </form>

        </div>
    );
}