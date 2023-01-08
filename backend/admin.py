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

@app.route("/dashboard", methods=["GET"])
def get_data_dashboard():
    users = len(db.child("users").get().each())
    ads = len(db.child("ads").get().each())
    images = len(db.child("images").get().each())
    # orders = len(db.child("orders").get().each())
    # completed_orders = len(db.child("orders").order_by_child("status").equal_to("1").get().each())
    # ongoing_orders = orders - completed_orders

    feedbacks = db.child("feedback").get()
    avg_rating = 0
    total = 0
    for feedback in feedbacks:
        avg_rating = avg_rating + feedback.val()["rating"]
        total = total + 1
    
    return jsonify({
        "total_users" : users,
        "total_ads" : ads,
        "total_images" : images,
        "average_rating" : avg_rating/total
        # "total_orders" : orders,
        # "completed_orders" : completed_orders,
        # "ongoing_orders" : ongoing_orders
    })




if __name__ == "__main__":
    app.run(port=5003)