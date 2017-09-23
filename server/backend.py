from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
from flask_cors import *
import googlemaps
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
@app.route('/recm', methods=['GET'])
def recm():
    return str(gmaps.places("mexican", (42.2800266,-83.7471391), 24140, type='restaurant'))

if __name__ == "__main__":
    app.run(host='0.0.0.0')
