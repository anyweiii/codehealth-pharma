// [CODED BY - HUI ANGELES]
import React, { useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from '../UserContext';

export default function AllUsersComponent() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const token = localStorage.getItem('token');
    const [selectedUser, setSelectedUser] = useState(null);
    const { user } = useContext(UserContext);
    console.log("User:", user); 
    const fetchUsers = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/all-users`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            if (!response.ok) {
                throw new Error('Failed to fetch users.');
            }
            
            const responseData = await response.json();

            if (!responseData || !responseData.users || !Array.isArray(responseData.users)) {
                throw new Error('Fetched users data is not in the expected format.');
            }

            responseData.users.forEach(user => {
                user.password = "******";
            });

            setUsers(responseData.users);
        } catch (error) {
            console.error(error);
            setError("There is an error fetching users.");
        }
    };

    useEffect(() => {
        fetchUsers();
        // eslint-disable-next-line
    }, [token]);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        setSelectedUser(null);
    };

    const toggleAdminStatus = (user, e) => {
        e.preventDefault();
        const userId = user._id;
        fetch(`${process.env.REACT_APP_API_BASE_URL}/users/${userId}/set-as-admin/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            if (response.ok) {
                fetchUsers(); 
                console.log("User admin status toggled successfully!");
                if (selectedUser !== user) {
                    setSelectedUser(user);
                }
            } else {
                return response.json().then(data => {
                    throw new Error(data.message || 'Failed to toggle user admin status');
                });
            }
        })
        .catch(error => {
            console.error("Failed to toggle user admin status:", error.message);
        });
    };
    
    const revokeAdminStatus = (user, e) => {
        e.preventDefault();
        const userId = user._id;
        fetch(`${process.env.REACT_APP_API_BASE_URL}/users/${userId}/unset-as-admin/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            if (response.ok) {
                fetchUsers(); 
                console.log("User admin status revoked successfully!");
                if (selectedUser !== user) {
                    setSelectedUser(user);
                }
            } else {
                return response.json().then(data => {
                    throw new Error(data.error || 'Failed to revoke user admin status');
                });
            }
        })
        .catch(error => {
            console.error("Failed to revoke user admin status:", error.message);
        });
    };    

    const filteredUser = users.find(user => user.email.toLowerCase() === searchQuery.toLowerCase());

    const isAdmin = filteredUser && filteredUser.isAdmin;

    return (
        (user.isAdmin === true && user.id !== null) ?
        <div className="container">
            {error && <div className="error">{error}</div>}
            <h2>All Users</h2>
            <input 
                type="text" 
                placeholder="Search by email..." 
                value={searchQuery} 
                onChange={handleSearch} 
                className="search-input"
            />
            {filteredUser && (
                <div className="user-card">
                    <div className="user-details-card">
                        <h3>User Details</h3>
                        <p>First Name: {filteredUser.firstName}</p>
                        <p>Last Name: {filteredUser.lastName}</p>
                        <p>Email: {filteredUser.email}</p>
                        <div className="admin-toggle">
                            <p>Admin: {isAdmin ? 'Yes' : 'No'}</p>
                            {isAdmin && (
                                <button type="button" onClick={(e) => revokeAdminStatus(filteredUser, e)}>
                                    Revoke Admin
                                </button>
                            )}
                            {!isAdmin && (
                                <button type="button" onClick={(e) => toggleAdminStatus(filteredUser, e)}>
                                    Grant Admin
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
            {!filteredUser && searchQuery && <div className="error">Sorry, user doesn't exist.</div>}
        </div>
        :
        <Navigate to='/'/>
    );
};

