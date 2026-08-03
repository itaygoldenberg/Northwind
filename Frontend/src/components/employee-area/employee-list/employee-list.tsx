import { useEffect, useState } from "react";
import "./employee-list.css";
import { EmployeeModel } from "../../../models/employee-model";
import { employeeService } from "../../../services/employee-service";
import { EmployeeCard } from "../employee-card/employee-card";
import { notify } from "../../../utils/notify";

export function EmployeeList() {

    const [employees, setEmployees] = useState<EmployeeModel[]>([]);

    useEffect(()=>{
        employeeService.getAllEmployees()
            .then(employees => setEmployees(employees))
            .catch(err => notify.error(err.message));
    }, []);

return (
        <>
            <h2 className="employees-main-title">Our Employees</h2>
            <div className="EmployeeList">
                {employees.map(emp => <EmployeeCard key={emp.id} employee={emp} />)}
            </div>
        </>
    );
}