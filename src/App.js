// [CODED BY - HUI ANGELES]
import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './UserContext';
import './App.css';
import AppNavBar from './components/AppNavBar';
import ForgetPassword from './components/ForgetPassword';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductView from './pages/ProductView';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Registration from './pages/Registration';
import Profile from "./pages/Profile";
import CartDetails from './pages/CartDetails';
import CheckOutOrder from './pages/CheckOutOrder';
import OrderSummary from './pages/OrderSummary';
import ErrorPage from './pages/Error';

export default function App() {
    // Initialization 
    const [user, setUser] = useState({
        id: localStorage.getItem('token') ? localStorage.getItem('token') : null, 
        email: null,
        isAdmin: null
    });
    const [isLoading, setIsLoading] = useState(true);

    const clearUserData = () => {
        localStorage.removeItem('token'); 
        localStorage.removeItem('role'); // Remove the stored role
        setUser({
            id: null,
            email: null,
            isAdmin: null
        });
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        const storedRole = localStorage.getItem("role"); // Get the stored role

        if (token) {
            fetchUserData(token);
        } else if (storedRole === "admin") { // Check if the stored role is admin
            setUser(prevUser => ({ ...prevUser, isAdmin: true }));
            setIsLoading(false); // No need to wait for user details fetching
        } else {
            setIsLoading(false); // No need to wait for user details fetching
        }
    }, []); // Remove [user.id] from dependencies array

    const fetchUserData = (token) => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/users/details`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            console.log(data.userDetails);

            const userDetails = data.userDetails; 
            if (userDetails && userDetails._id) {
                setUser({
                    id: userDetails._id,
                    email: userDetails.email,
                    isAdmin: userDetails.isAdmin
                });

                // Store the user role in local storage
                localStorage.setItem("role", userDetails.isAdmin ? "admin" : "user");
            } else {
                console.error("User data is not as expected:", data);
            }
            setIsLoading(false); // User details fetching completed
        })
        .catch(error => {
            console.error("Error fetching user details:", error);
            setIsLoading(false); // User details fetching completed
        });
    };

    if (isLoading) {
        // Display loading indicator while fetching user details
        return <div>Loading...</div>;
    }

    return (
        <UserProvider value={{ user, setUser, clearUserData }}>
            <Router>
                <Container fluid className='p-0'>
                    <AppNavBar/>
            
                    <Routes>
                        <Route element={<Home/>} path="/"/>
                        <Route element={<Products/>} path="/products"/>
                        <Route element={<Logout/>} path="/logout"/>
                        <Route element={<Login/>} path="/login"/>
                        <Route element={<Registration/>} path="/registration"/>
                        <Route element={<Profile/>} path="/profile"/>
                        <Route element={<ProductView/>} path="/products/:productId"/>
                        <Route element={<CartDetails/>} path="/cartDetails"/>
                        <Route element={<CheckOutOrder/>} path="/checkOutOrder"/>
                        <Route element={<ForgetPassword/>} path="/forget-password"/>
                        <Route element={<OrderSummary/>} path="/orderHistory"/>
                        <Route element={<ErrorPage/>} path="*"/>
                    </Routes>
                    
                </Container>
            </Router>
        </UserProvider>
    );
}
