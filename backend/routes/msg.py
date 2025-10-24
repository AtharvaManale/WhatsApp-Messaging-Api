from flask import Flask, Blueprint, request, jsonify
from ..database import db, Contacts
from flask_jwt_extended import jwt_required, get_jwt_identity
import requests

msg = Blueprint("msg", __name__)

WHATSAPP_TOKEN = "Permanent Access Token" 
PHONE_NUMBER_ID = "Phone Number Id"
WHATSAPP_MSG_URL = f'https://graph.facebook.com/v20.0/{PHONE_NUMBER_ID}/messages'
WHATSAPP_MEDIA_URL = f'https://graph.facebook.com/v20.0/{PHONE_NUMBER_ID}/media'

@msg.route('/send_message', methods = ["POST"])
@jwt_required()
def send_message():
    msg_type = request.form.get("type", "text")
    caption = request.form.get("message", "")
    file = request.files.get("file") if msg_type in ["video", "image"] else None

    media_id =  None

    if file:
        headers = {"Authorization" : f'Bearer {WHATSAPP_TOKEN}'}
        data = {"messaging_product" : "whatsapp"}
        files = {"file" : (file.filename, file.stream, file.content_type)}
        upload_res = requests.post(WHATSAPP_MEDIA_URL, headers = headers, files = files, data = data)
        upload_data = upload_res.json()
        print("Upload response:", upload_data)
        media_id = upload_data.get("id")

    contacts = Contacts.query.all()
    results = []

    for contact in contacts:
        payload = {
            "messaging_product" : "whatsapp",
            "to" : contact.Mobile_No,
            "type": msg_type
        }

        if msg_type == "text":
            payload["text"] = {"body" : caption}
        
        elif msg_type in ["image", "video"]:
            
            payload[msg_type] = {"id" : media_id, "caption" : caption}

        try:
            r = requests.post(
                WHATSAPP_MSG_URL,
                headers={
                    "Authorization": f"Bearer {WHATSAPP_TOKEN}",
                    "Content-Type": "application/json"
                },
                json=payload
            )

            print("Send message status:", r.status_code)
            print("Send message response:", r.json())
            print("Payload sent:", payload)
        except Exception as e:
            print("Request failed:", e)
        results.append({contact.Mobile_No: r.json()})
    
    return jsonify({"status" : "sent", "details" : results})

    
