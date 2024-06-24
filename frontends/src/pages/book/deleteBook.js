import React from 'react';
import './deleteBook.css';

const DeleteBook = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Delete Book</h2>
                <p>Are you sure you want to delete this book?</p>
                <div className="modal-buttons">
                    <button className="btn-cancel" onClick={onClose}>Cancel</button>
                    <button className="btn-confirm" onClick={onConfirm}>Confirm</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteBook;
