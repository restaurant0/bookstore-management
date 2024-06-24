import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css'; // Pastikan Anda memiliki file CSS ini untuk styling

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: username, password: password }),
                credentials: 'include'
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message);
                navigate('/dashboard');
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error during fetch:', error);
            alert('Failed to fetch');
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h1>MyBook</h1>
                <h2>Sign In To MyBook</h2>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input 
                            type="username" 
                            id="username" 
                            name="username" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                        />
                    </div>
                    <button type="submit">Sign In</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
