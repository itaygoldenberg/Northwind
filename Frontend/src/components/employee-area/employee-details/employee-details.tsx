import "./employee-details.css";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { EmployeeModel } from "../../../models/employee-model";
import { useEffect, useState } from "react";
import { employeeService } from "../../../services/employee-service";
import { notify } from "../../../utils/notify";

export function EmployeeDetails() {

    const [Employee, setEmployee] = useState<EmployeeModel>();
  const navigate = useNavigate();

    // Route parameters object:
    const params = useParams();

    // Read route parameter:
    const id = Number(params.empId); // empId is the same name used in the route.

    useEffect(() => {
        employeeService.getOneEmployee(id)
            .then(dbEmployee =>  setEmployee(dbEmployee))
            .catch(err => notify.error(err));
    }, []);


   async function deleteMe(){
        try{
            const sure = confirm("Are you sure?");
            if(sure){

           
            await employeeService.deleteEmployee(id);
           notify.success("Employee has been deleted.")
            navigate("/Employees") 
     }
        }
        catch (err) {
            if (err instanceof Error) {
                notify.error(err);
            }
        }
    }
    return (
        <div className="EmployeeDetails">

           <h3>First Name: {Employee?.firstName}</h3>
           <h3>Last Name: {Employee?.lastName}</h3>
           <h3>Title: {Employee?.title}</h3>
           <h3>Country: {Employee?.country}</h3>
           <h3>City: {Employee?.city}</h3>
           <h3>Birth Date: {Employee?.birthDate}</h3>
           <img src={Employee?.imageUrl} />


           <br /> <br />

        <NavLink to="/employees"> 🔙 Back</NavLink>
        <span> | </span>
       <NavLink to={"/employees/edit/" + Employee?.id}> 📝 Edit</NavLink>
       
       <NavLink to="#" onClick={deleteMe}> 🗑️ Delete</NavLink>

        </div>
    );
}