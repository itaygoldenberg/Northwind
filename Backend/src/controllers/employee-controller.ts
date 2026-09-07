import express, { Request, Response, Router } from "express";
import { saver } from "smart-saver";
import { securityMiddleware } from "../middleware/security-middleware";
import { EmployeeModel } from "../models/employee-model";
import { StatusCode } from "../models/enums";
import { employeeService } from "../services/employee-service";

// Contains routes, without logic.
class EmployeeController {

    // Create a router object which can listen on routes:
    public router: Router = express.Router();

    // Constructor - register routes:
    public constructor() {
        this.router.get("/api/employees", this.getAllEmployees);
        // "/images/:imageName" is two segments so "/:id" cannot swallow it,
        // but keeping specific routes first is the safe habit.
        this.router.get("/api/employees/images/:imageName", this.getImage);
        this.router.get("/api/employees/:id", this.getOneEmployee);
        this.router.post("/api/employees", securityMiddleware.verifyLoggedIn, this.addEmployee);
        this.router.put("/api/employees/:id", securityMiddleware.verifyLoggedIn, this.updateEmployee);
        this.router.delete("/api/employees/:id", securityMiddleware.verifyAdmin, this.deleteEmployee);
    }

    // Get all employees:
    private async getAllEmployees(request: Request, response: Response): Promise<void> {
        const employees = await employeeService.getAllEmployees();
        response.json(employees);
    }

    // Get one employee:
    private async getOneEmployee(request: Request, response: Response): Promise<void> {
        const id = +request.params.id;
        const employee = await employeeService.getOneEmployee(id);
        response.json(employee);
    }

    // Add employee:
    private async addEmployee(request: Request, response: Response): Promise<void> {
        request.body.image = request.files?.image;
        const employee = new EmployeeModel(request.body);
        const dbEmployee = await employeeService.addEmployee(employee);
        response.status(StatusCode.Created).json(dbEmployee);
    }

    // Update employee:
    private async updateEmployee(request: Request, response: Response): Promise<void> {
        request.body.id = +request.params.id;
        request.body.image = request.files?.image;
        const employee = new EmployeeModel(request.body);
        const dbEmployee = await employeeService.updateEmployee(employee);
        response.json(dbEmployee);
    }

    // Delete employee:
    private async deleteEmployee(request: Request, response: Response): Promise<void> {
        const id = +request.params.id;
        await employeeService.deleteEmployee(id);
        response.sendStatus(StatusCode.NoContent);
    }

    // Get image by name:
    private getImage(request: Request, response: Response): void {
        const imageName = request.params.imageName.toString();
        const filePath = saver.getFilePath(imageName);
        response.sendFile(filePath);
    }

}

export const employeeController = new EmployeeController();
