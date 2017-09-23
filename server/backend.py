from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
from flask_cors import *
from flask_pymongo import PyMongo
import googlemaps
import random
import json
from datetime import datetime
from bson import json_util
from bson import BSON

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

@cross_origin()
@app.route('/recm', methods=['GET'])
def recm():
    types = request.args.get('types')
    loc = request.args.get('location')
    r = random.uniform(0,1)
    places = None
    if r < types[0].weight:
        places = gmaps.places_nearby(types[0].type, loc, 24140, type='restaurant')['results']
    elif r < types[1].weight:
        places = gmaps.places_nearby(types[1].type, loc, 24140, type='restaurant')['results']
    elif r < types[2].weight:
        places = gmaps.places_nearby(types[2].type, loc, 24140, type='restaurant')['results']
    else:
        places = gmaps.places_nearby(types[3].type, loc, 24140, type='restaurant')['results']
    s = ""
    for ob in places:
        s += ob['name'].replace(u"\u2018", "'").replace(u"\u2019", "'") + ", "
    return s

@cross_origin()
@app.route('/testbitch', methods=['GET'])
def testbitch():
    places = gmaps.places_nearby(keyword="pizza", location=(42.2800266,-83.7471391), radius=24140, type='restaurant')['results']
    # places.sort(key=sortStuff, reverse=True)
    return str(places)
    return str(gmaps.place(places[0]['place_id']))
    s = ""
    for ob in temp['results']:
        s += ob['name'].replace(u"\u2018", "'").replace(u"\u2019", "'") + ", "
    return s
    return

@app.route('/prefs', methods=['POST'])
def prefs():
    pref = mongo.db.pref
    name = request.json['name']
    prefs = request.json['prefs']
    rprefs = request.json['rprefs']
    grating = request.json['grating']
    rating = request.json['rating']
    plevel = request.json['plevel']
    pref_id = pref.insert({'name': name, 'prefs': prefs, 'rprefs': rprefs, 'grating': grating, 'plevel': plevel, 'rating': rating})
    new_pref = pref.find_one({'_id': pref_id})
    output = {'name' : new_pref['name'], 'prefs': new_pref['prefs'], 'rprefs': new_pref['rprefs'], 'grating': new_pref['grating'], 'plevel': new_pref['plevel'], 'rating': new_pref['rating']}
    return jsonify({'result': output})

@app.route('/train', methods=['GET'])
def train():
    pref = mongo.db.pref
    
    return jsonify(json.loads(json_util.dumps(pref.find({}))))

def sortStuff(json):
    try:
        return json['rating']
    except:
        return 0

if __name__ == "__main__":
    app.run(host='0.0.0.0')
