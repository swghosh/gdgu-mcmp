# import modules wifi, json, request
from wifi import Cell
from urllib import request
import json

# set the API URL for Google Geolocation API
API_URL = 'https://www.googleapis.com/geolocation/v1/geolocate'
# set the wlan interface
WIFI_INTERFACE = 'wlan0'
# mobile country code
MCC = 404 # India
# fetch the API Key for accessing Google Geolocation API
# from './authfile.json'
with open('authfile.json') as authFile:
    contents = authFile.read()
    API_KEY = json.loads(contents)['googleGeolocationAPIKey']

def geolocation(verbose = True):
    # construct the API accessible URL with the key
    geolocationApiAccessUrl = API_URL + '?key=' + API_KEY

    # get the list of WiFi access points available
    # and parse them into the reqd. format
    # reference: https://developers.google.com/maps/documentation/geolocation/intro#wifi_access_point_object
    labels = ['macAddress', 'signalStrength', 'channel']
    cells = list(Cell.all(WIFI_INTERFACE))
    wifiAccessPoints = [dict(zip(labels, [cell.address, cell.signal, cell.channel])) for cell in cells]

    # construct the object that is to be sent
    toBeSent = {
        'homeMobileCountryCode': MCC,
        'considerIp': True,
        'wifiAccessPoints': wifiAccessPoints
    }
    # convert to JSON
    postData = json.dumps(toBeSent).encode('utf-8')
    headers = {'Content-Type': 'application/json'}

    # print some info regarding the request
    if verbose:
        print('Request:')
        print('---------')
        print("POST", API_URL + "?key=xxxxx")
        print(postData.decode('utf-8'), end = '\n\n')

    # prepare and send the HTTP request
    apiRequest = request.Request(geolocationApiAccessUrl, postData, headers = headers)
    res = request.urlopen(apiRequest)

    # receive the response after the request
    apiResponse = res.read().decode('utf-8')

    # print some info regarding the response
    if verbose:
        print('Response:')
        print('---------')
        print(apiResponse)

    # parse the JSON and return it
    return json.loads(apiResponse)
