# from flask import Blueprint, request, jsonify, session
# from models import db, Customer
# from app import db

# customer_bp = Blueprint('customer_bp', __name__)

# # CRUD Customer
# @customer_bp.route('/api/customer', methods=['GET', 'POST'])
# def api_customer():
#     if 'admin_id' not in session:
#         return jsonify({'message': 'Unauthorized'}), 401
    
#     if request.method == 'POST':
#         data = request.json
#         customer = Customer(
#             nama=data.get('nama'),
#             alamat=data.get('alamat'),
#             nomor_telepon=data.get('nomor_telepon')
#         )
#         db.session.add(customer)
#         db.session.commit()
#         return jsonify({'message': 'Pelanggan berhasil ditambahkan'}), 201

#     customers = Customer.query.all()
#     customers_list = [{
#         'id': customer.id,
#         'nama': customer.nama,
#         'alamat': customer.alamat,
#         'nomor_telepon': customer.nomor_telepon
#     } for customer in customers]
#     return jsonify(customers_list), 200

# # Get, Update, Delete Customer by ID
# @customer_bp.route('/api/customer/<int:customer_id>', methods=['GET', 'PUT', 'DELETE'])
# def api_customer_detail(customer_id):
#     if 'admin_id' not in session:
#         return jsonify({'message': 'Unauthorized'}), 401
    
#     customer = Customer.query.get(customer_id)
#     if not customer:
#         return jsonify({'message': 'Pelanggan tidak ditemukan'}), 404
    
#     if request.method == 'GET':
#         return jsonify({
#             'id': customer.id,
#             'nama': customer.nama,
#             'alamat': customer.alamat,
#             'nomor_telepon': customer.nomor_telepon
#         }), 200
    
#     elif request.method == 'PUT':
#         data = request.json
#         customer.nama = data.get('nama')
#         customer.alamat = data.get('alamat')
#         customer.nomor_telepon = data.get('nomor_telepon')
#         db.session.commit()
#         return jsonify({'message': 'Pelanggan berhasil diupdate'}), 200
    
#     elif request.method == 'DELETE':
#         db.session.delete(customer)
#         db.session.commit()
#         return jsonify({'message': 'Pelanggan berhasil dihapus'}), 200
