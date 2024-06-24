# from flask import Blueprint, jsonify, request, session
# from models import Admin
# from app import db

# bp = Blueprint('admin', __name__, url_prefix='/api')

# @bp.route('/login', methods=['POST'])
# def api_login():
#     username = request.json.get('username')
#     password = request.json.get('password')
#     admin = Admin.query.filter_by(username=username, password=password).first()
#     if admin:
#         session['admin_id'] = admin.id
#         return jsonify({'message': 'Login berhasil'}), 200
#     else:
#         return jsonify({'message': 'Login gagal'}), 401

# @bp.route('/logout', methods=['POST'])
# def api_logout():
#     session.pop('admin_id', None)
#     return jsonify({'message': 'Logout berhasil'}), 200