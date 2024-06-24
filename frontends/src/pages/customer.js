import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DeleteCustomer from './customer/deleteCustomer'; // Pastikan Anda mengimpor komponen DeleteCustomer
import './customer.css'; // Pastikan Anda memiliki file CSS ini untuk styling

const Customer = () => {
    const [customers, setCustomers] = useState([]);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false); // State untuk mengatur status dialog delete
    const [customerIdToDelete, setCategoryIdToDelete] = useState(null); // State untuk menyimpan ID kategori yang akan dihapus
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:5000/api/customer')
            .then(response => response.json())
            .then(data => setCustomers(data))
            .catch(error => console.error('Error:', error));
    }, []);

    const handleEdit = (id) => {
        console.log('Edit customer with id:', id);
        navigate(`/editCustomer/${id}`);
        // Add edit functionality here
    };

    const handleDelete = (id) => {
        // Buka dialog delete dan set ID kategori yang akan dihapus
        setDeleteDialogOpen(true);
        setCategoryIdToDelete(id);
    };

    const handleConfirmDelete = () => {
        // Lakukan pemanggilan API untuk menghapus kategori berdasarkan categoryIdToDelete
        fetch(`http://localhost:5000/api/customer/${customerIdToDelete}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                setCustomers(customers.filter(customer => customer.id !== customerIdToDelete));
                setDeleteDialogOpen(false); // Tutup dialog setelah berhasil menghapus
            } else {
                throw new Error('Gagal menghapus kategori');
            }
        })
        .catch(error => console.error('Error:', error));
    };

    const handleCancelDelete = () => {
        // Tutup dialog tanpa melakukan penghapusan
        setDeleteDialogOpen(false);
        setCategoryIdToDelete(null);
    };

    const handleAddCustomer = () => {
        navigate('/addCustomer'); // Redirect to /addCustomer
    };

    return (
        <div className="customer-container">
            <div className="header">
                <h1>Dashboard / Management Customers</h1>
                <button className="add-customer-button" onClick={handleAddCustomer}>
                    Add New Customer
                </button>
            </div>
            <table className="customer-table">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Nama</th>
                        <th>Alamat</th>
                        <th>No Telp</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer, index) => (
                        <tr key={customer.id}>
                            <td>{index + 1}</td>
                            <td>{customer.nama}</td>
                            <td>{customer.alamat}</td>
                            <td>{customer.nomor_telepon}</td>
                            <td>
                                <button onClick={() => handleEdit(customer.id)} className="edit-button">
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(customer.id)} className="delete-button">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <DeleteCustomer
                isOpen={deleteDialogOpen}
                onClose={handleCancelDelete}
                onConfirm={handleConfirmDelete}
            />
        </div>
    );
};

export default Customer;
