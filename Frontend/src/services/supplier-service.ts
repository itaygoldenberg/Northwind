import axios from "axios";
import { appConfig } from "../utils/app-config";
import { store } from "../redux/store";
import { SupplierModel } from "../models/supplier-model";
import { supplierSlice } from "../redux/supplier-slice";

 
class SupplierService {
 
    // Fetch all suppliers:
    public async getAllSuppliers(): Promise<SupplierModel[]> {
 
        // If we have suppliers in global state - return them:
           if (store.getState().suppliers.length > 0) {
           return store.getState().suppliers;
        }
 
        // We don't have suppliers in our global - get them from backend:
        const response = await axios.get<SupplierModel[]>(appConfig.suppliersUrl);
        const suppliers = response.data;
 
        // Init all suppliers in global state:
        const action = supplierSlice.actions.initSuppliers(suppliers);
        store.dispatch(action);
 
        // Return suppliers:
        return suppliers;
    }
 
    // Fetch one supplier:
    public async getOneSupplier(_id: string): Promise<SupplierModel> {

        // If supplier already exists in our global state - return it:
        const supplier = store.getState().suppliers.find(p => p._id === _id);
        if (supplier) {
            return supplier;
        }

        // We don't have that supplier in global state - get it from backend:
        const response = await axios.get<SupplierModel>(appConfig.suppliersUrl + "/" + _id);
        const dbSupplier = response.data;

        // Return backend supplier:
        return dbSupplier;
    }

    // Add supplier:
    public async addSupplier(supplier: SupplierModel): Promise<void> {

        // Suppliers have no image, so we send plain JSON and not FormData:
        const response = await axios.post<SupplierModel>(appConfig.suppliersUrl, supplier);
        const dbSupplier = response.data;

        // Add supplier to global state:
        const action = supplierSlice.actions.addSupplier(dbSupplier);
        store.dispatch(action);
    }

    // Update supplier:
    public async updateSupplier(supplier: SupplierModel): Promise<void> {

        // Send supplier to backend:
        const response = await axios.put<SupplierModel>(appConfig.suppliersUrl + "/" + supplier._id, supplier);
        const dbSupplier = response.data;

        // Update supplier in global state:
        const action = supplierSlice.actions.updateSupplier(dbSupplier);
        store.dispatch(action);
    }

    // Delete supplier:
    public async deleteSupplier(_id: string): Promise<void> {

        // Delete supplier from backend:
        await axios.delete(appConfig.suppliersUrl + "/" + _id);

        // Delete supplier from global state:
        const action = supplierSlice.actions.deleteSupplier(_id);
        store.dispatch(action);
    }


    } 
 

 
export const supplierService = new SupplierService();    

        // Without interceptor we need to send token in each request requiring token:
        // const token = localStorage.getItem("token");
        // const options = {
        //     headers: {
        //         authorization: "Bearer " + token
        //     }
        // };

    

   
 
// // Using fetch:
// class SupplierService {
 
//     public async getAllSuppliers(): Promise<SupplierModel[]> {
//         const response = await fetch(appConfig.suppliersUrl);
//         const suppliers = await response.json();
//         return suppliers;
//     }
 
//     public async getOneSupplier(id: number): Promise<SupplierModel> {
//         const response = await fetch(appConfig.suppliersUrl + "/" + id);
//         const supplier = await response.json();
//         return supplier;
//     }
 
//     public async addSupplier(supplier: SupplierModel): Promise<void> {
//         const options = {
//             method: "POST", // Send a POST request
//             headers: {
//                 "Content-Type": "application/json" // send the data in JSON format
//             },
//             body: JSON.stringify(supplier) // Send the supplier
//         };
//         const response = await fetch(appConfig.suppliersUrl, options);
//         const dbSupplier = await response.json();
//         console.log(dbSupplier);
//     }
 
// }
 
 