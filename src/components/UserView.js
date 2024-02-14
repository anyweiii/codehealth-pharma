// // [CODED BY: HUI ANGELES]
import { useState, useEffect } from "react";
import ProductDisplay from "./ProductsDisplay";

export default function UserView({ productsData }) {
    const [activeProducts, setActiveProducts] = useState([]);

    useEffect(() => {
        if (Array.isArray(productsData)) {
            setActiveProducts(productsData.filter(product => product.isActive));
        }
    }, [productsData]);

    return (
        <>
            {activeProducts.map(product => (
                <ProductDisplay key={product._id} productProp={product} />
            ))}
        </>
    );
}

