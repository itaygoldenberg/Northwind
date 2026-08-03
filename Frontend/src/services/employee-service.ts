import { EmployeeModel } from "../models/employee-model";
import { appConfig } from "../utils/app-config";
import axios from "axios";
import { formUtil } from "../utils/form-util";
import { store } from "../redux/store";
import { employeeSlice } from "../redux/employee-slice";

class EmployeeService {

    // Fetch all employees:
    public async getAllEmployees(): Promise<EmployeeModel[]> {

        // If we already have the employees in our global state - return them:
        if(store.getState().employees.length > 0) {
            return store.getState().employees;
        }

        // Fetch employees from backend:
        const response = await axios.get<EmployeeModel[]>(appConfig.employeesUrl);
        const employees = response.data;

        // Init employees in global state:
        const action = employeeSlice.actions.initEmployees(employees);
        store.dispatch(action);

        // Return backend employees:
        return employees;
    }

    // Fetch one Employee:
    public async getOneEmployee(id: number): Promise<EmployeeModel> {
        const response = await axios.get<EmployeeModel>(appConfig.employeesUrl + "/" + id);
        const Employee = response.data;
        return Employee;
    }

    // Add Employee:
    public async addEmployee(Employee: EmployeeModel): Promise<void> {
        const response = await axios.post<EmployeeModel>(appConfig.employeesUrl, formUtil.toEmployeeFormData(Employee));
        const dbEmployee = response.data;
        console.log(dbEmployee);
    }

    // Update Employee:
    public async updateEmployee(Employee: EmployeeModel): Promise<void> {
        const response = await axios.put<EmployeeModel>(appConfig.employeesUrl + "/" + Employee.id, formUtil.toEmployeeFormData(Employee));
        const dbEmployee = response.data;
        console.log(dbEmployee);
    }

    // Delete Employee:
    public async deleteEmployee(id: number): Promise<void> {
        await axios.delete(appConfig.employeesUrl + "/" + id);
    }
}

export const employeeService = new EmployeeService();