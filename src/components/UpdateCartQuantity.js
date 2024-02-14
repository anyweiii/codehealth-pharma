// [CODED BY - HUI ANGELES]
import React, { useState } from 'react';
import '../styles/Cart/cartdetails.css';

export default function CartItem({ item, updateQuantity, fetchCart }) {
    const [newQuantity, setNewQuantity] = useState(item.quantity);

    const handleUpdate = async (e) => {
        e.preventDefault(); 
        try {
            const quantityDifference = newQuantity - item.quantity;
            await updateQuantity(item._id, quantityDifference);
            console.log('Quantity updated successfully:', newQuantity);

            fetchCart();
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };
    

    const handleDecrease = () => {
        if (newQuantity > 0) {
            setNewQuantity(newQuantity - 1);
        }
    };

    const handleIncrease = () => {
        setNewQuantity(newQuantity + 1);
    };

    return (
        <div key={item._id} className="list-group-item cart-quantity">
            <p className='cart-quan-items'><strong>Name:</strong> {item.name}</p> 
            <p className='cart-quan-items'><strong>Price:</strong> {item.price}</p>
            <p className='cart-quan-items'><strong>Quantity:</strong> {item.quantity}</p>
            <form onSubmit={handleUpdate}>
                <div>
                    <button type="button" className='btn btn-sm minus-btn' onClick={handleDecrease}>-</button>
                    <input 
                        type="text" 
                        value={newQuantity} 
                        className='input-quantity'
                        onChange={(e) => {
                            const input = e.target.value.replace(/\D/g, ''); 
                            setNewQuantity(input);
                        }} 
                    />
                    <button type="button" className='btn btn-sm plus-btn' onClick={handleIncrease}>+</button>
                    <button type="submit" className='btn btn-sm btn-secondary'>Update Quantity</button>
                </div>
            </form>
            <p className='mt-2 text-white'><strong>Subtotal:</strong> {item.subtotal}</p>
        </div>
    );
};










