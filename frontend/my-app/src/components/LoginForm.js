import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import '../css/LoginPage.css';

const LoginForm = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await api.userLogin({ phoneNumber, password });
            const token = response.data.token;
            // Saving token in local storage for authentication
            localStorage.setItem('token', token);
            navigate('/order-details');
        } catch (error) {
            console.error('Login error:', error);
            setErrorMessage('Incorrect credentials or Sign Up if new user');
            setPhoneNumber('');
            setPassword('');
        }
    };

    return (
        <div className="login-form">
            <h2>Login</h2>
            <input
                className="login-input"
                type="text"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <input
                className="login-input"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button className="login-button" onClick={handleLogin}>Login</button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
    );
};

export default LoginForm;

