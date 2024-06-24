import React from 'react';
import { NavLink } from 'react-router-dom';
import './sidebar.css'; // Pastikan Anda memiliki file CSS ini untuk styling

const Sidebar = () => {
    return (
        <div className="sidebar">
            <h2>MyBook</h2>
            <ul>
                <li>
                    <NavLink to="/dashboard" activeClassName="active-link">
                        Books
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/category" activeClassName="active-link">
                        Category
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/customer" activeClassName="active-link">
                        Customers
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/transaction" activeClassName="active-link">
                        Transactions
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/logout" activeClassName="active-link">
                        Logout
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
