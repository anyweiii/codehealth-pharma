// [CODED BY: HUI ANGELES]
import { Container, Nav, Navbar, Offcanvas} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import UserContext from '../UserContext';
import '../styles/Homepage/navbar.css';

export default function AppNavBar() {
    const { user } = useContext(UserContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user.id !== null && user.isAdmin !== null) {
            setLoading(false);
        }
    }, [user]);

    return (
        <Navbar key="lg" expand="lg" className="navbar">
            <Container fluid>
                <Navbar.Brand href="/">
                <img src={require('../styles/Homepage/images/codehealth-logo.png')} className='homelogo' />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls={`offcanvasNavbar-lg`} />

                <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-lg`}
                    aria-labelledby={`offcanvasNavbarLabel-lg`}
                    placement="end"
                >

                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id={`offcanvasNavbarLabel-lg`}>
                            Offcanvas
                        </Offcanvas.Title>
                    </Offcanvas.Header>

                    <Offcanvas.Body>
                        <Nav className="d-flex ms-auto">
                            <Nav.Link as={NavLink} to="/" className="nav-link-navbar">Home</Nav.Link>
                            {(user.id === null && !user.isAdmin || user.id !== null && !user.isAdmin) && (
                                <Nav.Link as={NavLink} to="/products" className="nav-link-navbar">Products</Nav.Link>
                            )}
                            {user.id !== null ? (
                                user.isAdmin ? (
                                    <>
                                        <Nav.Link as={NavLink} to="/products" className="nav-link-navbar">Admin Dashboard</Nav.Link>
                                        <Nav.Link as={NavLink} to="/logout" className="nav-link-navbar">Logout</Nav.Link>
                                    </>
                                ) : (
                                    <>
                                        <Nav.Link as={NavLink} to="/cartDetails" className="nav-link-navbar">Cart</Nav.Link>
                                        <Nav.Link as={NavLink} to="/orderHistory" className="nav-link-navbar">Order History</Nav.Link>
                                        <Nav.Link as={NavLink} to="/profile" className="nav-link-navbar">Profile</Nav.Link>
                                        <Nav.Link as={NavLink} to="/logout" className="nav-link-navbar">Logout</Nav.Link>
                                    </>
                                )
                            ) : (
                                <>
                                    <Nav.Link as={NavLink} to="/login" className="nav-link-navbar">Login</Nav.Link>
                                    <Nav.Link as={NavLink} to="/registration" className="nav-link-navbar">Register</Nav.Link>
                                </>
                            )}
                        </Nav>
                    </Offcanvas.Body>

                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
}
