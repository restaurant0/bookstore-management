import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './category.css'; 
import DeleteCategory from './category/deleteCategory'; // Pastikan mengimpor komponen DeleteCategory

const Category = () => {
    const [categories, setCategories] = useState([]);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false); // State untuk mengatur status dialog delete
    const [categoryIdToDelete, setCategoryIdToDelete] = useState(null); // State untuk menyimpan ID kategori yang akan dihapus
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:5000/api/category')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setCategories(data))
            .catch(error => console.error('Error:', error));
    }, []);

    const handleEdit = (id) => {
        navigate(`/editCategory/${id}`);
    };

    const handleDelete = (id) => {
        // Buka dialog delete dan set ID kategori yang akan dihapus
        setDeleteDialogOpen(true);
        setCategoryIdToDelete(id);
    };

    const handleConfirmDelete = () => {
        // Lakukan pemanggilan API untuk menghapus kategori berdasarkan categoryIdToDelete
        fetch(`http://localhost:5000/api/category/${categoryIdToDelete}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                setCategories(categories.filter(category => category.id !== categoryIdToDelete));
                setDeleteDialogOpen(false); // Tutup dialog setelah berhasil menghapus
            } else {
                throw new Error('Gagal menghapus kategori');
            }
        })
        .catch(error => console.error('Error:', error));
    };

    const handleCancelDelete = () => {
        // Tutup dialog tanpa melakukan penghapusan
        setDeleteDialogOpen(false);
        setCategoryIdToDelete(null);
    };

    const handleAddCategory = () => {
        navigate('/addCategory');
    };

    return (
        <div className="category-container">
            <div className="header">
                <h1>Dashboard / Management Category</h1>
                <button className="add-category-button" onClick={handleAddCategory}>
                    Add New Category
                </button>
            </div>
            <table className="category-table">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Jenis Category</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category, index) => (
                        <tr key={category.id}>
                            <td>{index + 1}</td>
                            <td>{category.nama_kategori}</td>
                            <td>
                                <button onClick={() => handleEdit(category.id)} className="edit-button">
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(category.id)} className="delete-button">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <DeleteCategory
                isOpen={deleteDialogOpen}
                onClose={handleCancelDelete}
                onConfirm={handleConfirmDelete}
            />
        </div>
    );
};

export default Category;
