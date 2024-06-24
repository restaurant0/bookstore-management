// src/Logout.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleLogout = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/logout', {
                    method: 'POST',
                    credentials: 'include'
                });
                
                const data = await response.json();
                
                if (response.ok) {
                    alert(data.message);
                    navigate('/login');
                } else {
                    alert('Logout failed');
                }
            } catch (error) {
                console.error('Error during logout:', error);
                alert('Failed to logout');
            }
        };

        handleLogout();
    }, [navigate]);

    return (
        <div>
            <p>Logging out...</p>
        </div>
    );
};

export default Logout;
