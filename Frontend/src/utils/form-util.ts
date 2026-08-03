import { ProductModel } from "../models/product-model";
import { EmployeeModel } from "../models/employee-model";
import { SupplierModel } from "../models/supplier-model";


class FormUtil {



//Products

    public toProductFormData(product: ProductModel): FormData {
        const productFormData = new FormData();
        productFormData.append("name", product.name);
        productFormData.append("price", product.price.toString());
        productFormData.append("stock", product.stock.toString());
        productFormData.append("image", product.image);
        return productFormData;

        
    }

    //Employees 


 public toEmployeeFormData(employee: EmployeeModel): FormData {
 const employeeFormData= new FormData();

employeeFormData.append("firstName", employee.firstName);
        employeeFormData.append("lastName", employee.lastName);
        employeeFormData.append("title", employee.title);
        employeeFormData.append("country", employee.country);
        employeeFormData.append("city", employee.city);
        employeeFormData.append("birthDate", employee.birthDate);
        


if(employee.image){
    employeeFormData.append("image" , employee.image);
}

 return employeeFormData;
 
 }


    
//Suppliers
 public toSupplierFormData(supplier: SupplierModel): FormData {
 const supplierFormData= new FormData();

      supplierFormData.append("id", supplier.id.toString());
      supplierFormData.append("company", supplier.company);
      supplierFormData.append("country", supplier.country);
      supplierFormData.append("city", supplier.city);
      supplierFormData.append("address", supplier.address);
      supplierFormData.append("phone", supplier.phone);
     


if(supplier.image){
    supplierFormData.append("image" , supplier.image);
}

 return supplierFormData;
 
 }


}




export const formUtil = new FormUtil();



