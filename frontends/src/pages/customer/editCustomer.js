import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './editCustomer.css';

const EditCustomer = () => {
    const { id } = useParams();
    const [nama, setNama] = useState('');
    const [alamat, setAlamat] = useState('');
    const [nomor_telepon, setNomor_telepon] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5000/api/customer/${id}`)
            .then(response => response.json())
            .then(data => {
                setNama(data.nama);
                setAlamat(data.alamat);
                setNomor_telepon(data.nomor_telepon);
            })
            .catch(error => console.error('Error:', error));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:5000/api/customer/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nama,
                alamat,
                nomor_telepon
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            navigate('/customer');
        })
        .catch(error => console.error('Error:', error));
    };

    const handleCancel = () => {
        navigate('/customer');
    };

    return (
        <div className="edit-customer-container">
            <h2>Edit Customer</h2>
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

export default EditCustomer;
