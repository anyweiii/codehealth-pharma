// [CODED BY: HUI ANGELES]
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

export default function ForgetPassword() {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleForgetPassword = async (e) => {
        e.preventDefault();

        try {
            if (newPassword !== confirmPassword) {
                setMessage('Passwords do not match.');
                return;
            }

            if (newPassword.length < 8) {
                setMessage('Password must be at least 8 characters long.');
                return;
            }

            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/forget-password`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, newPassword, confirmPassword }),
            });

            if (response.ok) {
                setMessage('Password reset successfully.');
                setEmail('');
                setNewPassword('');
                setConfirmPassword('');
            } else {
                const errorData = await response.json();
                setMessage(errorData.error);
            }
        } catch (error) {
            setMessage('An error occurred. Please try again.');
            console.error(error);
        }
    };

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    const handleCancel = () => {
        handleShowModal();
    };

    const handleConfirmCancel = () => {
        setShowModal(false);
        setEmail('');
        setNewPassword('');
        setConfirmPassword('');
        navigate('/login');
    };

    const togglePasswordVisibility = (field) => {
        if (field === 'newPassword') {
            setNewPasswordVisibility(!newPasswordVisibility);
        } else {
            setConfirmPasswordVisibility(!confirmPasswordVisibility);
        }
    };

    const [newPasswordVisibility, setNewPasswordVisibility] = useState(false);
    const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(false);

    return (
        <div className="container">
            <h2>Forget Password</h2>
            <form onSubmit={handleForgetPassword}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="newPassword" className="form-label">
                        New Password
                    </label>
                    <div className="input-group">
                        <input
                            type={newPasswordVisibility ? 'text' : 'password'}
                            className="form-control"
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={() => togglePasswordVisibility('newPassword')}
                        >
                            {newPasswordVisibility ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                        </button>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">
                        Confirm Password
                    </label>
                    <div className="input-group">
                        <input
                            type={confirmPasswordVisibility ? 'text' : 'password'}
                            className="form-control"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={() => togglePasswordVisibility('confirmPassword')}
                        >
                            {confirmPasswordVisibility ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                        </button>
                    </div>
                </div>
                {message && <div className="alert alert-danger">{message}</div>}
                <button type="submit" className="btn btn-secondary mr-2">
                    Reset Password
                </button>
                <button type="button" className="btn btn-danger" onClick={handleCancel}>
                    Cancel
                </button>
            </form>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Cancel Transaction</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to cancel the current transaction?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Go Back
                    </Button>
                    <Button variant="danger" onClick={handleConfirmCancel}>
                        Cancel Transaction
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
