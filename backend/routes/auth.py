from flask import Flask, Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity
from ..database import db, Owner

auth = Blueprint("auth", __name__)

@auth.route('/signup', methods = ["POST"])
def signup():
    data = request.json

    if Owner.query.filter_by(username = data["username"]).first():
        return jsonify({"error" : "User Alreday Exists!"}), 400
    
    new_Owner = Owner(username = data["username"])
    new_Owner.set_password(data["password"])
    db.session.add(new_Owner)
    db.session.commit()

    return jsonify({"message": "User created successfully", "username": new_Owner["username"]}), 201


@auth.route('/login', methods = ["POST", "GET"])
def login():
    data = request.json
    owner = Owner.query.filter_by(username = data["username"]).first()

    if owner and owner.check_password(data["password"]):
        access_token=create_access_token(identity= owner.username)
        refresh_token=create_refresh_token(identity= owner.username)
        return jsonify(
            {
            "message":"logged in successfully",
            "access_token": access_token,
            "refresh_token" : refresh_token
            }), 200
    
    return jsonify({"Mesaage": "Login Failed!"}), 400


@auth.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    current_user = get_jwt_identity()
    new_access_token = create_access_token(identity=current_user)
    return jsonify(access_token=new_access_token)