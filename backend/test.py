import pyrebase
import requests
import random

email = "m"

name = "images/"+ email + str(random.randrange(100000000000000, 1000000000000000)) + ".jpg"
print("Image " + name + "has been created!")
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

link = "https://media.discordapp.net/attachments/737338724999888918/1034450009288093716/unknown.png"
headers={'user-agent': 'Mozilla/5.0'}

r=requests.get(link, headers=headers)

storage.child("ima2ges").put(r.content)