import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/login';
import Logout from './pages/logout'
import Sidebar from './pages/sidebar';

import Dashboard from './pages/dashboard';
import AddBook from './pages/book/addBook';
import EditBook from './pages/book/editBook';
import DeleteBook from './pages/book/deleteBook';

import Customer from './pages/customer';
import AddCustomer from './pages/customer/addCustomer';
import EditCustomer from './pages/customer/editCustomer';

import Category from './pages/category';
import AddCategory from './pages/category/addCategory';
import EditCategory from './pages/category/editCategory';
import DeleteCategory from './pages/category/deleteCategory';

import Transaction from './pages/transaction';
import AddTransaction from './pages/transaction/addTransaction';
import EditTransaction from './pages/transaction/editTransaction';

const App = () => {
    const location = useLocation();

    const shouldShowSidebar = location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/category') || location.pathname.startsWith('/transaction') || location.pathname.startsWith('/customer');
    return (
        <>
            {shouldShowSidebar && <Sidebar />}
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />

                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/addBook" element={<AddBook />} />
                <Route path="/editBook/:id" element={<EditBook />} />
                <Route path="/deleteBook/:id" element={<DeleteBook />} />

                <Route path="/customer" element={<Customer />} />
                <Route path="/addCustomer" element={<AddCustomer />} />
                <Route path="/editCustomer/:id" element={<EditCustomer />} />

                <Route path="/category" element={<Category />} />
                <Route path="/addCategory" element={<AddCategory />} />
                <Route path="/editCategory/:id" element={<EditCategory />} />
                <Route path="/deleteCategory/:id" element={<DeleteCategory />} />

                <Route path="/transaction" element={<Transaction />} />
                <Route path="/addTransaction" element={<AddTransaction />} />
                <Route path="/editTransaction/:id" element={<EditTransaction />} />

            </Routes>
        </>
    );
};

const AppWrapper = () => (
    <Router>
        <App />
    </Router>
);

export default AppWrapper;
