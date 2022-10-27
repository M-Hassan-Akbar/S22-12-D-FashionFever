from flask import Flask, request, jsonify
from flask_cors import CORS
from evaluation import gen_image
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

@app.route("/fashion", methods=["GET", "POST"])
def get_image():
    caption = request.json["caption"]
    email = request.json["email"]

    generated_image = gen_image(caption)
    name = "images/"+ email + str(random.randrange(100000000000000, 1000000000000000)) + ".jpg"
    print("Image " + name + "has been created!")
    storage.child(name).put(generated_image)

    image = db.child("images").push({
        'email' : email,
        'name' : name,
        'caption' : caption,
        'url' : storage.child(name).get_url()
    })

    return jsonify({"image": image})

if __name__ == "__main__":
    app.run(port=5001)