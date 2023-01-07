from flask import Flask, request, jsonify
from flask_cors import CORS
import pyrebase
import requests
from collections import deque
import random


app = Flask(__name__)
CORS(app)

config = {
    "apiKey": "AIzaSyAEIeJDRhU_cOg2YC3UESpXZFxpJDHOkTs",
    "authDomain": "fashionfever-2.firebaseapp.com",
    "projectId": "fashionfever-2",
    "storageBucket": "fashionfever-2.appspot.com",
    "messagingSenderId": "116748259026",
    "appId": "1:116748259026:web:4a250e2aa206a78936e70b",
    "measurementId": "G-ZDV2X5HE6R",
    "databaseURL": "https://fashionfever-2-default-rtdb.asia-southeast1.firebasedatabase.app/",
}
firebase = pyrebase.initialize_app(config)
auth = firebase.auth()
db = firebase.database()
storage = firebase.storage()
USER_SERVICE_LINK = "http://localhost:5000"


@app.route("/")
def index():
    return "Hello! Welcome to our FYP server. Take a seat and chillllll!~"


@app.route("/getconversations", methods=["GET", "POST"])
def get_conversations():
    email = request.json["email"]

    convos = db.child("conversations").get()

    convo_list = []
    for convo in convos:
        if convo.val()["user1"] == email:
            convo_list.append((find_user(convo.val()["user2"]), convo.key()))
        elif convo.val()["user2"] == email:
            convo_list.append((find_user(convo.val()["user1"]), convo.key()))

    return jsonify({"conversations": convo_list})


def find_user(email):
    return requests.post(USER_SERVICE_LINK + "/getuser", json={"email": email})


@app.route("/createconversations", methods=["GET", "POST"])
def create_conversations():
    email = request.json["email"]
    recipient_email = request.json["recipient_email"]

    convos = db.child("conversations").get()

    for convo in convos:
        if convo.val()["user1"] == email or convo.val()["user2"] == email:
            if (
                convo.val()["user1"] == recipient_email
                or convo.val()["user2"] == recipient_email
            ):
                return jsonify(
                    {
                        "status": "conversation already exists!",
                        "conversation": convo.key(),
                    }
                )

    convo_key = db.child("conversations").push(
        {
            "user1": email,
            "user2": recipient_email,
        }
    )

    return jsonify(
        {"status": "conversation created!", "conversation": convo_key["name"]}
    )


@app.route("/getmessages", methods=["POST"])
def get_messages():
    conversation = request.json["conversation"]

    messages = db.child("conversations").child(conversation).child("messages").get()

    message_list = deque
    for message in messages:
        message_list.appendleft(message.val())

    return jsonify({"messages": list(message_list)})


@app.route("sendmessage", methods=["POST"])
def send_message():
    sender = request.args.get("email")
    message = request.args.get("message")
    timestamp = request.args.get("timestamp")
    image = ""
    conversation = request.args.get("conversation")

    if len(request.files):
        file = request.files["file"]
        name = (
            "messages/"
            + sender
            + str(random.randrange(100000000000000, 1000000000000000))
            + ".jpg"
        )
        storage.child(name).put(file)

        image = storage.child(name).get_url(None)

    db.child("conversations").child(conversation).child("messages").push(
        {"sender": sender, "message": message, "timestamp": timestamp, "image": image}
    )
