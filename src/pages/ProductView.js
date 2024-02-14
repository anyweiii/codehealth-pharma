// [CODED BY: HUI ANGELES]
import UserContext from '../UserContext';
import { useState, useEffect, useContext } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../styles/Products/products-view.css';

export default function ProductView() {
	const { user } = useContext(UserContext);

    const [name, setName] = useState("");
	const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
	const [price, setPrice] = useState(0);

	const { productId } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${productId}`, {
			method: "POST"
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);
			if (data && data.item) {
				setName(data.item.name || "");
				setDescription(data.item.description || "");
				setCategory(data.item.category || "");
				setPrice(data.item.price || 0); 
			} else {
				console.error("Invalid data structure:", data);
			}
		})
		.catch(error => {
			console.error("Error fetching product:", error);
		});
	}, [productId]);
	
	const addToCart = async (productId) => {
		try {
			const token = localStorage.getItem('token');
			const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/carts/add-to-cart`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify([{ productId, quantity: 1 }]) 
			});
	
			if (response.ok) {
				const data = await response.json();
				Swal.fire({
					title: 'Items added to cart. Redirected you to our products!',
					text: 'Items successfully added to your cart',
					icon: 'success',
					confirmButtonColor: "#3085d6"
				})
				navigate ("/products");
			} else {
				console.error("Failed to add product to cart:", response.statusText);
				Swal.fire({
					title: 'Oh no!',
					text: 'We are unable to add the product to your cart!',
					icon: 'error',
					confirmButtonColor: "#800020"
				})
			}
		} catch (error) {
			console.error("Error adding product to cart:", error);
			Swal.fire({
				title: 'Oh no!',
				text: 'We encountered problem in adding items to your cart. Please try again later.',
				icon: 'error',
				confirmButtonColor: "#800020"
			})
		}
	};
	
    return (
        <Container className="products-view-cont">
		    <Row>
		        <Col lg={{ span: 6, offset: 3 }}>
		            <Card className='card-prod-view'>
		                <Card.Body className="text-center">
		                    <Card.Title className='card-prod-viewtitle'>{name}</Card.Title>
		                    <Card.Subtitle className='card-prod-viewsubtitle my-2'>Description:</Card.Subtitle>
		                    <Card.Text className='card-prod-viewdes'>{description}</Card.Text>
		                    <Card.Subtitle className='card-prod-viewsubtitle my-2'>Price:</Card.Subtitle>
		                    <Card.Text className='card-prod-viewdes'>PHP {price}</Card.Text>
                            <Card.Subtitle className='card-prod-viewsubtitle my-2'>Category:</Card.Subtitle>
		                    <Card.Text className='card-prod-viewdes'> {category}</Card.Text>
							{
		                    	user.id !== null ?
		                    	<Button className='add-cart-prodview' onClick={() => addToCart(productId)}>Add to Cart</Button>
		                    	:
		                    	<Link className="login-prodview" to="/login">Login to add items in your cart</Link>
		                    }
		                </Card.Body>        
		            </Card>
		        </Col>
		    </Row>
		</Container>
    );
}
