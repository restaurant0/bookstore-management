from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

db = SQLAlchemy()
bcrypt = Bcrypt()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)

class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nama_kategori = db.Column(db.String(100), nullable=False)

class Book(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    judul = db.Column(db.String(200), nullable=False)
    penulis = db.Column(db.String(100), nullable=False)
    penerbit = db.Column(db.String(100), nullable=False)
    harga = db.Column(db.Float, nullable=False)
    id_kategori = db.Column(db.Integer, db.ForeignKey('category.id'), nullable=True)
    category = db.relationship('Category', backref=db.backref('books', lazy=True))

class Customer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nama = db.Column(db.String(100), nullable=False)
    alamat = db.Column(db.String(200), nullable=False)
    nomor_telepon = db.Column(db.String(20), nullable=False)

class Transaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    id_pelanggan = db.Column(db.Integer, db.ForeignKey('customer.id'), nullable=False)
    id_buku = db.Column(db.Integer, db.ForeignKey('book.id'), nullable=False)
    jumlah = db.Column(db.Integer, nullable=False)
    total_harga = db.Column(db.Float, nullable=False)
    tanggal = db.Column(db.DateTime, default=db.func.current_timestamp())
    customer = db.relationship('Customer', backref=db.backref('transactions', lazy=True))
    book = db.relationship('Book', backref=db.backref('transactions', lazy=True))

class Stock(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    id_buku = db.Column(db.Integer, db.ForeignKey('book.id'), nullable=False)
    jumlah_stok = db.Column(db.Integer, nullable=False)
    book = db.relationship('Book', backref=db.backref('stock', uselist=False))
