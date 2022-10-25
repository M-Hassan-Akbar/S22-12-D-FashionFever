from flask import Flask, request, jsonify
from flask_cors import CORS
import pyrebase

app = Flask(__name__)
CORS(app)


config = {
    'apiKey': "AIzaSyAEIeJDRhU_cOg2YC3UESpXZFxpJDHOkTs",
  'authDomain': "fashionfever-2.firebaseapp.com",
  'projectId': "fashionfever-2",
  'storageBucket': "fashionfever-2.appspot.com",
  'messagingSenderId': "116748259026",
  'appId': "1:116748259026:web:4a250e2aa206a78936e70b",
  'measurementId': "G-ZDV2X5HE6R",
  'databaseURL' : 'https://fashionfever-2-default-rtdb.asia-southeast1.firebasedatabase.app/'
}
firebase = pyrebase.initialize_app(config)
auth = firebase.auth()
db = firebase.database()



@app.route("/")
def index():
    return "Hello! Welcome to our FYP server. Take a seat and chillllll!~"

@app.route("/login", methods=["POST"])
def login():
    email = request.json['email']
    password = request.json['password']

    user = auth.sign_in_with_email_and_password(email, password)

    return jsonify({'user' : 'created'})


@app.route("/register", methods=["GET", "POST"])
def register():
    
    email = request.json['email']
    password = request.json['password']
    first_name = request.json['first_name']
    last_name = request.json['last_name']

    user = auth.create_user_with_email_and_password(email, password)

    db.child("users").push({
        'first_name' : first_name,
        'last_name' : last_name
    })
    return jsonify({'user' : 'created'})



if __name__ == "__main__":
    app.run(port=5000)