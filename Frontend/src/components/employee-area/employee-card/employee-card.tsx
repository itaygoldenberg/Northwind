import { EmployeeModel } from "../../../models/employee-model";
import { useNavigate } from "react-router-dom";
import "./employee-card.css";

type EmployeeCardProps = {
employee : EmployeeModel;

};


export function EmployeeCard({ employee }: EmployeeCardProps) {
    
    // Create a navigation function:
    const navigate = useNavigate();
    
    
    function showDetails(): void{

        // Navigate to the employee details page using lowercase path:
        navigate("/employees/details/" + employee.id)
    }





    return (
        <div className="EmployeeCard" onClick={showDetails}>
        <img src ={employee.imageUrl} alt = {`${employee.firstName} ${employee.lastName}`} />
        <div className="employee-details">
        <h3>{employee.firstName} {employee.lastName}</h3>
        <p className="employee-title">{employee.title}</p>
        <p className="employee-location"> 📍 {employee.city}, {employee.country}</p>
        <p className="employee-birthday"> 📅 {new Date(employee.birthDate).toLocaleDateString()}</p>

        </div>
        </div>
    );
}
