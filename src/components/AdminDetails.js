// [CODED BY: HUI ANGELES]
import { useState, useEffect, useContext } from 'react';
import { Row, Col, Tabs, Tab, Container } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import ResetPassword from '../components/ResetPassword';
import UpdateProfile from './UpdateProfile';
import UserContext from '../UserContext';

export default function AdminDetails() {
    const [userDetails, setUserDetails] = useState(null);
    const [error, setError] = useState(null);
    const { user } = useContext(UserContext);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/details`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch profile');
                }
                const data = await response.json();
                setUserDetails(data.userDetails);
            } catch (error) {
                setError('Failed to fetch profile. Please try again later.');
            }
        };

        fetchProfile();
    }, []);

    if (!localStorage.getItem('token')) {
        return <Navigate to="/login" />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!userDetails) {
        return <div>Loading...</div>;
    }

    return (
        (user.isAdmin !== false) ?
        <Container fluid className='d-flex'>
            <Row className='ms-auto'> 
                <Col className="p-5 bg-light text-dark">
                    <Tabs id="profile-tabs" variant="pills" className="mb-3">
                        <Tab eventKey="details" title="Profile">
                            <h1 className="my-5">Profile</h1>
                            <div>
                                <h2 className="mt-3">{userDetails.firstName} {userDetails.lastName}</h2>
                                <hr />
                                <h4>Contacts</h4>
                                <ul>
                                    <li>Email: {userDetails.email}</li>
                                    <li>Mobile No: {userDetails.mobileNo}</li>
                                </ul>
                            </div>
                        </Tab>
                        <Tab eventKey="updateprofile" title="Update Profile">
                            <UpdateProfile/>
                        </Tab>
                        <Tab eventKey="resetpassword" title="Reset Password">
                            <ResetPassword/>
                        </Tab>
                    </Tabs>
                </Col>
            </Row>
        </Container>
        :
        <Navigate to='/home'/>
    );
}
