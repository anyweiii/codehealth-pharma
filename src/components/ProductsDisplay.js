// [CODED BY: HUI ANGELES]
import { Row, Col, Card, Container } from 'react-bootstrap';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Products/products-display.css';


export default function ProductsDisplay({ productProp }) {
    if (!productProp) {
        return <div>No product data available</div>;
    }

    const { _id, name, description, price, category } = productProp;

    return (
        <Container fluid className='products-display'>
            <Row xs={1} md={2} lg={12} className="g-4 justify-content-center">
                <Col>
                    <Card className='prod-display-card d-flex'>
                        <Card.Body>
                            <Card.Title className='prod-display-title'>{name}</Card.Title>
                            <Card.Subtitle className='prod-display-sub mt-2 mb-1'>Description:</Card.Subtitle>
                            <Card.Text className='prod-display-text'>{description}</Card.Text>
                            <Card.Subtitle className='prod-display-sub mt-2 mb-1'>Category:</Card.Subtitle>
                            <Card.Text className='prod-display-text'>{category}</Card.Text>
                            <Card.Subtitle className='prod-display-sub mt-2 mb-1'>Price:</Card.Subtitle>
                            <Card.Text className='prod-display-text'>PHP {price}</Card.Text>
                            <Link className='btn-details' to={`/products/${_id}`}>Details</Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>    
    );
}
