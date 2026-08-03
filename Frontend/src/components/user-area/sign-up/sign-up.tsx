import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserModel } from "../../../models/user-model";
import { userService } from "../../../services/user-service";
import { notify } from "../../../utils/notify";
import "./sign-up.css";

export function SignUp() {

    const { register, handleSubmit } = useForm<UserModel>();
    const navigate = useNavigate();

    async function send(user: UserModel) {
        try {
            await userService.register(user);
            notify.success("Welcome " + user.firstName);
            navigate("/home");
        }
        catch(err: unknown) { 
            notify.error(err); 
        }
    }

    return (
        <div className="SignUp">

            <h2 className="page-main-title">Register to Northwind</h2>

<form onSubmit={handleSubmit(send)}>

    <label>First name</label>
    <input type="text" {...register("firstName")} placeholder="Enter First Name" required />

    <label>Last name</label>
    <input type="text" {...register("lastName")} placeholder="Enter Last Name" required />

    <label>Email</label>
    <input type="email" {...register("email")} placeholder="Enter Email  => name@example.com" required />

    <label>Password</label>
    <input type="password" {...register("password")} placeholder="Enter Password  => ••••••••" required />

    <div className="checkbox-wrapper">
        <input type="checkbox" id="promotions" />
        <label htmlFor="promotions">Send me promotional emails</label>
    </div>

    <div className="button-group">
        <button type="submit">Sign In</button>
        <button type="reset">Clear</button>
    </div>
</form>


        </div>
    );
}













// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import { UserModel } from "../../../models/user-model";
// import { userService } from "../../../services/user-service";
// import { notify } from "../../../utils/notify";
// import "./sign-up.css";

// export function SignUp() {

//     const { register, handleSubmit } = useForm<UserModel>();
//     const navigate = useNavigate();

//     async function send(user: UserModel) {
//         try {
//             await userService.register(user);
//             notify.success("Welcome " + user.firstName);
//             navigate("/home");
//         }
//         catch(err: unknown) { 
//             notify.error(err); 
//         }
//     }

//     return (
//         <div className="SignUp">

//            <h2 className="page-main-title">Sign Up</h2>

//             <form onSubmit={handleSubmit(send)}>

//                 <label>First name</label>
//                 <input type="text" {...register("firstName")} />

//                 <label>Last name</label>
//                 <input type="text" {...register("lastName")} />

//                 <label>Email</label>
//                 <input type="email" {...register("email")} />

//                 <label>Password</label>
//                 <input type="password" {...register("password")} />

//                 <button>Sign Up</button>
//             </form>

//         </div>
//     );
// }