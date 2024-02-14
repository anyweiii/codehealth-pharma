// [CODED BY - HUI ANGELES]
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

export default function OrderSummary() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchUserOrders();
    }, []);

    const fetchUserOrders = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/orders/my-orders`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            if (!res.ok) {
                throw new Error('Failed to fetch user orders');
            }
            const data = await res.json();
            setOrders(data.orders);
        } catch (error) {
            console.error('Error fetching user orders:', error);
        }
    };

    return (
        <Container>
            <Row>
                <Col>
                    <h1>Order Summary</h1>
                </Col>
            </Row>
            {orders.map((order, index) => (
                <Row key={index}>
                    <Col>
                        <Card>
                            <Card.Body>
                                <h5>Order ID: {order.orderId}</h5>
                                <ul>
                                    {order.items.map((item, idx) => (
                                        <li key={idx}>
                                            <strong>{item.name}</strong> - {item.quantity} x {item.price} ({item.subtotal})
                                        </li>
                                    ))}
                                </ul>
                                <p>Total Price: {order.totalPrice}</p>
                                <p>Ordered On: {order.orderedOn}</p>
                                <p>Payment Method: {order.paymentMethod}</p>
                                <p>Payment Status: {order.paymentStatus}</p>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            ))}
        </Container>
    );
};
