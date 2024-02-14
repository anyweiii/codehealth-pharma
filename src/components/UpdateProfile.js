// [CODED BY: HUI ANGELES]
import React, { useState, useContext, useEffect } from 'react';
import UserContext from '../UserContext';

export default function UpdateProfile() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [address, setAddress] = useState('');
    const { user, setUser } = useContext(UserContext);
    const [profileUpdated, setProfileUpdated] = useState(false);

    useEffect(() => {
        if (profileUpdated) {
            window.location.reload();
        }
    }, [profileUpdated]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const token = localStorage.getItem('token');
        if (mobileNo.trim() !== '' && mobileNo.length !== 11) {
            alert('Mobile number must be exactly 11 digits');
            return;
        }

        const updateFields = {};
        if (firstName.trim() !== '') updateFields.firstName = firstName;
        if (lastName.trim() !== '') updateFields.lastName = lastName;
        if (email.trim() !== '') updateFields.email = email;
        if (mobileNo.trim() !== '') updateFields.mobileNo = mobileNo;
        if (address.trim() !== '' && !user.isAdmin) updateFields.address = address;

        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/update-profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(updateFields)
            });

            if (!response.ok) {
                throw new Error('Failed to update profile');
            }

            alert('Profile updated successfully');
            setProfileUpdated(true);
            setFirstName('');
            setLastName('');
            setEmail('');
            setMobileNo('');
            setAddress('');

            const userDetailsResponse = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/details`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (!userDetailsResponse.ok) {
                throw new Error('Failed to fetch updated user details');
            }

            const { userDetails } = await userDetailsResponse.json();
            setUser(userDetails); 

        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };  

    return (
        <div>
            <h2>Update Profile</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    First Name:
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </label>
                <br />
                <label>
                    Last Name:
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </label>
                <br />
                <label>
                    Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <br />
                <label>
                    Mobile Number:
                    <input type="text" value={mobileNo} onChange={(e) => setMobileNo(e.target.value)} />
                </label>
                <br />
                {!user.isAdmin && (
                    <>
                        <label>
                            Address:
                            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
                        </label>
                        <br />
                    </>
                )}
                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
};
