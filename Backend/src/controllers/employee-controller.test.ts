import { describe, it } from "mocha";
import { expect } from "chai";
import supertest from "supertest";
import { app } from "../app";
import { EmployeeModel } from "../models/employee-model";
import { helper } from "../utils/helper";
import { StatusCode } from "../models/enums";

describe("EmployeeController", () => {
  let token: string;
  let newEmployeeId: number;
  let adminToken: string; 

  before(async () => {
    await helper.delay(500); // Wait for the server to go live.
    const credentials = { email: "bart@gmail.com", password: "1234" };
    const response = await supertest(app.server)
      .post("/api/login")
      .send(credentials);
    token = response.body;
    const adminCredentials = { email: "itay@test.com", password: "1234" };
    const adminResponse = await supertest(app.server).post("/api/login").send(adminCredentials);
    adminToken = adminResponse.body;
  });
  it("should return employee array", async () => {
    const response = await supertest(app.server).get("/api/employees");
    const employees = response.body as EmployeeModel[];
    expect(employees.length).to.be.greaterThanOrEqual(1);
    expect(employees[0]).to.not.be.empty;
  });
  it("should return one employee", async () => {
    const response = await supertest(app.server).get("/api/employees/1");
    const employee = response.body as EmployeeModel;
    expect(employee).to.not.be.empty;
    expect(employee).to.contain.keys(
      "id",
      "firstName",
      "lastName",
      "birthDate",
    );
  });
  it("should add a new employee", async () => {
    const employee = {
      firstName: "John",
      lastName: "Doe",
      title: "Developer",
      country: "USA",
      city: "Albuquerque",
      birthDate: "1990-01-01",
    };
    const response = await supertest(app.server)
      .post("/api/employees")
      .auth(token, { type: "bearer" })
      .send(employee);
    const dbEmployee = response.body as EmployeeModel;
    expect(dbEmployee).to.contain.keys(
      "id",
      "firstName",
      "lastName",
      "birthDate",
    );
    expect(response.status).equal(StatusCode.Created);
    newEmployeeId = dbEmployee.id;
  });
  it("should update an employee", async () => {
    const employee = {
      firstName: "Jane",
      lastName: "Smith",
      title: "Senior Developer",
      country: "USA",
      city: "Albuquerque",
      birthDate: "1990-01-01",
    };
    const response = await supertest(app.server)
      .put(`/api/employees/${newEmployeeId}`)
      .auth(token, { type: "bearer" })
      .send(employee);
    const dbEmployee = response.body as EmployeeModel;
    expect(dbEmployee.firstName).equal("Jane");
    expect(response.status).equal(StatusCode.OK);
  });
    it("should delete an employee", async () => {
    const response = await supertest(app.server)
      .delete(`/api/employees/${newEmployeeId}`)
      .auth(adminToken, { type: "bearer" });

    expect(response.status).equal(StatusCode.NoContent);
  });
    it("should return 404 status on employee not found", async () => {
    const response = await supertest(app.server).get("/api/employees/4999999");
    expect(response.status).equal(StatusCode.NotFound);
  });
});
