// [CODED BY - HUI ANGELES]
import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import creditCardType from 'credit-card-type';

const acceptedPaymentMethods = ["Credit Card / Debit Card", "Gcash", "CodeHealth Wallet", "Cash on Delivery"];

export default function CheckOutOrder() {
    const [selectedMethod, setSelectedMethod] = useState('');
    const [checkoutMessage, setCheckoutMessage] = useState('');
    const [creditCardDetails, setCreditCardDetails] = useState({
        name: '',
        cardType: '',
        cardNumber: '',
        cvv: '',
        expirationDate: ''
    });
    const [gcashDetails, setGcashDetails] = useState({
        phoneNumber: '',
    });

    const handleDropdownChange = (event) => {
        setSelectedMethod(event.target.value);
    };

    const handleCreditCardChange = (event) => {
        const { name, value } = event.target;
        let parsedValue = value; 
        if ((name === 'cvv' || name === 'cardNumber') && isNaN(Number(value))) {
            return; 
        }
      
        if (name === 'cardNumber') {
            const cardType = detectCardType(value);
            setCreditCardDetails(prevState => ({
                ...prevState,
                [name]: value,
                cardType: cardType ? cardType.type : ''
            }));
        } else {
            setCreditCardDetails(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const detectCardType = (cardNumber) => {
        return creditCardType(cardNumber)[0];
    };

    const handleGcashChange = (event) => {
        const { name, value } = event.target;
        if (!isNaN(value) || value === '') {
            setGcashDetails(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
        console.log("GCash Details:", gcashDetails);
    };

    const handleCheckout = async () => {
        if (selectedMethod === "Cash on Delivery" || selectedMethod === "CodeHealth Wallet") {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/orders/checkout`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({
                        paymentMethod: selectedMethod
                    })
                });
        
                const data = await response.json();
                if (response.ok) {
                    setCheckoutMessage(data.message);
                    setSelectedMethod('');
                    setCreditCardDetails({
                        name: '',
                        cardType: '',
                        cardNumber: '',
                        cvv: '',
                        expirationDate: ''
                    });
                    setGcashDetails({
                        phoneNumber: '',
                    });
                    window.location.href = '/orderHistory';
                } else {
                    setCheckoutMessage(data.message || 'Failed to checkout. Please try again later.');
                }
            } catch (error) {
                console.error('Error during checkout:', error);
                setCheckoutMessage('Failed to checkout. Please try again later.');
            }
        } else if (selectedMethod === 'Gcash') {
            if (!gcashDetails.phoneNumber) {
                setCheckoutMessage('Please fill in all required fields.');
                return;
            }
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/orders/checkout`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({
                        paymentMethod: selectedMethod,
                        phoneNumber: gcashDetails.phoneNumber
                    })
                });
        
                const data = await response.json();
                if (response.ok) {
                    setCheckoutMessage(data.message);
                    setSelectedMethod('');
                    setCreditCardDetails({
                        name: '',
                        cardType: '',
                        cardNumber: '',
                        cvv: '',
                        expirationDate: ''
                    });
                    setGcashDetails({
                        phoneNumber: '',
                    });
                    window.location.href = '/orderHistory';
                } else {
                    setCheckoutMessage(data.message || 'Failed to checkout. Please try again later.');
                }
            } catch (error) {
                console.error('Error during checkout:', error);
                setCheckoutMessage('Failed to checkout. Please try again later.');
            }
        } else {
            const { name, cardNumber, cvv, expirationDate } = creditCardDetails;
            const { phoneNumber } = gcashDetails;
            if (!name || !cvv || !expirationDate || (selectedMethod === 'Credit Card / Debit Card' && (!cardNumber || !cvv || !expirationDate))) {
                setCheckoutMessage('Please fill in all required fields.');
                return;
            }
        }
    };
    
    const isButtonDisabled = !(
        (selectedMethod === "Cash on Delivery" || selectedMethod === "CodeHealth Wallet") ||
        (selectedMethod === "Gcash" && gcashDetails.phoneNumber) || 
        (selectedMethod === "Credit Card / Debit Card" && creditCardDetails.name && creditCardDetails.cardNumber && creditCardDetails.cvv && creditCardDetails.expirationDate)
    );
    
    return (
        <Container>
            <Row>
                <Col>
                    <h1>Checkout Order</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <h5>Select Payment Method</h5>
                            <Form>
                                <Form.Group controlId="paymentMethodDropdown">
                                    <Form.Control as="select" onChange={handleDropdownChange} required>
                                        <option value="">Select Payment Method</option>
                                        {acceptedPaymentMethods.map((method, index) => (
                                            <option key={index} value={method}>{method}</option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                                
                                {(selectedMethod === "Credit Card / Debit Card") && (
                                    <div>
                                        <h5>Card Details</h5>
                                        <Row>
                                            <Col>
                                                <Form.Group controlId="creditCardName">
                                                    <Form.Label>Name on Card</Form.Label>
                                                    <Form.Control 
                                                        type="text" 
                                                        placeholder="Enter name on card" 
                                                        name="name" 
                                                        value={creditCardDetails.name} 
                                                        onChange={handleCreditCardChange} 
                                                        required
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Group controlId="creditCardNumber">
                                                    <Form.Label>Card Number</Form.Label>
                                                    <Form.Control 
                                                        type="text" 
                                                        placeholder="Enter card number" 
                                                        name="cardNumber" 
                                                        value={creditCardDetails.cardNumber} 
                                                        onChange={handleCreditCardChange} 
                                                        required
                                                    />
                                                </Form.Group>
                                                {creditCardDetails.cardType && <p>Card Type: {creditCardDetails.cardType}</p>}
                                            </Col>
                                        </Row>
                                        
                                        <Row>
                                            <Col>
                                                <Form.Group controlId="creditCardCVV">
                                                    <Form.Label>CVV</Form.Label>
                                                    <Form.Control 
                                                        type="text" 
                                                        placeholder="Enter CVV" 
                                                        name="cvv" 
                                                        value={creditCardDetails.cvv} 
                                                        onChange={handleCreditCardChange} 
                                                        required
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Group controlId="creditCardExpiration">
                                                    <Form.Label>Expiration Date</Form.Label>
                                                    <Form.Control 
                                                        type="text" 
                                                        placeholder="MM/YY" 
                                                        name="expirationDate" 
                                                        value={creditCardDetails.expirationDate} 
                                                        onChange={handleCreditCardChange} 
                                                        required
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </div>
                                )}

                                {(selectedMethod === "Gcash") && (
                                    <div>
                                        <h5>GCASH Details</h5>
                                        <Row>
                                            <Col>
                                                <Form.Group controlId="gcashPhoneNumber">
                                                    <Form.Label>Phone Number</Form.Label>
                                                    <Form.Control 
                                                        type="text" 
                                                        placeholder="Enter GCASH phone number" 
                                                        name="phoneNumber" 
                                                        value={gcashDetails.phoneNumber} 
                                                        onChange={handleGcashChange} 
                                                        required
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </div>
                                )}
                            </Form>
                            <Button onClick={handleCheckout} disabled={isButtonDisabled}>Proceed to Checkout</Button>
                            {checkoutMessage && <p>{checkoutMessage}</p>}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};
