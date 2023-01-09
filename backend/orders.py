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


@app.route("/addorder", methods=["POST"])
def place_order():
    ad_id = request.json["pk"]
    status = "0"  # 1 means done, 0 means not done yet
    sender = request.json["sender"]  # tailor
    reciever = request.json["reciever"]  # customer

    db.child("orders").push(
        {"ad": ad_id, "status": status, "sender": sender, "reciever": reciever}
    )

    return jsonify({"status": "order placed!"})


@app.route("/getorders", methods=["POST"])
def get_order():
    email = request.json["email"]

    orders = db.child("orders").get()

    order_list = []
    for order in orders:
        if order.val()["sender"] == email or order.val()["reciever"] == email:
            order_list.append(
                {
                    "sender": order.val()["sender"],
                    "reciever": order.val()["reciever"],
                    "ad": order.val()["ad"],
                    "status": order.val()["status"],
                    "order_key": order.key(),
                }
            )

    return jsonify({"orders": order_list})


@app.route("/acceptorders", methods=["GET"])
def accept_order():
    order_key = request.json["order_key"]

    db.child("orders").update({"status": "1"})

    return jsonify({"status": "order placed!"})


if __name__ == "__main__":
    app.run(port=5004)
