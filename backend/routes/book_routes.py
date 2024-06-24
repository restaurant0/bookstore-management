# from flask import Blueprint, request, jsonify, session
# from models import db, Book, Category
# from sqlalchemy.exc import IntegrityError
# from app import db

# book_bp = Blueprint('book_bp', __name__)

# # CRUD Book
# @book_bp.route('/api/book', methods=['GET', 'POST'])
# def api_book():
#     if 'admin_id' not in session:
#         return jsonify({'message': 'Unauthorized'}), 401
    
#     if request.method == 'POST':
#         data = request.json
#         book = Book(
#             judul=data.get('judul'),
#             penulis=data.get('penulis'),
#             penerbit=data.get('penerbit'),
#             harga=float(data.get('harga')),
#             id_kategori=data.get('id_kategori')
#         )
#         db.session.add(book)
#         db.session.commit()
#         return jsonify({'message': 'Buku berhasil ditambahkan'}), 201

#     books = Book.query.all()
#     books_list = [{
#         'id': book.id,
#         'judul': book.judul,
#         'penulis': book.penulis,
#         'penerbit': book.penerbit,
#         'harga': book.harga,
#         'id_kategori': book.id_kategori
#     } for book in books]
#     return jsonify(books_list), 200

# # Get, Update, Delete Book by ID
# @book_bp.route('/api/book/<int:book_id>', methods=['GET', 'PUT', 'DELETE'])
# def api_book_detail(book_id):
#     if 'admin_id' not in session:
#         return jsonify({'message': 'Unauthorized'}), 401
    
#     book = Book.query.get(book_id)
#     if not book:
#         return jsonify({'message': 'Buku tidak ditemukan'}), 404
    
#     if request.method == 'GET':
#         return jsonify({
#             'id': book.id,
#             'judul': book.judul,
#             'penulis': book.penulis,
#             'penerbit': book.penerbit,
#             'harga': book.harga,
#             'id_kategori': book.id_kategori
#         }), 200
    
#     elif request.method == 'PUT':
#         data = request.json
#         book.judul = data.get('judul')
#         book.penulis = data.get('penulis')
#         book.penerbit = data.get('penerbit')
#         book.harga = float(data.get('harga'))
#         book.id_kategori = data.get('id_kategori')
#         db.session.commit()
#         return jsonify({'message': 'Buku berhasil diupdate'}), 200
    
#     elif request.method == 'DELETE':
#         db.session.delete(book)
#         db.session.commit()
#         return jsonify({'message': 'Buku berhasil dihapus'}), 200
