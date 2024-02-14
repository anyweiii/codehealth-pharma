
// [CODED BY - HUI ANGELES]
import { Button, Modal, Form } from "react-bootstrap";
import { useState } from "react";

export default function EditProduct({ product, fetchData }) {
    const [productId, setProductId] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState(0);
    const [price, setPrice] = useState(0);
    const [showEdit, setShowEdit] = useState(false);

    const openEdit = (productId) => {
        setShowEdit(true);

        fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${productId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setProductId(data.item._id);
            setName(data.item.name);
            setDescription(data.item.description);
            setCategory(data.item.category);
            setStock(data.item.stock);
            setPrice(parseFloat(data.item.price.replace(/[^\d.]/g, ''))); // Remove currency sign and parse
        })
        .catch(error => {
            console.error(error);
        });
    }

    const closeEdit = () => {
        setShowEdit(false);
        setName("");
        setDescription("");
        setCategory("");
        setStock(0);
        setPrice(0);
    }

    const editProduct = (e) => {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${productId}/update`, {
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                name: name,
                description: description,
                category: category,
                stock: stock,
                price: price
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.message === "Product successfully updated!"){
                alert("Successfully updated products!");
                closeEdit();
                fetchData();
                window.location.reload();
            } else {
                alert("Failed to update product. Please try again after a few seconds.");
                closeEdit();
            }
        })
        .catch(error => {
            console.error("Error updating product:", error);
            alert("Failed to update product. Please try again after a few seconds.");
            closeEdit();
        });
    }
    
    return(
        <>
        <Button variant="primary" size="sm" onClick={() => openEdit(product)}>Edit</Button>

        <Modal show={showEdit} onHide={closeEdit}>
            <Form onSubmit={editProduct}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Product</Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        autoFocus
                        required
                        value={name}
                        onChange={e => setName(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        type="text"
                        autoFocus
                        required
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label>Category</Form.Label>
                      <Form.Control
                        type="text"
                        autoFocus
                        required
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label>Stock</Form.Label>
                      <Form.Control
                        type="number"
                        autoFocus
                        required
                        value={stock}
                        onChange={e => setStock(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label>Price</Form.Label>
                      <Form.Control
                        type="number"
                        autoFocus
                        required
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                      />
                    </Form.Group>

                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={closeEdit}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit">
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
        </>
    );
}






