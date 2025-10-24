from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()
from werkzeug.security import generate_password_hash, check_password_hash

class Owner(db.Model):
    id = db.Column(db.Integer,  primary_key = True, autoincrement = True)
    username = db.Column(db.String(50), nullable = False, unique = True)
    password_hash = db.Column(db.String(225), nullable = False, unique = True)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
        
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    def to_dict(self):
        return{
            "username" : self.username
        }

class Contacts(db.Model):
    id = db.Column(db.Integer,  primary_key = True, autoincrement = True)
    name = db.Column(db.String(100), nullable = False)
    Mobile_No = db.Column(db.String(12), nullable = False, unique = True)

    def to_dict(self):
        return {
            "id" : self.id,
            "name" : self.name,
            "Mobile_No" : self.Mobile_No
        }
