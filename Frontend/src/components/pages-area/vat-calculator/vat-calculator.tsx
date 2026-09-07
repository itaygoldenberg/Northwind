import { ChangeEvent, useId, useState } from "react";
import "./vat-calculator.css";
import { monetaryService } from "../../../services/monetary-service";

export function VatCalculator() {

    const [price, setPrice] = useState<number>(0);
    const [vat, setVat] = useState<number>(0);
    const priceId = useId();

    function handleChange(args: ChangeEvent<HTMLInputElement>) {
        const price = +args.target.value;
        setPrice(price);
        const vat = monetaryService.getVat(price, 18);
        setVat(vat);
    }

    function clear() {
        setPrice(0);
        setVat(0);
    }

    return (
        <div className="VatCalculator">

            <p>Vat Calculator</p>

            <div className="screen">
                <span className="rate">18%</span>
                <span>VAT: {vat}</span>
            </div>

            <div className="keys">

                <div className="field">
                    <label htmlFor={priceId}>Enter price: </label>
                    <input id={priceId} type="number" onChange={handleChange} value={price} />
                </div>

                <button onClick={clear}>Clear</button>

            </div>

        </div>
    );
}
