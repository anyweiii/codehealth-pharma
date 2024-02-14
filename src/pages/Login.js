// [CODED BY: HUI ANGELES]
import React, { useState, useEffect, useContext } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { Navigate, Link } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import Swal from 'sweetalert2';
import '../styles/Login/login.css';
import UserContext from '../UserContext';

export default function Login() {
    const { user, setUser } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isActive, setIsActive] = useState(false);
    const [passwordVisibility, setPasswordVisibility] = useState(false);

    useEffect(() => {
        setIsActive(email !== "" && password !== "");
    }, [email, password]);

    function loginUser(e) {
        e.preventDefault();

        fetch(`${process.env.REACT_APP_API_BASE_URL}/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            }) 
        })
        .then(res => res.json()) 
        .then(data => {
            console.log(data);

            if (data.error === "You are not registered! Please register your account.") {
                Swal.fire({
                    title: 'Unregistered user detected!',
                    text: 'You are not registered. Please register your account in order to proceed.',
                    icon: 'warning',
                    confirmButtonColor: "#3085d6"
                })
            } else if (data.message === "Successfully logged in!") {
                setEmail("");
                setPassword("");
                localStorage.setItem("token", data.access);
                retrieveUserDetails(data.access);
                Swal.fire({
                    title: 'Logged in successfully',
                    text: 'Congratulations, you are now logged in!',
                    icon: 'success',
                    confirmButtonColor: "#3085d6"
                })
            } else if (data.error === "Email and password do not match!") {
                Swal.fire({
                    title: 'Email and password are not matched',
                    text: 'It seems like your email / password is not matching. Please try again',
                    icon: 'error',
                    confirmButtonColor: "#3085d6"
                })
            } else {
                Swal.fire({
                    title: 'Oh no!',
                    text: 'Something went wrong, Please try again later.',
                    icon: 'error',
                    confirmButtonColor: "#3085d6"
                })
            }
        })
    };

    const retrieveUserDetails = (token) => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/users/details`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
          if (!res.ok) {
            throw new Error('Failed to retrieve user details');
          }
          return res.json();
        })
        .then(data => {
            console.log('User details response:', data);
            setUser({
                id: data.userDetails._id,
                email: data.userDetails.email,
                isAdmin: data.userDetails.isAdmin,
            });
        })
        .catch(error => {
            console.error('Error retrieving user details:', error);
        });
    };

    const togglePasswordVisibility = () => {
        setPasswordVisibility(!passwordVisibility);
    };

    return (
        (user.id !== null) ? 
			<Navigate to="/"/>
			:
        <>
            <Container className='log-wrap'>
                <h1 className='log-head text-center'>Login</h1>
                <Form onSubmit={ e => loginUser(e) } className='form-login mx-auto'>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label className='form-log-text my-2'>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={ email }
                            onChange={ e => { setEmail(e.target.value) }}
                            required
                        />

                        <Form.Label className='form-log-text my-2'>Password</Form.Label>
                        <div className="input-group">
                            <Form.Control
                                type={passwordVisibility ? 'text' : 'password'}
                                placeholder="Enter Password"
                                value={ password }
                                onChange={ e => { setPassword(e.target.value) }}
                                required
                            />
                            <button
                                className="btn btn-dark"
                                type="button"
                                onClick={() => togglePasswordVisibility()}
                            >
                                {passwordVisibility ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                            </button>
                        </div>
                    </Form.Group>

                    <Button type="submit"  className='button-login mt-4'> 
                        Login
                    </Button>        
                </Form>

                <div className="mt-3 align-items-center text-center">
                    <div className='account-divs'>
                        Need an account? <Link to="/registration" className="link-register">Register</Link>
                    </div>
                    <div className='mt-2 account-divs'>
                        Forgotten your password? <Link to="/forget-password" className="link-reset">Reset Password</Link>
                    </div>
                </div>
            </Container>
        </>
        
    );
}