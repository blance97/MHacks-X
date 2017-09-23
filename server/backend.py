from flask import Flask, request, jsonify, render_template
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
@app.route('/recm', methods=['POST'])
def recm():
    data = json.loads(request.data)
    types = data['types']
    past = data['past']
    loc = data['location']
    location = (loc['lat'],loc['long'])
    r = random.uniform(0,1)
    # print data
    # print types[3]
    places = None
    k=0
    if r < types[3]['weight']:
        k=3
        places = gmaps.places_nearby(keyword=types[3]['type'], location=location, radius=24140, type='restaurant')['results']
    elif r < types[2]['weight'] + types[3]['weight']:
        k=2
        places = gmaps.places_nearby(keyword=types[2]['type'], location=location, radius=24140, type='restaurant')['results']
    elif r < types[1]['weight'] + types[2]['weight'] + types[3]['weight']:
        k=1
        places = gmaps.places_nearby(keyword=types[1]['type'], location=location, radius=24140, type='restaurant')['results']
    else:
        places = gmaps.places_nearby(keyword=types[0]['type'], location=location, radius=24140, type='restaurant')['results']

    places.sort(key=sortStuff, reverse=True)
    i=0
    while places[i]['name'] in past:
        i+=1
    # print(places[i])
    loc2 = (places[i]['geometry']['location']['lat'],places[i]['geometry']['location']['lng'])
    temp = gmaps.distance_matrix(origins=location, destinations=loc2)['rows'][0]['elements'][0]['distance']['value'] * 0.000621371
    dist = float("{0:.2f}".format(temp))
    plevel = 2
    if 'price_level' in places[i]:
        plevel = places[i]['price_level']
    placeInfo = gmaps.place(places[i]['place_id'])
    return jsonify({"placeInfo":placeInfo, "dist":dist, "rprefs":types[k]['type'], "plevel":plevel})

@cross_origin()
@app.route('/testbitch', methods=['GET'])
def testbitch():
    places = gmaps.places_nearby(keyword="pizza", location=(42.2800266,-83.7471391), radius=24140, type='restaurant')['results']
    return str(places[0]['price_level'])
    loc = (places[0]['geometry']['location']['lat'],places[0]['geometry']['location']['lng'])
    temp = gmaps.distance_matrix(origins=(42.2800266,-83.7471391),destinations=loc)['rows'][0]['elements'][0]['distance']['value']* 0.000621371
    places.sort(key=sortStuff, reverse=True)
    dist = float("{0:.2f}".format(temp))
    return str(dist)

@app.route('/prefs', methods=['POST'])
def prefs():
    pref = mongo.db.pref
    data = json.loads(request.data)
    name = data['name']
    prefs = data['prefs']
    rprefs = data['rprefs']
    grating = data['grating']
    rating = data['rating']
    plevel = data['plevel']
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
