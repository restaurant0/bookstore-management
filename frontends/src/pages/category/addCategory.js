import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './addCategory.css';

const AddCategory = () => {
    const [nama_kategori, setNama_kategori] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const data = {
            nama_kategori: nama_kategori
        };
    
        fetch('http://localhost:5000/api/category', { // Pastikan port dan URL sesuai dengan backend Flask Anda
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
            throw new Error('Gagal menambahkan kategori');
        })
        .then(data => {
            console.log('Response:', data);
            navigate('/category');
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };
    

    const handleCancel = () => {
        navigate('/category');
    };

    return (
        <div className="add-category-container">
            <h2>Add New Category</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Category Name</label>
                    <input
                        type="text"
                        value={nama_kategori}
                        onChange={(e) => setNama_kategori(e.target.value)}
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

export default AddCategory;
