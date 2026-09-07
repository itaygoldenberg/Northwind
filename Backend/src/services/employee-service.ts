import { OkPacketParams } from "mysql2";
import { saver } from "smart-saver";
import { EmployeeModel } from "../models/employee-model";
import { ClientError } from "../models/client-error";
import { StatusCode } from "../models/enums";
import { appConfig } from "../utils/app-config";
import { dal } from "../utils/dal";
import { orderService } from "../services/order-service";

// The client works with country/city NAMES, but the table stores countryId/cityId,
// so every read joins the lookup tables and every write resolves the name back to an id.
const SELECT_EMPLOYEE = `
    select e.id, e.firstName, e.lastName, e.title,
           c.name as country, ci.name as city,
           e.birthDate, e.imageName,
           concat(?, e.imageName) as imageUrl
    from employees e
    left join countries c on c.id = e.countryId
    left join cities ci on ci.id = e.cityId
`;

// Employees logic:
class EmployeeService {
  // Get all employees:
  public async getAllEmployees(): Promise<EmployeeModel[]> {
    // Create SQL:
    const sql = SELECT_EMPLOYEE + " order by e.id";
    const values = [appConfig.employeeImagesBaseUrl];

    // Execute:
    const employees = (await dal.execute(sql, values)) as EmployeeModel[];

    // Return:
    return employees;
  }
  // Get all countries:
  public async getAllCountries(): Promise<any[]> {
    const sql = "select id, name from countries order by name";

    const countries = await dal.execute(sql);

    return countries as any[];
  }

  // Get all cities:
  public async getAllCities(): Promise<any[]> {
    const sql = "select id, name from cities order by name";

    const cities = await dal.execute(sql);

    return cities as any[];
  }

  // Get one employee:
  public async getOneEmployee(id: number): Promise<EmployeeModel> {
    // Create SQL:
    const sql = SELECT_EMPLOYEE + " where e.id = ?";
    const values = [appConfig.employeeImagesBaseUrl, id];

    // Execute (DAL always returns an array):
    const employees = (await dal.execute(sql, values)) as EmployeeModel[];

    // Extract the single employee:
    const employee = employees[0];

    // If no such employee:
    if (!employee) {
      throw new ClientError(StatusCode.NotFound, `id ${id} not found.`);
    }

    // Return:
    return employee;
  }

  // Add employee:
  public async addEmployee(employee: EmployeeModel): Promise<EmployeeModel> {
    // Validation:
    employee.validate();

    // Resolve the free-text names into foreign keys:
    const countryId = await this.getOrCreateLookupId(
      "countries",
      employee.country,
    );
    const cityId = await this.getOrCreateLookupId("cities", employee.city, countryId);    // Save image to disk:
    const imageName = await saver.save(employee.image);

    // SQL:
    const sql =
      "insert into employees(firstName, lastName, title, countryId, cityId, birthDate, imageName) values(?, ?, ?, ?, ?, ?, ?)";
    const values = [
      employee.firstName,
      employee.lastName,
      employee.title,
      countryId,
      cityId,
      employee.birthDate,
      imageName,
    ];

    // Execute:
    const info = (await dal.execute(sql, values)) as OkPacketParams;

    // Return the added employee:
    return await this.getOneEmployee(info.insertId!);
  }

  // Update employee:
  public async updateEmployee(employee: EmployeeModel): Promise<EmployeeModel> {
    // Validation:
    employee.validate();

    // Resolve the free-text names into foreign keys:
    const countryId = await this.getOrCreateLookupId(
      "countries",
      employee.country,
    );
    const cityId = await this.getOrCreateLookupId("cities", employee.city , countryId);

    // Update image (keeps the old one when no new file was sent):
    const oldImageName = await this.getImageName(employee.id);
    const newImageName = await saver.update(employee.image, oldImageName!);

    // SQL:
    const sql =
      "update employees set firstName = ?, lastName = ?, title = ?, countryId = ?, cityId = ?, birthDate = ?, imageName = ? where id = ?";
    const values = [
      employee.firstName,
      employee.lastName,
      employee.title,
      countryId,
      cityId,
      employee.birthDate,
      newImageName,
      employee.id,
    ];

    // Execute:
    const info = (await dal.execute(sql, values)) as OkPacketParams;

    // If no such employee:
    if (info.affectedRows === 0) {
      throw new ClientError(
        StatusCode.NotFound,
        `id ${employee.id} not found.`,
      );
    }

    // Return the updated employee:
    return await this.getOneEmployee(employee.id);
  }

  // Delete employee:
  public async deleteEmployee(id: number): Promise<void> {
    // Take image name BEFORE deleting the row:
    const oldImageName = await this.getImageName(id);

    // SQL:
    const sql = "delete from employees where id = ?";
    const values = [id];

    // Execute:
    const info = (await dal.execute(sql, values)) as OkPacketParams;

    // If no such employee:
    if (info.affectedRows === 0) {
      throw new ClientError(StatusCode.NotFound, `id ${id} not found.`);
    }

    // Delete image:
    if (oldImageName) {
      await saver.delete(oldImageName);
    }
  }

  // Get image name from db:
  private async getImageName(id: number): Promise<string | null> {
    const sql = "select imageName from employees where id = ?";
    const values = [id];
    const employees = (await dal.execute(sql, values)) as EmployeeModel[];
    const employee = employees[0];
    if (!employee) return null;
    return employee.imageName;
  }

  // Find a country/city id by name, and create the row if it does not exist yet.
  // The table name is NOT user input — it is hard-coded at the call site, never concatenated from the request.
  private async getOrCreateLookupId(
    table: "countries" | "cities",
    name: string,
    countryId?: number,
  ): Promise<number> {
    const existing = (await dal.execute(
      `select id from ${table} where name = ?`,
      [name],
    )) as { id: number }[];
    if (existing[0]) return existing[0].id;

      // A city row cannot exist without its country, so pass it along when creating one.
    const sql =
      table === "cities"
        ? `insert into cities(name, countryId) values(?, ?)`
        : `insert into countries(name) values(?)`;

    const values = table === "cities" ? [name, countryId!] : [name];

    const info = (await dal.execute(sql, values)) as OkPacketParams;
    return info.insertId!;
  }
}

export const employeeService = new EmployeeService();
