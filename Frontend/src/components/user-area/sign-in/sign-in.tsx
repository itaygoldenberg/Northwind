import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CredentialsModel } from "../../../models/credentials-model";
import { userService } from "../../../services/user-service";
import { notify } from "../../../utils/notify";
import "./sign-in.css";

export function SignIn() {

    const { register, handleSubmit } = useForm<CredentialsModel>();
    const navigate = useNavigate();

    async function send(credentials: CredentialsModel) {
        try {
            await userService.login(credentials);
            notify.success("Welcome back!");
            navigate("/home");
        }
        catch(err: unknown) { 
            notify.error(err);
        }
    }

    return (
        <div className="SignIn">
          <h2 className="page-main-title">Sign In</h2>

<form onSubmit={handleSubmit(send)}>

    <label>Email</label>
    <input type="email" {...register("email")} placeholder="Enter Email" />

    <label>Password</label>
    <input type="password" {...register("password")} placeholder="Enter Password" />

    <button>Sign In</button>
</form>
        </div>
    );
}