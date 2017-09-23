from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
from flask_cors import *
import googlemaps
import random
import json
from datetime import datetime

gmaps = googlemaps.Client(key='AIzaSyD2A-7qrmxUA4MpTUGojfIhpl2LQF-RF9w')

app = Flask(__name__)

app.debug = True
app.secret_key = 'secretBATMAN123'
jwt = JWTManager(app)

CORS(app)

@app.route('/')
def main():
    return 'Hello, World!'

@cross_origin()
@app.route('/recm', methods=['POST'])
def recm():
    data = json.loads(request.data)
    types = data['types']
    loc = data['location']
    location = (loc['lat'],loc['long'])
    r = random.uniform(0,1)
    places = None
    if r < types[3]['weight']:
        places = gmaps.places_nearby(keyword=types[3]['type'], location=location, radius=24140, type='restaurant')['results']
    elif r < types[2]['weight'] + types[3]['weight']:
        places = gmaps.places_nearby(keyword=types[2]['type'], location=location, radius=24140, type='restaurant')['results']
    elif r < types[1]['weight'] + types[2]['weight'] + types[3]['weight']:
        places = gmaps.places_nearby(keyword=types[1]['type'], location=location, radius=24140, type='restaurant')['results']
    else:
        places = gmaps.places_nearby(keyword=types[0]['type'], location=location, radius=24140, type='restaurant')['results']

    places.sort(key=sortStuff, reverse=True)
    placeInfo = gmaps.place(places[0]['place_id'])
    return jsonify({"place":places[0], "placeInfo":placeInfo})

@cross_origin()
@app.route('/testbitch', methods=['GET'])
def testbitch():
    # places = gmaps.places_nearby(keyword="pizza", location=(42.2800266,-83.7471391), radius=24140, type='restaurant')['results']
    # places.sort(key=sortStuff, reverse=True)
    return str(places)
    return str(gmaps.place(places[0]['place_id']))
    s = ""
    for ob in temp['results']:
        s += ob['name'].replace(u"\u2018", "'").replace(u"\u2019", "'") + ", "
    return s
    return

def sortStuff(json):
    try:
        return json['rating']
    except:
        return 0

if __name__ == "__main__":
    app.run(host='0.0.0.0')
