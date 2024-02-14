// [CODED BY: HUI ANGELES]
import UserRegister from '../components/UserRegister';
import AdminRegister from '../components/AdminRegister';
import UserContext from '../UserContext';
import { Container, Row, Col, Nav, Tab } from 'react-bootstrap';
import { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import '../styles/Register/registration.css';

export default function Registration() {
    const { user } = useContext(UserContext);
    const [activeTab, setActiveTab] = useState('first');
    const [showUserRegister, setShowUserRegister] = useState(false);
    const [showAdminRegister, setShowAdminRegister] = useState(false);

    const handleTabSelect = (key) => {
        setActiveTab(key);

        if (key !== 'first') {
            setShowUserRegister(false);
        } else if (key !== 'second') {
            setShowAdminRegister(false);
        }
    };

    return (
        (user.id !== null ) ?
        <Navigate to="/"/>
        :
        <>
            <Container fluid className="registration-bg d-flex align-items-center justify-content-center w-100">
                <Tab.Container id="left-tabs-example" activeKey={activeTab} onSelect={handleTabSelect}>
                    <Row className='flex-column'>
                        <Col className="d-flex justify-content-center mt-5">
                            <Nav variant="pills" className="flex-row rounded-pill shadow-lg custom-nav-pills">
                                <Nav.Item>
                                    <Nav.Link eventKey="first" className='nav-link-registration rounded-pill px-4'>I'm a customer</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="second" className='nav-link-registration rounded-pill px-4'>I'm an admin</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>


                        <Col className="d-flex justify-content-center">
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                    <UserRegister />
                                </Tab.Pane>

                                <Tab.Pane eventKey="second">
                                    <AdminRegister />
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </Container>
        </>
    );  
}
