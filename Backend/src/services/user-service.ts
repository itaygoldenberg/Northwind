import { OkPacketParams } from "mysql2";
import { UserModel } from "../models/user-model";
import { dal } from "../utils/dal";
import { cyber } from "../utils/cyber";
import { CredentialsModel } from "../models/credentials-model";
import { ClientError } from "../models/client-error";
import { Role, StatusCode } from "../models/enums";

class UserService {

    // Add user:
    public async addUser(user: UserModel): Promise<string> {

        // Validation:
        user.validate();

        // Set lowest role when registering:
        user.roleId = Role.User;

        // Hash password:
        user.password = cyber.hash(user.password);

        // If email taken: 
        if (await this.isEmailTaken(user.email)) {
            throw new ClientError(StatusCode.Conflict, "Email already taken.");
        }

        // SQL:
        const sql = "insert into users(firstName, lastName, email, password, roleId) values(?, ?, ?, ?, ?)";
        const values = [user.firstName, user.lastName, user.email, user.password, user.roleId];

        // Execute: 
        const info = await dal.execute(sql, values) as OkPacketParams;
        user.id = info.insertId!;

        // Generate token:
        const token = cyber.generateToken(user);

        // Return token:
        return token;
    }

    // Login:
    public async login(credentials: CredentialsModel): Promise<string> {

        // Validation:
        credentials.validate();

        // Hash password:
        credentials.password = cyber.hash(credentials.password);

        // SQL:
        const sql = "select * from users where email = ? and password = ?";
        const values = [credentials.email, credentials.password];
        // const sql = `select * from users where email = '${credentials.email}' and password = '${credentials.password}'`;

        // Execute: 
        const users = await dal.execute(sql, values) as UserModel[];
        //const users = await dal.execute(sql) as UserModel[];
        const user = users[0];

        // If no such user:
        if (!user) {
            throw new ClientError(StatusCode.Unauthorized, "Incorrect email or password.");
        }

        // Generate token:
        const token = cyber.generateToken(user);

        // Return token:
        return token;
    }

    // Check if email already taken:
    private async isEmailTaken(email: string): Promise<boolean> {

        // SQL:
        const sql = "select id from users where email = ?";
        const values = [email];

        // Execute: 
        const users = await dal.execute(sql, values) as UserModel[];
        const user = users[0];

        // Return true if we have such email, false if we don't:
        return !!user; // null --> false, { ... } --> true
    }


    // private async isEmailTaken(email: string): Promise<boolean> {
    //     const sql = "select count(*) as totalUsers from users where email = ?";
    //     const values = [email];
    //     const results = await dal.execute(sql, values) as { totalUsers: number }[];
    //     const totalUsers = results[0].totalUsers;
    //     return totalUsers > 0;
    // }

    // private async isEmailTaken(email: string): Promise<boolean> {
    //     const sql = "SELECT EXISTS(SELECT 1 FROM users WHERE email = ?) AS emailExists";
    //     const values = [email];
    //     const result = await dal.execute(sql, values) as { emailExists: number }[];
    //     return result[0].emailExists === 1;
    // }

}

export const userService = new UserService();
