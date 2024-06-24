from flask import Flask, jsonify, request, session
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.exc import IntegrityError
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
from flask_cors import CORS
from flask_session import Session
import logging

logging.basicConfig(level=logging.DEBUG)

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:@localhost/mybook'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
#app.secret_key = 'your_secret_key'
app.config['SECRET_KEY'] = 'your_secret_key'
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SESSION_PERMANENT'] = False
db = SQLAlchemy(app)

CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)
Session(app)

# Model definitions
class Admin(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)

    def set_password(self, password):
        self.password = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password, password)
class Customer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nama = db.Column(db.String(100), nullable=False)
    alamat = db.Column(db.String(200), nullable=False)
    nomor_telepon = db.Column(db.String(20), nullable=False)

class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nama_kategori = db.Column(db.String(100), nullable=False)

class Book(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    judul = db.Column(db.String(200), nullable=False)
    penulis = db.Column(db.String(100), nullable=False)
    penerbit = db.Column(db.String(100), nullable=False)
    harga = db.Column(db.Float, nullable=False)
    id_kategori = db.Column(db.Integer, db.ForeignKey('category.id'))
    category = db.relationship('Category', backref=db.backref('books', lazy=True))

class Transaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    noTransaction = db.Column(db.String(50), nullable=False)
    id_pelanggan = db.Column(db.Integer, db.ForeignKey('customer.id'))
    id_buku = db.Column(db.Integer, db.ForeignKey('book.id'))
    jumlah = db.Column(db.Integer, nullable=False)
    total_harga = db.Column(db.Float, nullable=False)
    tanggal = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    customer = db.relationship('Customer', backref=db.backref('transactions', lazy=True))
    book = db.relationship('Book', backref=db.backref('transactions', lazy=True))

# Routes untuk CRUD Operations

# Login Admin
@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    # Check if user exists in the database
    admin = Admin.query.filter_by(username=username, password=password).first()
    if admin:
        session['user'] = username
        return jsonify({'message': 'Login successful', 'status': 'success'}), 200
    else:
        return jsonify({'message': 'Invalid username or password', 'status': 'fail'}), 401

@app.route('/dashboard', methods=['GET'])
def dashboard():
    if 'admin_id' not in session:
        return jsonify({'message': 'Unauthorized'}), 401
    return jsonify({'message': 'Welcome to the dashboard!'})

# Logout Admin
@app.route('/api/logout', methods=['POST'])
def api_logout():
    session.pop('user', None)
    return jsonify({'message': 'Logout berhasil'}), 200

# CRUD Category
@app.route('/api/category', methods=['GET', 'POST'])
def api_category():
    if request.method == 'POST':
        nama_kategori = request.json.get('nama_kategori')
        category = Category(nama_kategori=nama_kategori)
        db.session.add(category)
        try:
            db.session.commit()
            return jsonify({'message': 'Kategori berhasil ditambahkan'}), 201
        except IntegrityError:
            db.session.rollback()
            return jsonify({'message': 'Nama kategori sudah ada'}), 400

    categories = Category.query.all()
    categories_list = [{'id': category.id, 'nama_kategori': category.nama_kategori} for category in categories]
    return jsonify(categories_list), 200

# Get, Update, Delete Category by ID
@app.route('/api/category/<int:category_id>', methods=['GET','PUT', 'DELETE'])
def api_category_detail(category_id):
    category = Category.query.get(category_id)
    if not category:
        return jsonify({'message': 'Kategori tidak ditemukan'}), 404
    
    if request.method == 'GET':
        return jsonify({
            'id': category.id,
            'nama_kategori': category.nama_kategori
        }), 200
    
    if request.method == 'PUT':
        new_nama_kategori = request.json.get('nama_kategori')
        category.nama_kategori = new_nama_kategori
        db.session.commit()
        return jsonify({'message': 'Kategori berhasil diupdate'}), 200
    
    elif request.method == 'DELETE':
        db.session.delete(category)
        db.session.commit()
        return jsonify({'message': 'Kategori berhasil dihapus'}), 200
    
# # Mendapatkan daftar kategori
# @app.route('/api/categories', methods=['GET'])
# def get_categories():
#     categories = Category.query.all()
#     categories_list = [{'id': category.id, 'nama_kategori': category.nama_kategori} for category in categories]
#     return jsonify(categories_list), 200

# CRUD Book
@app.route('/api/book', methods=['GET'])
def get_books():
    books = Book.query.all()
    books_list = []
    for book in books:
        category_name = ""
        if book.category:
            category_name = book.category.nama_kategori
        books_list.append({
            'id': book.id,
            'judul': book.judul,
            'penulis': book.penulis,
            'penerbit': book.penerbit,
            'harga': book.harga,
            'category': category_name
        })
    return jsonify(books_list), 200


@app.route('/api/book', methods=['POST'])
def add_book():
    data = request.json
    judul = data.get('judul')
    penulis = data.get('penulis')
    penerbit = data.get('penerbit')
    harga = data.get('harga')
    id_kategori = data.get('id_kategori')
    
    book = Book(judul=judul, penulis=penulis, penerbit=penerbit, harga=harga, id_kategori=id_kategori)
    db.session.add(book)
    db.session.commit()
    return jsonify({'message': 'Buku berhasil ditambahkan'}), 201

# Get, Update, Delete Book by ID
@app.route('/api/book/<int:book_id>', methods=['GET','PUT', 'DELETE'])
def api_book_detail(book_id):
    book = Book.query.get(book_id)
    if not book:
        return jsonify({'message': 'Buku tidak ditemukan'}), 404
    
    if request.method == 'GET':
        return jsonify({
            'id': book.id,
            'judul': book.judul,
            'penulis': book.penulis,
            'penerbit': book.penerbit,
            'harga': book.harga,
            'category': {
                'id': book.category.id,
                'nama_kategori': book.category.nama_kategori
            }
        }), 200
    
    elif request.method == 'PUT':
        data = request.json
        judul = data.get('judul')
        penulis = data.get('penulis')
        penerbit = data.get('penerbit')
        harga = float(data.get('harga'))
        id_kategori = data.get('id_kategori')

        book.judul = judul
        book.penulis = penulis
        book.penerbit = penerbit
        book.harga = harga
        book.id_kategori = id_kategori

        db.session.commit()
        return jsonify({'message': 'Buku berhasil diupdate'}), 200
    
    elif request.method == 'DELETE':
        db.session.delete(book)
        db.session.commit()
        return jsonify({'message': 'Buku berhasil dihapus'}), 200
    
# CRUD Customer
@app.route('/api/customer', methods=['GET', 'POST'])
def api_customer():
    if request.method == 'POST':
        nama = request.json.get('nama')
        alamat = request.json.get('alamat')
        nomor_telepon = request.json.get('nomor_telepon')

        customer = Customer(nama=nama, alamat=alamat, nomor_telepon=nomor_telepon)
        db.session.add(customer)
        db.session.commit()
        return jsonify({'message': 'Pelanggan berhasil ditambahkan'}), 201

    customers = Customer.query.all()
    customers_list = [{
        'id': customer.id,
        'nama': customer.nama,
        'alamat': customer.alamat,
        'nomor_telepon': customer.nomor_telepon
    } for customer in customers]
    return jsonify(customers_list), 200

@app.route('/api/customer/<int:customer_id>', methods=['GET','PUT', 'DELETE'])
def api_customer_detail(customer_id):

    customer = Customer.query.get(customer_id)
    if not customer:
        return jsonify({'message': 'Pelanggan tidak ditemukan'}), 404
    
    if request.method == 'GET':
        return jsonify({
            'id': customer.id,
            'nama': customer.nama,
            'alamat': customer.alamat,
            'nomor_telepon': customer.nomor_telepon
        }), 200
    
    if request.method == 'PUT':
        nama = request.json.get('nama')
        alamat = request.json.get('alamat')
        nomor_telepon = request.json.get('nomor_telepon')

        customer.nama = nama
        customer.alamat = alamat
        customer.nomor_telepon = nomor_telepon

        db.session.commit()
        return jsonify({'message': 'Pelanggan berhasil diupdate'}), 200

    elif request.method == 'DELETE':
        db.session.delete(customer)
        db.session.commit()
        return jsonify({'message': 'Pelanggan berhasil dihapus'}), 200

# CRUD Transaction
@app.route('/api/transaction', methods=['GET'])
def api_transaction():
    transactions = Transaction.query.all()
    transactions_list = []

    for transaction in transactions:
        if transaction.customer and transaction.book:
            transaction_data = {
                'id': transaction.id,
                'noTransaction': transaction.noTransaction,
                'id_pelanggan': transaction.id_pelanggan,
                'nama_pelanggan': transaction.customer.nama,
                'id_buku': transaction.id_buku,
                'judul_buku': transaction.book.judul,
                'jumlah': transaction.jumlah,
                'total_harga': transaction.total_harga,
                'tanggal': transaction.tanggal.strftime('%Y-%m-%d %H:%M:%S')
            }
            transactions_list.append(transaction_data)

    return jsonify(transactions_list), 200


# Add a new transaction
@app.route('/api/transaction', methods=['POST'])
def add_transaction():
    data = request.json
    noTransaction = data.get('noTransaction')
    id_pelanggan = data.get('id_pelanggan')
    id_buku = data.get('id_buku')
    jumlah = data.get('jumlah')
    total_harga = data.get('total_harga')
    tanggal = datetime.strptime(data.get('tanggal'), '%Y-%m-%dT%H:%M')

    transaction = Transaction(
        noTransaction=noTransaction,
        id_pelanggan=id_pelanggan,
        id_buku=id_buku,
        jumlah=jumlah,
        total_harga=total_harga,
        tanggal=tanggal
    )
    db.session.add(transaction)
    db.session.commit()
    return jsonify({'message': 'Transaksi berhasil ditambahkan'}), 201

# Get, Update, Delete Transaction by ID
@app.route('/api/transaction/<int:transaction_id>', methods=['GET', 'PUT', 'DELETE'])
def api_transaction_detail(transaction_id):
    transaction = Transaction.query.get(transaction_id)
    if not transaction:
        return jsonify({'message': 'Transaksi tidak ditemukan'}), 404

    if request.method == 'GET':
        return jsonify({
            'id': transaction.id,
            'noTransaction': transaction.noTransaction,
            'nama_pelanggan': transaction.customer.nama,
            'judul_buku': transaction.book.judul,
            'jumlah': transaction.jumlah,
            'total_harga': transaction.total_harga,
            'tanggal': transaction.tanggal.strftime('%Y-%m-%dT%H:%M:%S')
        }), 200
    
    elif request.method == 'PUT':
        #logging.debug(f'Received data: {request.json}')

        noTransaction = request.json.get('noTransaction')
        id_pelanggan = request.json.get('id_pelanggan')
        id_buku = request.json.get('id_buku')
        jumlah = request.json.get('jumlah')
        total_harga = float(request.json.get('total_harga'))
        tanggal = datetime.strptime(request.json.get('tanggal'), '%Y-%m-%dT%H:%M')

        transaction.noTransaction = noTransaction
        transaction.id_pelanggan = id_pelanggan
        transaction.id_buku = id_buku
        transaction.jumlah = jumlah
        transaction.total_harga = total_harga
        transaction.tanggal = tanggal
        try:
            db.session.commit()
            return jsonify({'message': 'Transaksi berhasil diupdate'}), 200
        except ValueError as e:
            return jsonify({'message': str(e)}), 500
        #db.session.commit()
        #return jsonify({'message': 'Transaksi berhasil diupdate'}), 200
    
    elif request.method == 'DELETE':
        db.session.delete(transaction)
        db.session.commit()
        return jsonify({'message': 'Transaksi berhasil dihapus'}), 20

if __name__ == '__main__':
    app.run(port=5000, debug=True)