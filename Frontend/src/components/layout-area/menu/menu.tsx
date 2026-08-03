import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "./menu.css";
import { TotalProducts } from "../../product-area/total-products/total-products";
import { AppState } from "../../../redux/app-state";
import { Role } from "../../../models/enums";
import { UserModel } from "../../../models/user-model";
import { TotalSuppliers } from "../../supplier-area/total-suppliers/total-suppliers";export function Menu() {

const user = useSelector<AppState, UserModel>(state => state.user);

    return (
        <div className="Menu">

<NavLink to="/home"> 🏠 Home</NavLink>
 
<NavLink to="/products" end> 📦 Products</NavLink>

<NavLink to="/employees" end> 👥 Employees</NavLink>

<NavLink to="/suppliers" end> 🚚 Suppliers</NavLink>

<NavLink to="/top-products"> ⭐ Top Product</NavLink>

<NavLink to="/products/new"> ➕ Add Product</NavLink>

<NavLink to="/employees/new"> ➕ Add Employee</NavLink>

<NavLink to="/suppliers/new"> ➕ Add Supplier</NavLink>

<NavLink to="/about"> ℹ️ About</NavLink>

{ user?.role === Role.Admin && <NavLink to="/admin">Admin</NavLink> }

<TotalProducts />
<TotalSuppliers />
        </div>
    );
}
