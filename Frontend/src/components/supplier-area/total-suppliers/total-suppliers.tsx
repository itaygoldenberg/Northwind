import { useSelector } from "react-redux";
import "./total-suppliers.css";
import { AppState } from "../../../redux/app-state";

export function TotalSuppliers() {

    // const count = store.getState().suppliers.length; // Won't render the component

    // Will render the component when global store change:
    const count = useSelector<AppState, number>(state => state.suppliers.length);

    return (
        <div className="TotalSuppliers">

            <p>Total Suppliers: {count}</p>

        </div>
    );
}