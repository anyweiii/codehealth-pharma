// [CODED BY - HUI ANGELES]
import React, { useState } from 'react';

export default function RemoveItemFromCart({ itemId, fetchCart }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [cart, setCart] = useState(null);
    const token = localStorage.getItem('token');

    const removeItem = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/carts/${itemId}/remove-from-cart`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }
            const data = await response.json();
            setCart(data.updatedItem);
            setLoading(false);
            fetchCart();
        } catch (error) {
            console.error(error);
            setError(error.message || "Failed to remove item. Please try again later.");
            setLoading(false);
        }
    };

    return (
        <>
            <div>
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}
                {cart && cart.updatedItem && (
                    <div>
                        <p>{cart.message}</p>
                        <div>
                            {cart.updatedItem.cartItems.map(item => (
                                <div key={item.itemId}>
                                    <p>Name: {item.name}</p>
                                    <p>Description: {item.description}</p>
                                    <p>Quantity: {item.quantity}</p>
                                    <p>Price: {item.price}</p>
                                    <p>Subtotal: {item.subtotal}</p>
                                </div>
                            ))}
                        </div>
                        <p>Total Price: {cart.updatedItem.totalPrice}</p>
                    </div>
                )}
                <button onClick={removeItem} className='btn btn-danger btn-sm border border-light mt-2'>Remove Item</button>
            </div>
        </>
    );
};
