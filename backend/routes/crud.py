from flask import Flask, Blueprint, request, jsonify
from ..database import db, Contacts
from flask_jwt_extended import jwt_required

crud = Blueprint("crud", __name__)

@crud.route('/show_contacts', methods= ["GET"])
@jwt_required()
def show_contacts():
    contacts = Contacts.query.all()
    return jsonify([c.to_dict() for c in contacts]), 200

@crud.route('/add_contact', methods = ["POST"])
@jwt_required()
def add_contact():
    data = request.json
    
    if Contacts.query.filter_by(Mobile_No = data["Mobile_No"]).first():
        return jsonify({"error" : "contact already exists"}), 409
    
    new_contact = Contacts(name = data["name"], Mobile_No = data["Mobile_No"])
    db.session.add(new_contact)
    db.session.commit()
    contacts = Contacts.query.all()
    return jsonify([c.to_dict() for c in contacts]), 200

@crud.route('/update/<int:id>', methods = ["POST", "PUT"])
@jwt_required()
def update_contact(id):
    data = request.json

    contact = Contacts.query.get(id)
    if not contact:
        return jsonify({"error" : "Contact Not Found!"}), 404
    
    contact.name = data.get("name", contact.name)
    contact.Mobile_No = data.get("Mobile_No", contact.Mobile_No)

    db.session.commit()
    contacts = Contacts.query.all()
    return jsonify([c.to_dict() for c in contacts]), 200

@crud.route('/delete/<int:id>', methods=["DELETE"])
@jwt_required()
def delete_contact(id):
    contact = Contacts.query.get(id)

    db.session.delete(contact)
    db.session.commit()
    contacts = Contacts.query.all()
    return jsonify([c.to_dict() for c in contacts]), 200