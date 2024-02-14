// [CODED BY - HUI ANGELES]
import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CartItem from '../components/UpdateCartQuantity';
import RemoveItemFromCart from '../components/RemoveCartItem';
import ClearCart from '../components/ClearCart';
import '../styles/Cart/cartdetails.css';

export default function CartDetails() {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState('');
    const [error, setError] = useState('');
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const fetchCart = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/carts/get-cart`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
    
            console.log('Response status:', response.status);
            const responseData = await response.json();
            console.log('Response data:', responseData);
    
            if (!responseData || !responseData.yourCart || responseData.yourCart.length === 0) {
                setError('You do not have any items in your cart. Please add items first');
                setCartItems([]);
                setTotalPrice('');
                return;
            }
    
            const { yourCart, totalPrice, message } = responseData;
            setCartItems(yourCart);
            setTotalPrice(totalPrice);
            setError('');
            console.log(message);
        } catch (error) {
            setError('Failed to retrieve the items in your cart. Please try again later.');
            console.error(error);
        }
    };
    
    useEffect(() => {
        fetchCart();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);
    

    const handleUpdateQuantity = async (itemId, newQuantity) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/carts/update-cart-quantity`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    itemId,
                    quantity: parseInt(newQuantity)
                })
            });

            if (!response.ok) {
                throw new Error('Failed to update quantity.');
            }

            const { updatedCart, totalPrice, message } = await response.json();
            setCartItems(updatedCart);
            setTotalPrice(totalPrice);
            setError('');
            console.log(message);

            fetchCart();
        } catch (error) {
            setError('Failed to update quantity. Please try again later.');
            console.error(error);
        }
    };

    const handleCheckout = () => {
        navigate('/checkOutOrder');
    };

    return (
        <Container className='cart-details-wrap'>
            <div>
                {error && <p className="alert alert-danger">{error}</p>}
                <h2 className="cart-header mb-4">Cart Items</h2>
                <ClearCart fetchCart={fetchCart}/>
                {cartItems && cartItems.length > 0 && (
                    <div className='cart-items-details'>
                        <ul className="list-group">
                            {cartItems.map(item => (
                                <li key={item._id} className="cart-items-details">
                                    <CartItem item={item} updateQuantity={handleUpdateQuantity} fetchCart={fetchCart} />
                                    <RemoveItemFromCart itemId={item._id} fetchCart={fetchCart} />
                                </li>
                            ))}
                        </ul>

                        <p className="mt-4 text-white text-bold"><strong>Total Price:</strong> {totalPrice}</p>
                        <button className="btn btn-primary border-white btn-sm p-3" onClick={handleCheckout}>Checkout</button>
                    </div>
                )}
                {cartItems && cartItems.length === 0 && (
                    <p>You do not have items in your cart. Please add items first to see your cart.</p>
                )}
            </div>
        </Container>
    );
}



