# from sqlite3 import IntegrityError
# from flask import Blueprint, jsonify, request, session
# from models import Category
# from app import db

# bp = Blueprint('category', __name__, url_prefix='/api/category')

# @bp.route('/', methods=['GET', 'POST'])
# def api_category():
#     if 'admin_id' not in session:
#         return jsonify({'message': 'Unauthorized'}), 401
    
#     if request.method == 'POST':
#         nama_kategori = request.json.get('nama_kategori')
#         category = Category(nama_kategori=nama_kategori)
#         db.session.add(category)
#         try:
#             db.session.commit()
#             return jsonify({'message': 'Kategori berhasil ditambahkan'}), 201
#         except IntegrityError:
#             db.session.rollback()
#             return jsonify({'message': 'Nama kategori sudah ada'}), 400

#     categories = Category.query.all()
#     categories_list = [{'id': category.id, 'nama_kategori': category.nama_kategori} for category in categories]
#     return jsonify(categories_list), 200

# @bp.route('/<int:category_id>', methods=['GET', 'PUT', 'DELETE'])
# def api_category_detail(category_id):
#     if 'admin_id' not in session:
#         return jsonify({'message': 'Unauthorized'}), 401
    
#     category = Category.query.get(category_id)
#     if not category:
#         return jsonify({'message': 'Kategori tidak ditemukan'}), 404
    
#     if request.method == 'GET':
#         return jsonify({
#             'id': category.id,
#             'nama_kategori': category.nama_kategori
#         }), 200
    
#     elif request.method == 'PUT':
#         new_nama_kategori = request.json.get('nama_kategori')
#         category.nama_kategori = new_nama_kategori
#         db.session.commit()
#         return jsonify({'message': 'Kategori berhasil diupdate'}), 200
    
#     elif request.method == 'DELETE':
#         db.session.delete(category)
#         db.session.commit()
#         return jsonify({'message': 'Kategori berhasil dihapus'}), 200
