import { ProductModel } from "../../../models/product-model";
import "./product-card.css";
import { useNavigate } from "react-router-dom";
import { useState, CSSProperties } from "react";
import { randomColor } from "itay-random-color";

type ProductCardProps = {
    product: ProductModel;
};

export function ProductCard(props: ProductCardProps) {
 
    // Create a navigation function:
    const navigate = useNavigate();
    const [backgroundColor] = useState(randomColor.get());
   
    function showDetails(): void {
        // Navigate:
       navigate("/products/details/" + props.product.id); // /products/details/1
    }

    return (
        <div className="ProductCard" onClick={showDetails} style={{ "--card-bg": backgroundColor } as CSSProperties}>
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