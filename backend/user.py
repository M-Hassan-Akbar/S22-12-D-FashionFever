from flask import Flask, request, jsonify
from flask_cors import CORS
import pyrebase
import random

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
storage = firebase.storage()


@app.route("/")
def index():
    return "Hello! Welcome to our FYP server. Take a seat and chillllll!~"

@app.route("/login", methods=["POST"])
def login():
    email = request.json['email']
    password = request.json['password']

    user_details = auth.sign_in_with_email_and_password(email, password)

    users = db.child("users").get()

    for user in users.each():
        if(user.val()["email"] == email):
            key=user.key()
    
    return jsonify({
        "user" : db.child("users").child(key).get().val()
    })


@app.route("/register", methods=["GET", "POST"])
def register():
    
    email = request.json['email']
    password = request.json['password']
    first_name = request.json['first_name']
    last_name = request.json['last_name']

    user = auth.create_user_with_email_and_password(email, password)

    db.child("users").push({
        'first_name' : first_name,
        'last_name' : last_name,
        'email' : email, 
        'address' : '',
        'gender' : '',
        'dob'  : '', 
        'bio' : '',
        'profile_image' : '',
        'phone_number' : ''
    })
    return jsonify({
        "user" : db.child("users").child(key).get().val()
    })


@app.route("/updateprofile", methods=["Post"])
def update_profile():

    email = request.json['email']
    address = request.json['address']
    dob = request.json['dob']
    gender = request.json['gender']
    bio = request.json['bio']
    phone_number = request.json[phone_number]


    users = db.child("users").get()

    for user in users.each():
        if(user.val()["email"] == email):
            key=user.key()
    
    db.child("users").child(key).update({
        'address' : address,
        'dob'  : dob, 
        'bio' : bio,
        'gender' : gender,
        'phone_number' : phone_number
    })

    return jsonify({
        "user" : db.child("users").child(key).get().val()
    })


@app.route("/updateprofileimage", methods=["POST"])
def update_profile_image():
    file = request.files['file']
    email = request.args.get('email')
    
    name = "profile/"+ email + str(random.randrange(1000, 10000)) + ".jpg"
    storage.child(name).put(file)


    users = db.child("users").get()

    for user in users.each():
        if(user.val()["email"] == email):
            key=user.key()
    
    db.child("users").child(key).update({
        'profile_image' : storage.child(name).get_url(None)
    })

    return jsonify({
        "user" : db.child("users").child(key).get().val()
    })



if __name__ == "__main__":
    app.run(port=5000)