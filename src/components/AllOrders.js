// [CODED BY - HUI ANGELES]
import React, { useState, useEffect } from 'react';
import { Card, ListGroup, Button } from 'react-bootstrap';

export default function RetrieveAllOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filterStatus, setFilterStatus] = useState('all'); // 'all' or 'pending'
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/orders/all-orders`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to retrieve orders');
                }
                const data = await response.json();
                setOrders(data.orders);
                setLoading(false);
            } catch (error) {
                setError('Failed to retrieve orders. Please try again later.');
                setLoading(false);
            }
        };

        fetchOrders();
    }, [token]);

    const handleFilter = (status) => {
        setFilterStatus(status);
    };

    const filteredOrders = filterStatus === 'pending' ? orders.filter(order => order.status === 'Pending') : orders;

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="order-container">
            <h2>All Orders</h2>
            <Button onClick={() => handleFilter('all')} className="mr-2" variant="primary">All Orders</Button>
            <Button onClick={() => handleFilter('pending')} variant="warning">Pending Orders</Button>
            {filterStatus === 'pending' && <p>Here are your pending orders</p>}
            {filteredOrders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <div className="order-grid">
                    {filteredOrders.map(order => (
                        <Card key={order._id} className="order-card">
                            <Card.Body>
                                <Card.Title>Order ID: {order._id}</Card.Title>
                                <div className="order-details">
                                    <div>
                                        <Card.Subtitle className="mb-2">User Details:</Card.Subtitle>
                                        <ListGroup variant="flush">
                                            <ListGroup.Item>Name: {order.user.name}</ListGroup.Item>
                                            <ListGroup.Item>Email: {order.user.email}</ListGroup.Item>
                                            <ListGroup.Item>Address: {order.user.address}</ListGroup.Item>
                                        </ListGroup>
                                    </div>
                                    <div>
                                        <Card.Subtitle className="mb-2">Products Ordered:</Card.Subtitle>
                                        <ListGroup variant="flush" className="product-list">
                                            {order.productsOrdered.map(product => (
                                                <ListGroup.Item key={product._id}>
                                                    <p>Name: {product.name}</p>
                                                    <p>Description: {product.description}</p>
                                                    <p>Price: {product.price}</p>
                                                    <p>Subtotal: {product.subtotal}</p>
                                                </ListGroup.Item>
                                            ))}
                                        </ListGroup>
                                        <p>Total Price: {order.totalPrice}</p>
                                        <p>Ordered On: {new Date(order.orderedOn).toLocaleString()}</p>
                                        <p>Order Status: {order.status}</p>
                                        <p>Payment Method: {order.paymentMethod}</p>
                                        <p>Payment Status: {order.paymentStatus}</p>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
