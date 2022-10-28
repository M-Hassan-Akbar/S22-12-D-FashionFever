import imp
from flask import Flask, request, jsonify
from flask_cors import CORS
from endpoint import gen_image, screen_caption
import base64
import pyrebase
import random
import os


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

    valid = screen_caption(caption)
    if valid is False:
        return jsonify({'status': 400, 'error' : "wrong caption"})

    urls = []
    generated_images = gen_image(caption)
    for generated_image in generated_images:
        name = "images/"+ email + str(random.randrange(100000000000000, 1000000000000000)) + ".jpg"
        print("Image " + name + "has been created!")
        storage.child(name).put(base64.b64decode(generated_image))
        urls.append(storage.child(name).get_url(None))
        db.child("images").push({
            'email' : email,
            'name' : name,
            'caption' : caption,
            'url' : storage.child(name).get_url(None)
        })

    return jsonify({'email' : email,
        'name' : name,
        'caption' : caption,
        'url' : urls})

if __name__ == "__main__":
    app.run(port=int(os.environ.get("PORT", 8080)),host='0.0.0.0',debug=True)