import { useEffect} from "react";
import { SupplierModel } from "../../../models/supplier-model";
import { supplierService } from "../../../services/supplier-service";
import "./supplier-list.css";
import { notify } from "../../../utils/notify";
import { useSelector } from "react-redux";
import { AppState } from "../../../redux/app-state";
import { useNavigate } from "react-router-dom";


 async  function deleteSupplier(_id: string) {
    try {
       await supplierService.deleteSupplier(_id)
        notify.success("Supplier has been deleted.")
    }
    catch (err) {
        notify.error(err);
    }
}


export function SupplierList() {
    
const navigate = useNavigate();  

const suppliers = useSelector<AppState, SupplierModel[]>(state => 
    state.suppliers)
  
    useEffect(() => {
    supplierService.getAllSuppliers()
        .catch(err => notify.error(err));
}, []);


    return (



<>
        <h2 className="suppliers-main-title">Our Suppliers</h2>

        <table className= "SupplierList">
            
    <thead>
        <tr>
            
            <th>Company</th>
            <th>Contact</th>
            <th>Country</th>
            <th>City</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Edit</th>
            <th>Delete</th>

        </tr>
    </thead>
    <tbody>
        {suppliers.map(s => (

            <tr key={s._id}>
                <td>{s.companyName}</td>
                <td>{s.contactName}</td>
                {/* country is a populated OBJECT — printing it directly crashes React */}
                <td>{s.country?.name}</td>
                <td>{s.city}</td>
                <td>{s.address}</td>
                <td>{s.phone}</td>

                <td><button onClick={() => navigate("/suppliers/edit/" + s._id)}>📝 Edit</button></td>
                <td><button onClick={() => deleteSupplier(s._id)}>🗑️ Delete</button></td>
            </tr>
        ))}
    </tbody>
</table>
        
        </>
    );
}
