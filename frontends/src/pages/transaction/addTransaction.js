import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './addTransaction.css';

const AddTransaction = () => {
    const [noTransaction, setNoTransaction] = useState('');
    const [customerID, setCustomerID] = useState('');
    const [bookID, setBookID] = useState('');
    const [jumlah, setJumlah] = useState('');
    const [total, setTotal] = useState('');
    const [waktu, setWaktu] = useState('');
    const [customers, setCustomers] = useState([]);
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch customers and books from API
        fetch('http://localhost:5000/api/customer')
            .then(response => response.json())
            .then(data => setCustomers(data));

        fetch('http://localhost:5000/api/book')
            .then(response => response.json())
            .then(data => setBooks(data));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const transactionData = {
            noTransaction,
            id_pelanggan: customerID,
            id_buku: bookID,
            jumlah,
            total_harga: total,
            tanggal: waktu
        };

        fetch('http://localhost:5000/api/transaction', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(transactionData)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                // Redirect to transactions page
                navigate('/transaction');
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    const handleCancel = () => {
        navigate('/transaction');
    };

    return (
        <div className="add-transaction-container">
            <h2>Add New Transaction</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>No Transaction</label>
                    <input
                        type="text"
                        value={noTransaction}
                        onChange={(e) => setNoTransaction(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Nama Customer</label>
                    <select value={customerID} onChange={(e) => setCustomerID(e.target.value)}>
                        <option value="">Select Customer</option>
                        {customers.map(customer => (
                            <option key={customer.id} value={customer.id}>
                                {customer.nama}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Judul Buku</label>
                    <select value={bookID} onChange={(e) => setBookID(e.target.value)}>
                        <option value="">Select Book</option>
                        {books.map(book => (
                            <option key={book.id} value={book.id}>
                                {book.judul}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Jumlah Buku</label>
                    <input
                        type="number"
                        value={jumlah}
                        onChange={(e) => setJumlah(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Total Pembayaran</label>
                    <input
                        type="number"
                        value={total}
                        onChange={(e) => setTotal(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Waktu Transaction</label>
                    <input
                        type="datetime-local"
                        value={waktu}
                        onChange={(e) => setWaktu(e.target.value)}
                    />
                </div>
                <div className="btn-container">
                    <button className="btn save">Save</button>
                    <button className="btn cancel" onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default AddTransaction;
