from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
from flask_cors import *
from flask_pymongo import PyMongo
import googlemaps
from datetime import datetime

gmaps = googlemaps.Client(key='AIzaSyD2A-7qrmxUA4MpTUGojfIhpl2LQF-RF9w')

app = Flask(__name__)

app.config['MONGO_DBNAME'] = 'food'
app.config['MONGO_URI'] = 'mongodb://localhost:27017/food'

app.debug = True
app.secret_key = 'secretBATMAN123'
jwt = JWTManager(app)

mongo = PyMongo(app)

CORS(app)

@app.route('/')
def main():
    return 'Hello, World!'

@app.route('/recm', methods=['GET'])
def recm():
    return str(gmaps.places("mexican", (42.2800266,-83.7471391), 24140, type='restaurant'))

@app.route('/prefs', methods=['POST'])
def prefs():
    pref = mongo.db.pref
    name = request.json['name']
    prefs = request.json['prefs']
    rating = request.json['rating']
    pref_id = pref.insert({'name': name, 'prefs': prefs, 'rating': rating})
    new_pref = pref.find_one({'_id': pref_id})
    output = {'name' : new_pref['name'], 'prefs': new_pref['prefs'], 'rating': new_pref['rating']}
    return jsonify({'result': output})

if __name__ == "__main__":
    app.run(host='0.0.0.0')
