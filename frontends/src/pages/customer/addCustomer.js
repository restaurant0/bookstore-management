import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './addCustomer.css';

const AddCustomer = () => {
    const [nama, setNama] = useState('');
    const [alamat, setAlamat] = useState('');
    const [nomor_telepon, setNomor_telepon] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            nama: nama,
            alamat: alamat,
            nomor_telepon: nomor_telepon
        };

        fetch('http://localhost:5000/api/customer', { // Pastikan port dan URL sesuai dengan backend Flask Anda
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Gagal menambahkan customer');
            })
            .then(data => {
                console.log('Response:', data);
                navigate('/customer');
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    const handleCancel = () => {
        navigate('/customer'); // Redirect to /customer
    };

    return (
        <div className="add-customer-container">
            <h2>Add New Customer</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nama</label>
                    <input
                        type="text"
                        value={nama}
                        onChange={(e) => setNama(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Alamat</label>
                    <input
                        type="text"
                        value={alamat}
                        onChange={(e) => setAlamat(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>No Telp</label>
                    <input
                        type="text"
                        value={nomor_telepon}
                        onChange={(e) => setNomor_telepon(e.target.value)}
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

export default AddCustomer;
