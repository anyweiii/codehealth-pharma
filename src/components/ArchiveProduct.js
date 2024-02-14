// [CODED BY - HUI ANGELES]
import React from 'react';
import { Button } from 'react-bootstrap';

export default function ArchiveProduct({ product, isActive, fetchData }) {
    const token = localStorage.getItem('token');

    const archiveProduct = (productId) => {
        console.log(productId);
        fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${productId}/archive`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            console.log(response);
            if (response.ok) {
                console.log("Product archived successfully");
                alert("Product archived successfully");
                window.location.reload();
                fetchData(); 
            } else {
                throw new Error("Failed to archive product");
            }
        })
        .catch(error => {
            console.error("Error archiving product:", error);
        });
    };

    const activateProduct = (productId) => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${productId}/activate`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            console.log(response);
            if (response.ok) {
                console.log("Product activated successfully");
                alert("Product Activation Successful!");
                window.location.reload();
                fetchData(); 
            } else {
                throw new Error("Failed to activate product");
            }
        })
        .catch(error => {
            console.error("Error activating product:", error);
        });
    }

    return (
        <>
		{
			(isActive) ?
				<Button variant ="danger" size="sm" onClick={ () => archiveProduct(product._id) }>Archive</Button>
				:
				<Button variant ="success" size="sm" onClick={ () => activateProduct(product._id) }>Activate</Button>
		}
		</>
    );
};
