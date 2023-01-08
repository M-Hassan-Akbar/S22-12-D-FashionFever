import pyrebase
import requests
import random
import base64
import requests

email = "m"

#name = "images/"+ email + str(random.randrange(100000000000000, 1000000000000000)) + ".jpg"
#print("Image " + name + "has been created!")
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




# users = db.child("users").push({
#     "user" : "Hassan"
# })

#print(users["name"])
USER_SERVICE_LINK = "http://localhost:5000"

def find_user(email):
    return requests.post(USER_SERVICE_LINK + "/getuser", json={"email": email})

res = find_user("hasxanblaze@gmail.com")
print(res.json()["user"]["profile_image"])
