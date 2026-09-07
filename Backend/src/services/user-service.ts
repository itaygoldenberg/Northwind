import { OkPacketParams } from "mysql2";
import { UserModel } from "../models/user-model";
import { dal } from "../utils/dal";
import { cyber } from "../utils/cyber";
import { CredentialsModel } from "../models/credentials-model";
import { ClientError } from "../models/client-error";
import { Role, StatusCode } from "../models/enums";
import { appConfig } from "../utils/app-config";
import axios from "axios";

class UserService {

    // Verify CAPTCHA using google api:
    private async verifyHuman(captchaToken: string): Promise<void> {

        // Create parameters to send to google: 
        const params = new URLSearchParams();
        params.append("secret", appConfig.recaptchaSecretKey); // Secret key
        params.append("response", captchaToken); // Captcha Token (response from google component) 

        // Ask google if user is a human or a bot:
        const url = "https://www.google.com/recaptcha/api/siteverify";
        const response = await axios.post(url, params);
        const success = response.data.success; // true --> user is a human.

        // Throw if BOT:
        if(!success) {

            // Log WHY google refused. Without this the client just sees "failed CAPTCHA"
            // and there is no way to tell an unticked box from a mismatched key pair.
            //   missing-input-response  --> no token was sent (the box was not ticked)
            //   invalid-input-response  --> the token does not belong to this secret key
            //   timeout-or-duplicate    --> the token expired (2 min) or was already used
            //   invalid-input-secret    --> RECAPTCHA_SECRET_KEY is wrong
            const codes = response.data["error-codes"] || [];
            console.log("CAPTCHA refused. token length: " + (captchaToken?.length ?? 0) + ", google error-codes: " + JSON.stringify(codes));

            throw new ClientError(StatusCode.Forbidden, "You failed CAPTCHA test.");
        }
    }

    // Add user:
    public async addUser(user: UserModel): Promise<string> {

        // Validation:
        user.validate();
        await this.verifyHuman(user.captchaToken);

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
