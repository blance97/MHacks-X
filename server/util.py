import requests
import json
import numpy as np

def load_data():
    data = requests.get("http://localhost:5000/train")
    fil = open("types.txt", "r")
    types = fil.read().replace("\"", "").replace("\n","").split(",")
    count = 0
    jsondata = json.loads(data.text)
    arr = np.zeros((len(jsondata), 260))
    y = np.zeros((len(jsondata), 1))
    for j in jsondata:
        for i in j['prefs']:
            m = types.index(i)
            arr[count][m] = 1
        arr[count][129] = j['grating'] / 5
        for i in j['rprefs']:
            m = types.index(i)
            arr[count][m+130] = 1
        arr[count][259] = j['plevel'] / 4
        y[count] = j['rating'] / 5
        count+=1
    x = np.array(arr, dtype='float32')
    y = np.array(y, dtype='float32')
    return x, y
    
    


load_data()