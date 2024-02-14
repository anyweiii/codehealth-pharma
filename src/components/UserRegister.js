// [CODED BY - HUI ANGELES]
import React, { useState, useContext, useEffect } from 'react';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';
import { Navigate, Link, useNavigate } from "react-router-dom";
import UserContext from "../UserContext";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import '../styles/Register/registration.css';

export default function UserRegister() {
    const navigate = useNavigate();
    // [USER DETAILS DECLARATION]
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    // [USER CONTEXT]
    const { user } = useContext(UserContext);
    
    // [MODAL FOR CANCELLATION REQUEST]
    const [showModal, setShowModal] = useState(false);
    const [confirmationMessage, setConfirmationMessage] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // [PASSWORD CHECK IF MATCH]
    useEffect(() => {
        if (password !== confirmPassword && confirmPassword !== "") {
            setPasswordsMatch(false);
        } else {
            setPasswordsMatch(true);
        }
    }, [password, confirmPassword]);

    const handleCancel = () => {
        setShowModal(true);
    };

    // [REGISTRATION CANCELLATION]
    // message will just appear within 3 seconds if the form registration is cancelled
    useEffect(() => {
        if (confirmationMessage) {
            const timer = setTimeout(() => {
                setConfirmationMessage("");
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [confirmationMessage]);

    const handleYes = () => {
        resetForm();
        setShowModal(false);
        setConfirmationMessage("Registration cancelled");
    };

    const handleGoBack = () => {
        setShowModal(false);
    };

    const resetForm = () => {
        setFirstName("");
        setLastName("");
        setMobileNo("");
        setAddress("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
    };

    const togglePasswordVisibility = (inputType) => {
        if (inputType === 'password') {
            setShowPassword(!showPassword);
        } else if (inputType === 'confirmPassword') {
            setShowConfirmPassword(!showConfirmPassword);
        }
    };

    function userSignUp(e) {
        e.preventDefault();

        fetch(`${process.env.REACT_APP_API_BASE_URL}/users/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                mobileNo: mobileNo,
                address: address,
                email: email,
                password: password
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);

                if (data.error === "Mobile number must be 11 characters long") {
                    alert("Your mobile number is invalid please enter 11 digits");
                } else if (data.error === "Password must be at least 8 characters long") {
                    alert("Your password is too short. Password must be at least 8 characters.")
                } else if (data.error === "Please provide a valid email address") {
                    alert("Invalid email address");
                }

                if (data.error === "Email is already registered") {
                    alert("You are already registered! Please change email address if you want to register again.");
                } else if (data.message === "User registration successful!") {
                    resetForm();
                    alert("You are now registered!");
                    navigate('/login');
                }
            });
    }

    return (
        (user.id !== null) ?
        <Navigate to="/" />
        :
        <>
            <Form onSubmit={(e) => userSignUp(e)} className='form-format'>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label className='form-headers'>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your first name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label className='form-headers'>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your last name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label className='form-headers'>Mobile Number</Form.Label>
                            <Form.Control
                                type="tel"
                                placeholder="Enter your mobile number"
                                value={mobileNo}
                                onChange={(e) => setMobileNo(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label className='form-headers'>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter your email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group className="mb-3">
                    <Form.Label className='form-headers'>Address</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your address for shipping purposes"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </Form.Group>

                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label className='form-headers'>Password</Form.Label>
                            <div className="password-input d-flex align-items-center">
                                <Form.Control
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoFocus
                                    required
                                />
                                <Button
                                    variant="outline-secondary"
                                    className="password-toggle bg-black"
                                    onClick={() => togglePasswordVisibility('password')}
                                >
                                    {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                                </Button>
                            </div>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label className='form-headers'>Confirm Password</Form.Label>
                            <div className="password-input d-flex align-items-center">
                                <Form.Control
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Please confirm password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    autoFocus
                                    required
                                />
                                <Button
                                    variant="outline-secondary"
                                    className="password-toggle bg-black"
                                    onClick={() => togglePasswordVisibility('confirmPassword')}
                                >
                                    {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                                </Button>
                            </div>
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Button onClick={handleCancel} className="button-user me-2">
                            Cancel
                        </Button>
                        <Button type="submit" disabled={!passwordsMatch} className="button-user-reg">
                            Save Changes
                        </Button>
                    </Col>
                </Row>
            </Form>

            <Modal show={showModal} onHide={handleGoBack}>
                <Modal.Header closeButton>
                    <Modal.Title>Registration Cancellation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to cancel your registration? Your changes will be lost.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleGoBack}>
                        Go back to form
                    </Button>
                    <Button variant="primary" onClick={handleYes}>
                        Cancel Registration
                    </Button>
                </Modal.Footer>
            </Modal>

            {confirmationMessage && (
                <div className="alert alert-warning mt-2" role="alert">
                    {confirmationMessage}
                </div>
            )}

            {!passwordsMatch && (
                <div className="alert alert-danger mt-2" role="alert">
                    Unable to save changes. Passwords are not matching.
                </div>
            )}

            <div className="mt-3 text-center">
                <span className='account'>Already have an account? </span>
                <Link to="/login" className="login-link">Login</Link>
            </div>
        </>
    );
}
