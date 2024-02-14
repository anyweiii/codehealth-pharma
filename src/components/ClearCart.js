// [CODED BY - HUI ANGELES]
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import '../styles/Cart/cartdetails.css';

export default function ClearCart({ fetchCart }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [confirmation, setConfirmation] = useState('');
    const [message, setMessage] = useState('');
    const token = localStorage.getItem('token');

    const handleConfirmationChange = (event) => {
        setConfirmation(event.target.value);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setMessage(''); 
    };

    const clearCart = async () => {
        if (confirmation.toLowerCase() === 'yes') {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/carts/clear-cart`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({ confirmation })
                });
        
                const data = await response.json();
        
                if (response.ok) {
                    setMessage(data.message);
                    fetchCart();
                } else {
                    setMessage(data.message);
                }
            } catch (error) {
                console.error('Error:', error);
                setMessage('Internal Server Error. Unable to clear your cart. Please try again later.');
            }
        } else if (confirmation.toLowerCase() === 'no') {
            setMessage('Cart is not cleared as per your request. Please close the transaction.');
        } else {
            setMessage('Please type "yes" to confirm clearing the cart, or "no" to cancel.');
        }
    };

    return (
        <div>
            <button onClick={openModal} className='btn btn-dark border-light text-white'>Clear Cart</button>
            <div className={`modal ${isModalOpen ? 'show' : ''}`} tabIndex="-1" style={{ display: isModalOpen ? 'block' : 'none' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Are you sure you want to clear your cart?</h5>
                        </div>
                        <div className="modal-body">
                            <p>Type "yes" to confirm clearing the cart:</p>
                            <input
                                type="text"
                                value={confirmation}
                                onChange={handleConfirmationChange}
                            />
                            {message && <p>{message}</p>}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                            <button type="button" className="btn btn-dark" onClick={clearCart}>Confirm</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

