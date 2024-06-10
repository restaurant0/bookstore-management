from flask import Flask
from config import Config
from models import db, bcrypt
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)
bcrypt.init_app(app)
jwt = JWTManager(app)
migrate = Migrate(app, db)

with app.app_context():
    db.create_all()

from routes.auth_routes import auth_bp
from routes.book_routes import book_bp
from routes.category_routes import category_bp
from routes.customer_routes import customer_bp
from routes.stock_routes import stock_bp
from routes.transaction_routes import transaction_bp

app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(book_bp, url_prefix='/api/books')
app.register_blueprint(category_bp, url_prefix='/api/categories')
app.register_blueprint(customer_bp, url_prefix='/api/customers')
app.register_blueprint(stock_bp, url_prefix='/api/stocks')
app.register_blueprint(transaction_bp, url_prefix='/api/transactions')

if __name__ == '__main__':
    app.run(debug=True)
