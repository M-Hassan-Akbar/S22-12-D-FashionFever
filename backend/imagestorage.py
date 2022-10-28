import email
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


@app.route("/getimages", methods=["GET", "POST"])
def fetchImage():
    email = request.json["email"]
    
    images = db.child("images").get()

    image_list = []
    for image in images.each():
        if(image.val()["email"] == email):
            image_list.append(db.child("images").child(image.key()).get().val())
    
    return jsonify({"images" : image_list})


@app.route("/addad", method=["POST"])
def addAd():
    file = request.files['file']
    email = request.args.get('email')
    description = request.args.get('description')
    phone_number = request.args.get('phone_number')
    full_name = request.args.get('full_name')
    url = request.args.get('url')
    
    if file is not None:
        name = "images/"+ email + str(random.randrange(100000000000000, 1000000000000000)) + ".jpg"
        storage.child(name).put(file)

        url = storage.child(name).get_url(None)
        db.child("images").push({
                'email' : email,
                'name' : name,
                'caption' : '',
                'url' : url
            })

    db.child("ads").push({
        'email' : email,
        'name' : full_name,
        'description' : description,
        'phone_number' : phone_number,
        'url' : url
    })

@app.route("/addad", method=["POST", "GET"])
def getAd():
    ads = db.child("ads").get()

    getads = []
    for ad in ads.each():
        getads.append(ad.get().val())
    
    return jsonify({"ads" : getads})
    
    

if __name__ == "__main__":
    app.run(port=5002) 
    


