from flask import Blueprint, request, jsonify
from models import db, Book

book_bp = Blueprint('book_bp', __name__)

@book_bp.route('/', methods=['POST'])
def add_book():
    data = request.get_json()
    new_book = Book(
        judul=data['judul'],
        penulis=data['penulis'],
        penerbit=data['penerbit'],
        harga=data['harga'],
        id_kategori=data['id_kategori']
    )
    db.session.add(new_book)
    db.session.commit()
    return jsonify(new_book.to_dict()), 201

@book_bp.route('/', methods=['GET'])
def get_books():
    books = Book.query.all()
    return jsonify([book.to_dict() for book in books])

@book_bp.route('/<int:book_id>', methods=['GET'])
def get_book(book_id):
    book = Book.query.get_or_404(book_id)
    return jsonify(book.to_dict())

@book_bp.route('/<int:book_id>', methods=['PUT'])
def update_book(book_id):
    book = Book.query.get_or_404(book_id)
    data = request.get_json()
    book.judul = data.get('judul', book.judul)
    book.penulis = data.get('penulis', book.penulis)
    book.penerbit = data.get('penerbit', book.penerbit)
    book.harga = data.get('harga', book.harga)
    book.id_kategori = data.get('id_kategori', book.id_kategori)
    db.session.commit()
    return jsonify(book.to_dict()), 200

@book_bp.route('/<int:book_id>', methods=['DELETE'])
def delete_book(book_id):
    book = Book.query.get_or_404(book_id)
    db.session.delete(book)
    db.session.commit()
    return jsonify({'message': 'Book deleted successfully'}), 200


# Tambahkan metode `to_dict` pada model Book untuk serialisasi
def to_dict(self):
    return {
        'id': self.id,
        'judul': self.judul,
        'penulis': self.penulis,
        'penerbit': self.penerbit,
        'harga': self.harga,
        'id_kategori': self.id_kategori
    }


Book.to_dict = to_dict
