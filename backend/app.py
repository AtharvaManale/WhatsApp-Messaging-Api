from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
import os
from dotenv import load_dotenv
from backend.database import db
from backend.routes.auth import auth
from backend.routes.crud import crud
from backend.routes.msg import msg

load_dotenv()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql://{os.getenv("DB_USER")}:{os.getenv("DB_PASSWORD")}@{os.getenv("DB_HOST")}/{os.getenv("DB_NAME")}'
app.config['SECERET_KEY'] = f'{os.getenv("Key")}'
app.config['JWT_SECRET_KEY'] = f'{os.getenv("Jkey")}'
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = int(os.getenv("JWT_ACCESS_TOKEN_EXPIRES"))
app.config["JWT_REFRESH_TOKEN_EXPIRES"] = int(os.getenv("JWT_REFRESH_TOKEN_EXPIRES"))

app.register_blueprint(auth, url_prefix = "/auth")
app.register_blueprint(crud, url_prefix = "/crud")
app.register_blueprint(msg,url_prefix = "/msg")

CORS(app)
JWTManager(app)
db.init_app(app)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)