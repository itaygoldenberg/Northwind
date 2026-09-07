import z from "zod";
import { ClientError } from "./client-error";
import { StatusCode } from "./enums";
import { UploadedFile } from "express-fileupload";

// Employee Schema:
const EmployeeSchema = z.object({
    id: z.number().int().positive().optional(),
    firstName: z.string().min(2).max(10),
    lastName: z.string().min(2).max(20),
    title: z.string().min(3).max(30),
    country: z.string().min(2).max(50),
    city: z.string().min(2).max(50),
    birthDate: z.string().min(8).max(30),
    imageName: z.string().min(30).max(50).optional(),
    image: z.custom<UploadedFile>().optional(),
    imageUrl: z.url().optional()
});

// Employee Interface (I = Interface):
type IEmployeeModel = z.infer<typeof EmployeeSchema>;

// Employee Model:
export class EmployeeModel implements IEmployeeModel {

    public id: number;
    public firstName: string;
    public lastName: string;
    public title: string;
    public country: string;   // The NAME, not the id — the client sends free text
    public city: string;      // The NAME, not the id
    public birthDate: string;
    public imageName: string;
    public image: UploadedFile;
    public imageUrl: string;

    public constructor(employee: EmployeeModel) { // Copy Constructor
        this.id = employee.id;
        this.firstName = employee.firstName;
        this.lastName = employee.lastName;
        this.title = employee.title;
        this.country = employee.country;
        this.city = employee.city;
        this.birthDate = employee.birthDate;
        this.imageName = employee.imageName;
        this.image = employee.image;
        this.imageUrl = employee.imageUrl;
    }

    public validate(): void {
        const result = EmployeeSchema.safeParse(this);
        if (!result.success) {
            const message = result.error.issues[0].path + ": " + result.error.issues[0].message;
            throw new ClientError(StatusCode.UnprocessableContent, message);
        }
    }

}
