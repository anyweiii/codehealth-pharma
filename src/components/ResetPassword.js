// [CODED BY: HUI ANGELES]
import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

export default function ResetPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(false);

    const handleResetPassword = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }

        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/update-password`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ newPassword: password }),
            });

            if (response.ok) {
                setMessage('Password reset successfully');
                setPassword('');
                setConfirmPassword('');
            } else {
                const errorData = await response.json();
                setMessage(errorData.message);
            }
        } catch (error) {
            setMessage('An error occurred. Please try again.');
            console.error(error);
        }
    };

    const togglePasswordVisibility = (field) => {
        if (field === 'password') {
            setPasswordVisibility(!passwordVisibility);
        } else if (field === 'confirmPassword') {
            setConfirmPasswordVisibility(!confirmPasswordVisibility);
        }
    };

    return (
        <div className="container">
            <h2>Reset Password</h2>
            <form onSubmit={handleResetPassword}>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        New Password
                    </label>
                    <div className="input-group">
                        <input
                            type={passwordVisibility ? 'text' : 'password'}
                            className="form-control"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={() => togglePasswordVisibility('password')}
                        >
                            {passwordVisibility ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
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
                <button type="submit" className="btn btn-secondary">
                    Reset Password
                </button>
            </form>
        </div>
    );
};
