import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './editBook.css';

const EditBook = () => {
    const [judul, setJudul] = useState('');
    const [penulis, setPenulis] = useState('');
    const [penerbit, setPenerbit] = useState('');
    const [harga, setHarga] = useState('');
    const [nama_kategori, setNama_kategori] = useState('');
    const [categories, setCategories] = useState([]);

    const { id } = useParams(); // Get book ID from URL parameters
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch book data by ID and set the state
        fetch(`http://localhost:5000/api/book/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setJudul(data.judul);
                setPenulis(data.penulis);
                setPenerbit(data.penerbit);
                setHarga(data.harga);
                setNama_kategori(data.category.id); // Updated to set category ID
            })
            .catch((error) => console.error('Error fetching book data:', error));
    }, [id]);

    useEffect(() => {
        // Fetch all categories and set the state
        fetch('http://localhost:5000/api/category')
            .then((response) => response.json())
            .then((data) => {
                setCategories(data);
            })
            .catch((error) => console.error('Error fetching categories:', error));
    }, []);

    const handleCancel = () => {
        navigate('/dashboard');
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedBook = {
            judul,
            penulis,
            penerbit,
            harga: parseFloat(harga),
            id_kategori: nama_kategori // assuming category is the ID, you might need to adjust based on your actual data structure
        };

        fetch(`http://localhost:5000/api/book/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedBook)
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Book updated successfully:', data);
                navigate('/dashboard'); // Redirect to dashboard after successful update
            })
            .catch((error) => console.error('Error updating book:', error));
    };

    return (
        <div className="edit-book-container">
            <h2>Edit Book</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        value={judul}
                        onChange={(e) => setJudul(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Writer</label>
                    <input
                        type="text"
                        value={penulis}
                        onChange={(e) => setPenulis(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Publisher</label>
                    <input
                        type="text"
                        value={penerbit}
                        onChange={(e) => setPenerbit(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input
                        type="number"
                        value={harga}
                        onChange={(e) => setHarga(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Category</label>
                    <select
                        value={nama_kategori}
                        onChange={(e) => setNama_kategori(e.target.value)}
                    >
                        <option value="">Select Category</option>
                        {Array.isArray(categories) && categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.nama_kategori}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="btn-container">
                    <button className="btn save">Save</button>
                    <button className="btn cancel" onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default EditBook;
