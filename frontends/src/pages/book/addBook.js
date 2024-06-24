import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './addBook.css';

const AddBook = () => {
    const [judul, setJudul] = useState('');
    const [penulis, setPenulis] = useState('');
    const [penerbit, setPenerbit] = useState('');
    const [harga, setHarga] = useState('');
    const [nama_kategori, setNama_kategori] = useState('');
    const [categories, setCategories] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:5000/api/category')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch categories');
                }
                return response.json();
            })
            .then(data => {
                setCategories(data);
            })
            .catch(error => {
                console.error('There was an error fetching the categories!', error);
            });

    }, []);

    const handleCancel = () => {
        navigate('/dashboard');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const bookData = {
            judul,
            penulis,
            penerbit,
            harga,
            id_kategori: nama_kategori
        };

        fetch('http://localhost:5000/api/book', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookData),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to add the book');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                navigate('/dashboard');
            })
            .catch(error => {
                console.error('There was an error adding the book!', error);
            });
    };

    return (
        <div className="add-book-container">
            <h2>Add New Book</h2>
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
                        {categories.map(category => (
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

export default AddBook;
