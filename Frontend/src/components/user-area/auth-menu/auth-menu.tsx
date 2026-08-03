import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppState } from "../../../redux/app-state";
import { UserModel } from "../../../models/user-model";
import { userService } from "../../../services/user-service";
import "./auth-menu.css";

export function AuthMenu() {

    // Initializing the navigate function:
    const navigate = useNavigate();
    
    const user = useSelector<AppState, UserModel>(state => state.user);

    function signOut() {
        userService.logout();
        navigate("/home");
    }

    return (
        <div className="AuthMenu">

            { !user && <div>
                <span>
                    Hello, 
                    <br />
                    
                    Guest
                    </span>

                <NavLink to="/signup">Sign Up</NavLink>

                <span> | </span>

                <NavLink to="/signin">Sign In</NavLink>
            </div>}

            { user && <div>

                <span>
                    Hello,
                    <br />
                    {user.firstName} {user.lastName}
                    </span>

                <button onClick={signOut}>Sign Out</button>

            </div>}

        </div>
    );
}