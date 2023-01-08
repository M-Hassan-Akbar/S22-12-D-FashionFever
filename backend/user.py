from flask import Flask, request, jsonify
from flask_cors import CORS
import pyrebase
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


@app.route("/")
def index():
    return "Hello! Welcome to our FYP server. Take a seat and chillllll!~"


@app.route("/getuser", methods=["POST"])
def getUser():
    email = request.json["email"]

    users = db.child("users").get()

    for user in users.each():
        if user.val()["email"] == email:
            key = user.key()
            break
    return jsonify({"user": db.child("users").child(key).get().val()})


@app.route("/login", methods=["POST"])
def login():
    email = request.json["email"]
    password = request.json["password"]

    user_details = auth.sign_in_with_email_and_password(email, password)

    users = db.child("users").get()

    for user in users.each():
        if user.val()["email"] == email:
            key = user.key()
            break

    return jsonify({"user": db.child("users").child(key).get().val()})


@app.route("/register", methods=["GET", "POST"])
def register():

    email = request.json["email"]
    password = request.json["password"]
    first_name = request.json["first_name"]
    last_name = request.json["last_name"]

    user = auth.create_user_with_email_and_password(email, password)

    db.child("users").push(
        {
            "first_name": first_name,
            "last_name": last_name,
            "email": email,
            "address": "",
            "gender": "",
            "dob": "",
            "bio": "",
            "profile_image": "",
            "phone_number": "",
        }
    )
    return jsonify(
        {
            "first_name": first_name,
            "last_name": last_name,
            "email": email,
            "address": "",
            "gender": "",
            "dob": "",
            "bio": "",
            "profile_image": "",
            "phone_number": "",
        }
    )


@app.route("/updateprofile", methods=["Post"])
def update_profile():

    email = request.json["email"]
    address = request.json["address"]
    dob = request.json["dob"]
    gender = request.json["gender"]
    bio = request.json["bio"]
    phone_number = request.json["phone_number"]

    users = db.child("users").get()

    for user in users.each():
        if user.val()["email"] == email:
            key = user.key()
            break

    db.child("users").child(key).update(
        {
            "address": address,
            "dob": dob,
            "bio": bio,
            "gender": gender,
            "phone_number": phone_number,
        }
    )

    return jsonify({"user": db.child("users").child(key).get().val()})


@app.route("/updateprofileimage", methods=["POST"])
def update_profile_image():
    file = request.files["file"]
    email = request.args.get("email")

    name = "profile/" + email + str(random.randrange(1000, 10000)) + ".jpg"
    storage.child(name).put(file)

    users = db.child("users").get()

    for user in users.each():
        if user.val()["email"] == email:
            key = user.key()

    db.child("users").child(key).update(
        {"profile_image": storage.child(name).get_url(None)}
    )

    return jsonify({"user": db.child("users").child(key).get().val()})


@app.route("/alluser", methods=["GET"])
def all_users():
    users = db.child("users").get()

    user_list = []
    for user in users.each():
        user_list.append(db.child("users").child(user.key()).get().val())

    return jsonify({"users": user_list})


@app.route("/addmeasurements", methods=["POST"])
def add_measurements():

    measurements = db.child("measurements").get()
    email = request.json["email"]
    name = request.json["name"]

    for measurement in measurements.each():
        if measurement.val()["email"] == email and measurement.val()["name"] == name:
            return jsonify({"status": "Measurement with that name already exists!"})

    db.child("measurements").push(
        {
            "email": email,
            "name": name,
            "gender": request.json["gender"],
            "height": request.json["height"],
            "waist": request.json["waist"],
            "chest": request.json["chest"],
            "neck": request.json["neck"],
            "necktosh": request.json["necktosh"],
            "sleeve": request.json["sleeve"],
            "wrist": request.json["wrist"],
            "arm": request.json["arm"],
            "shoulders": request.json["shoulders"],
            "hips": request.json["hips"],
            "ankles": request.json["ankles"],
            "thigh": request.json["thigh"],
            "calf": request.json["calf"],
        }
    )
    return jsonify({"status": "Successfully added!"})


@app.route("/deletemeasurements", methods=["POST"])
def delete_measurements():

    measurements = db.child("measurements").get()
    email = request.json["email"]
    name = request.json["name"]

    for measurement in measurements.each():
        if measurement.val()["email"] == email and measurement.val()["name"] == name:
            db.child("measurements").child(measurement.key()).remove()
            return jsonify({"status": "Successfully deleted!"})

    return jsonify({"status": "Measurement not found"})


@app.route("/updatemeasurements", methods=["POST"])
def update_measurements():
    measurements = db.child("measurements").get()
    email = request.json["email"]
    name = request.json["name"]

    for measurement in measurements.each():
        if measurement.val()["email"] == email and measurement.val()["name"] == name:
            key = measurement.key()
            break

    db.child("measurements").child(key).update(
        {
            "gender": request.json["gender"],
            "height": request.json["height"],
            "waist": request.json["waist"],
            "chest": request.json["chest"],
            "neck": request.json["neck"],
            "necktosh": request.json["necktosh"],
            "sleeve": request.json["sleeve"],
            "wrist": request.json["wrist"],
            "arm": request.json["arm"],
            "shoulders": request.json["shoulders"],
            "hips": request.json["hips"],
            "ankles": request.json["ankles"],
            "thigh": request.json["thigh"],
            "calf": request.json["calf"],
        }
    )
    return jsonify({"status": "Successfully added!"})


@app.route("/getmeasurements", methods=["POST"])
def get_measurements():
    measurements = db.child("measurements").get()
    email = request.json["email"]

    measurement_list = []
    for measurement in measurements.each():
        if measurement.val()["email"] == email:
            measurement_list.append(
                db.child("measurements").child(measurement.key()).get().val()
            )

    return jsonify({"measurements": measurement_list})


if __name__ == "__main__":
    app.run(port=5000)
