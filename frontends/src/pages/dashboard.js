import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DeleteBook from './book/deleteBook';
import './dashboard.css';

const Dashboard = () => {
    const [books, setBooks] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteBookId, setDeleteBookId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:5000/api/book')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch books');
                }
                return response.json();
            })
            .then(data => {
                // Filter out books with any empty fields
                const filteredBooks = data.filter(book => 
                    book.judul && book.penulis && book.penerbit && book.harga && book.category
                );
                setBooks(filteredBooks);
            })
            .catch(error => {
                console.error('There was an error fetching the books!', error);
            });
    }, []);

    const handleEdit = (id) => {
        navigate(`/editBook/${id}`);
    };

    const handleDelete = (id) => {
        setDeleteBookId(id);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = () => {
        fetch(`http://localhost:5000/api/book/${deleteBookId}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                // Refresh the book list after successful deletion
                fetch('http://localhost:5000/api/book')
                    .then(response => response.json())
                    .then(data => {
                        const filteredBooks = data.filter(book => 
                            book.judul && book.penulis && book.penerbit && book.harga && book.category
                        );
                        setBooks(filteredBooks);
                    })
                    .catch(error => {
                        console.error('Error fetching books after deletion', error);
                    });
            } else {
                console.error('Failed to delete book');
            }
        })
        .catch(error => {
            console.error('Error deleting book', error);
        })
        .finally(() => {
            setShowDeleteModal(false);
        });
    };

    const handleCloseModal = () => {
        setShowDeleteModal(false);
    };

    const handleAddBook = () => {
        navigate('/addBook');
    };

    return (
        <div className="dashboard-container">
            <div className="header">
                <h1>Dashboard / Management Book</h1>
                <button className="add-book-button" onClick={handleAddBook}>
                    Add New Book
                </button>
            </div>
            <table className="book-table">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Title</th>
                        <th>Writer</th>
                        <th>Publisher</th>
                        <th>Price (Rp)</th>
                        <th>Category</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book, index) => (
                        <tr key={book.id}>
                            <td>{index + 1}</td>
                            <td>{book.judul}</td>
                            <td>{book.penulis}</td>
                            <td>{book.penerbit}</td>
                            <td>{book.harga}</td>
                            <td>{book.category}</td>
                            <td>
                                <button onClick={() => handleEdit(book.id)} className="edit-button">
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(book.id)} className="delete-button">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <DeleteBook isOpen={showDeleteModal} onClose={handleCloseModal} onConfirm={handleConfirmDelete} />
        </div>
    );
};

export default Dashboard;
