# from flask import Blueprint, request, jsonify, session
# from models import db, Transaction
# from datetime import datetime
# from app import db

# transaction_bp = Blueprint('transaction_bp', __name__)

# # CRUD Transaction
# @transaction_bp.route('/api/transaction', methods=['GET', 'POST'])
# def api_transaction():
#     if 'admin_id' not in session:
#         return jsonify({'message': 'Unauthorized'}), 401
    
#     if request.method == 'POST':
#         data = request.json
#         transaction = Transaction(
#             id_pelanggan=data.get('id_pelanggan'),
#             id_buku=data.get('id_buku'),
#             jumlah=data.get('jumlah'),
#             total_harga=float(data.get('total_harga'))
#         )
#         db.session.add(transaction)
#         db.session.commit()
#         return jsonify({'message': 'Transaksi berhasil ditambahkan'}), 201

#     transactions = Transaction.query.all()
#     transactions_list = [{
#         'id': transaction.id,
#         'id_pelanggan': transaction.id_pelanggan,
#         'id_buku': transaction.id_buku,
#         'jumlah': transaction.jumlah,
#         'total_harga': transaction.total_harga,
#         'tanggal': transaction.tanggal.strftime('%Y-%m-%d %H:%M:%S')
#     } for transaction in transactions]
#     return jsonify(transactions_list), 200

# # Get, Update, Delete Transaction by ID
# @transaction_bp.route('/api/transaction/<int:transaction_id>', methods=['GET', 'PUT', 'DELETE'])
# def api_transaction_detail(transaction_id):
#     if 'admin_id' not in session:
#         return jsonify({'message': 'Unauthorized'}), 401
    
#     transaction = Transaction.query.get(transaction_id)
#     if not transaction:
#         return jsonify({'message': 'Transaksi tidak ditemukan'}), 404
    
#     if request.method == 'GET':
#         return jsonify({
#             'id': transaction.id,
#             'id_pelanggan': transaction.id_pelanggan,
#             'id_buku': transaction.id_buku,
#             'jumlah': transaction.jumlah,
#             'total_harga': transaction.total_harga,
#             'tanggal': transaction.tanggal.strftime('%Y-%m-%d %H:%M:%S')
#         }), 200
    
#     elif request.method == 'PUT':
#         data = request.json
#         transaction.id_pelanggan = data.get('id_pelanggan')
#         transaction.id_buku = data.get('id_buku')
#         transaction.jumlah = data.get('jumlah')
#         transaction.total_harga = float(data.get('total_harga'))
#         db.session.commit()
#         return jsonify({'message': 'Transaksi berhasil diupdate'}), 200
    
#     elif request.method == 'DELETE':
#         db.session.delete(transaction)
#         db.session.commit()
#         return jsonify({'message': 'Transaksi berhasil dihapus'}), 200
