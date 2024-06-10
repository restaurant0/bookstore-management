from flask import Blueprint, request, jsonify
from models import db, User, bcrypt

auth_bp = Blueprint('auth_bp', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    new_user = User(username=data['username'], password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User created successfully'}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data['username']).first()
    if user and bcrypt.check_password_hash(user.password, data['password']):
        # Generate token (implement JWT token generation)
        return jsonify({'message': 'Login successful', 'token': 'your-jwt-token'}), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 401
