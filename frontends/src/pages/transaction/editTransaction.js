import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './editTransaction.css';

const EditTransaction = () => {
    const { id } = useParams();
    const [noTransaction, setNotransaction] = useState('');
    const [customerID, setCustomerID] = useState('');
    const [bookID, setBookID] = useState('');
    const [jumlah, setJumlah] = useState('');
    const [total, setTotal] = useState('');
    const [waktu, setWaktu] = useState('');
    const [customers, setCustomers] = useState([]);
    const [books, setBooks] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:5000/api/customer')
            .then(response => response.json())
            .then(data => setCustomers(data));

        fetch('http://localhost:5000/api/book')
            .then(response => response.json())
            .then(data => setBooks(data));
            
        fetch(`http://localhost:5000/api/transaction/${id}`)
            .then(response => response.json())
            .then(data => {
                setNotransaction(data.noTransaction);
                setCustomerID(data.id_pelanggan);
                setBookID(data.id_buku);
                setJumlah(data.jumlah);
                setTotal(data.total_harga);
                setWaktu(new Date(data.tanggal).toISOString().slice(0, 16)); // format datetime-local
            })
            .catch(error => console.error('Error fetching transaction:', error));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedTransaction = {
            noTransaction,
            id_pelanggan: customerID,
            id_buku: bookID,
            jumlah,
            total_harga: total,
            tanggal: waktu
        };

        fetch(`http://localhost:5000/api/transaction/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedTransaction)
        })
            .then(response => response.json())
            .then(data => {
                if (data.message === 'Transaksi berhasil diupdate') {
                    navigate('/transaction');
                } else {
                    console.error('Failed to update transaction', data);
                }
            })
            .catch(error => console.error('Error updating transaction:', error));
    };

    const handleCancel = () => {
        navigate('/transaction');
    };

    return (
        <div className="edit-transaction-container">
            <h2>Edit Transaction</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>No Transaction</label>
                    <input
                        type="text"
                        value={noTransaction}
                        onChange={(e) => setNotransaction(e.target.value)}
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
                        type="text"
                        value={jumlah}
                        onChange={(e) => setJumlah(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Total Pembayaran</label>
                    <input
                        type="text"
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

export default EditTransaction;
