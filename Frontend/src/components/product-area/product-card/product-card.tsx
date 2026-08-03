import { ProductModel } from "../../../models/product-model";
import "./product-card.css";
import { useNavigate } from "react-router-dom";

type ProductCardProps = {
    product: ProductModel;
};

export function ProductCard(props: ProductCardProps) {

    // Create a navigation function:
    const navigate = useNavigate();

    function showDetails(): void {
        // Navigate:
       navigate("/products/details/" + props.product.id); // /products/details/1
    }

    return (
        <div className="ProductCard" onClick={showDetails}>
            <div>
                <span className="product-name">{props.product.name}</span>
                <span className="product-price">Price: {props.product.price}</span>
                <span className="product-stock">Stock: {props.product.stock}</span>
            </div>

            <div>
                <img src={props.product.imageUrl} alt={props.product.name} />
            </div>

        </div>
    );
}