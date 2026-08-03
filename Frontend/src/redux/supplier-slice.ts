import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SupplierModel } from "../models/supplier-model";

// Reducer - add supplier:
function addSupplier(currentState: SupplierModel[], action: PayloadAction<SupplierModel>): SupplierModel[] {
    const supplierToAdd = action.payload; // Take supplier to add.
    const newState = [...currentState]; // Duplicate currentState into newState.
    newState.push(supplierToAdd); // Add the supplier.
    return newState; // Return the new state so it could replace the currentState.
}

// Reducer - update supplier: 
function updateSupplier(currentState: SupplierModel[], action: PayloadAction<SupplierModel>): SupplierModel[] {
    const supplierToUpdate = action.payload; // Take supplier to update.
    const newState = [...currentState]; // Duplicate currentState into newState.
    const index = newState.findIndex(p => p.id === supplierToUpdate.id); // Find the index of the supplier to update.
    if(index >= 0) {
        newState[index] = supplierToUpdate; // Update that supplier.
    }
    return newState; // Return the new state so it could replace the currentState.
}

// Reducer - delete supplier: 
function deleteSupplier(currentState: SupplierModel[], action: PayloadAction<number>): SupplierModel[] {
    const idToDelete = action.payload; // Take supplier id to delete.
    const newState = [...currentState]; // Duplicate currentState into newState.
    const index = newState.findIndex(p => p.id === idToDelete); // Find the index of the supplier to delete.
    if(index >= 0) {
        newState.splice(index, 1); // Delete that supplier.
    }
    return newState; // Return the new state so it could replace the currentState.
}

// Reducer - init all suppliers: 
function initSuppliers(_currentState: SupplierModel[], action: PayloadAction<SupplierModel[]>): SupplierModel[] {
    const suppliersToInit = action.payload; // Take all suppliers to init.
    const newState = suppliersToInit; // New state is the given suppliers.
    return newState; // Return new state to init all suppliers.
}

// Slice for handling suppliers:
export const supplierSlice = createSlice({
    name: "supplier-slice", // Unique name for this slice.
    initialState: [] as SupplierModel[], // The initial state before calling any reducer.
    reducers: { addSupplier, updateSupplier, deleteSupplier, initSuppliers } // Our reducers.
});
