// [CODED BY: HUI ANGELES]
import UserContext from "../UserContext";
import { Form, Button, Alert } from "react-bootstrap";
import { Navigate } from 'react-router-dom'
import { useState, useContext } from "react";

export default function CreateProduct() {
    const { user } = useContext(UserContext);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");

    function createProduct(e) {
        e.preventDefault();

        const token = localStorage.getItem("token");

        fetch(`${process.env.REACT_APP_API_BASE_URL}/products/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                name,
                description,
                category,
                stock,
                price
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                setError(data.error); 
                setSuccessMessage(""); 
            } else {
                setSuccessMessage("Product successfully created!"); 
                setError(null); 
                setName("");
                setDescription("");
                setCategory("");
                setStock("");
                setPrice("");
            }
        })
        .catch(error => {
            console.error("Error creating product:", error);
            setError("Failed to create product. Please try again later."); 
            setSuccessMessage(""); 
        });
    }

    return (
        user.isAdmin === true ?
        <>
            <h1 className="my-5 text-center">Create Product</h1>
            {error && <Alert variant="danger">{error}</Alert>} 
            {successMessage && <Alert variant="success">{successMessage}</Alert>} 

            <Form onSubmit={createProduct}>
                <Form.Group>
                    <Form.Label>Name:</Form.Label>
                    <Form.Control type="text" placeholder="Enter Name" required value={name} onChange={e => setName(e.target.value)} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Description:</Form.Label>
                    <Form.Control type="text" placeholder="Enter Description" required value={description} onChange={e => setDescription(e.target.value)} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Category:</Form.Label>
                    <Form.Control type="text" placeholder="Enter Category" required value={category} onChange={e => setCategory(e.target.value)} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Price:</Form.Label>
                    <Form.Control type="number" placeholder="Enter Price" required value={price} onChange={e => setPrice(e.target.value)} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Stock:</Form.Label>
                    <Form.Control type="number" placeholder="Enter Stock" required value={stock} onChange={e => setStock(e.target.value)} />
                </Form.Group>

                <Button variant="primary" type="submit" className="my-5">Submit</Button>
            </Form>
        </>
        :
		<Navigate to="/products"/>
    );
}
