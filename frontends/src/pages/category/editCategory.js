import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './editCategory.css';

const EditCategory = () => {
    const [jenis, setJenis] = useState('');
    const { id } = useParams(); // Mengambil ID dari URL
    const navigate = useNavigate();

    useEffect(() => {
        // Ambil data kategori berdasarkan ID
        fetch(`http://localhost:5000/api/category/${id}`)
            .then(response => response.json())
            .then(data => setJenis(data.nama_kategori))
            .catch(error => console.error('Error:', error));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Kirim data yang telah diedit ke server
        fetch(`http://localhost:5000/api/category/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nama_kategori: jenis })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                navigate('/category'); // Redirect to category page after saving
            })
            .catch(error => console.error('Error:', error));
    };

    const handleCancel = () => {
        navigate('/category'); // Redirect to /category
    };

    return (
        <div className="edit-category-container">
            <h2>Edit Category</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Jenis Category</label>
                    <input
                        type="text"
                        value={jenis}
                        onChange={(e) => setJenis(e.target.value)}
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

export default EditCategory;