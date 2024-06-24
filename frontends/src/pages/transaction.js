import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DeleteTransaction from './transaction/deleteTransaction'; 
import './transaction.css';

const Transaction = () => {
    const [transactions, setTransactions] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteTransactionId, setDeleteTransactionId] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        // Fetch transactions from backend
        const fetchTransactions = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/transaction');
                const data = await response.json();
                setTransactions(data);
            } catch (error) {
                console.error('Failed to fetch transactions:', error);
            }
        };

        fetchTransactions();
    }, []);

    const handleEdit = (id) => {
        console.log('Edit transaction with id:', id);
        navigate(`/editTransaction/${id}`); // Redirect to edit transaction page with id
    };

    const handleDelete = (id) => {
        setDeleteTransactionId(id);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = () => {
        fetch(`http://localhost:5000/api/transaction/${deleteTransactionId}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                // Refresh the transaction list after successful deletion
                fetch('http://localhost:5000/api/transaction')
                    .then(response => response.json())
                    .then(data => {
                        setTransactions(data);
                    })
                    .catch(error => {
                        console.error('Error fetching transactions after deletion', error);
                    });
            } else {
                throw new Error('Failed to delete transaction');
            }
        })
        .catch(error => {
            console.error('Error deleting transaction', error);
        })
        .finally(() => {
            setShowDeleteModal(false);
        });
    };
    

    const handleCloseModal = () => {
        setShowDeleteModal(false);
    };

    const handleAddTransaction = () => {
        navigate('/addTransaction'); // Redirect to add transaction page
    };

    return (
        <div className="transaction-container">
            <div className="header">
                <h1>Dashboard / Management Transactions</h1>
                <button className="add-transaction-button" onClick={handleAddTransaction}>
                    Add New Transaction
                </button>
            </div>
            <table className="transaction-table">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>No Transaction</th>
                        <th>Nama Customer</th>
                        <th>Judul Buku</th>
                        <th>Jumlah Buku</th>
                        <th>Total Pembayaran</th>
                        <th>Waktu</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction, index) => (
                        <tr key={transaction.id}>
                            <td>{index + 1}</td>
                            <td>{transaction.noTransaction}</td>
                            <td>{transaction.nama_pelanggan}</td> {/* Ubah ini */}
                            <td>{transaction.judul_buku}</td> {/* Ubah ini */}
                            <td>{transaction.jumlah}</td>
                            <td>{transaction.total_harga}</td>
                            <td>{transaction.tanggal}</td>
                            <td>
                                <button onClick={() => handleEdit(transaction.id)} className="edit-button">
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(transaction.id)} className="delete-button">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <DeleteTransaction isOpen={showDeleteModal} onClose={handleCloseModal} onConfirm={handleConfirmDelete} />
        </div>
    );
};

export default Transaction;
