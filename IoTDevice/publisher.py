#!/usr/bin/env python3

from paho.mqtt import client as mqtt
import json, ssl, jwt
import datetime
from time import sleep

import sensordata

CREDENTIALS_JSON = 'credentials.json'
PRIVATE_KEY = 'ec_private.pem'
ROOT_CA = 'roots.pem'
ALGORITHM = 'ES256'
TOKEN_EXPIRATION = 12 * 60 # in minutes

# all credentials for connection
broker = 'mqtt.googleapis.com'
port = 443
timeout = 60

with open(CREDENTIALS_JSON) as credentialsFile:
    credentials = json.loads(credentialsFile.read())

project = credentials['project']
region = credentials['region']
registry = credentials['registry']
telemetry = credentials['telemetry']
device = credentials['device']

clientId = 'projects/{}/locations/{}/registries/{}/devices/{}'.format(project, region, registry, device)
pubSubTopic = 'projects/{}/topics/{}'.format(project, telemetry)
publishTopic = '/devices/{}/events'.format(device)

print('[Client Id]', clientId)
print('[Cloud PubSub Topic]', pubSubTopic)
print('[Telemetry Event Publish Topic]', publishTopic)

# mqtt client
client = mqtt.Client(clientId)

with open(PRIVATE_KEY) as privateKey:
    secret = privateKey.read()

# generation of web token
startTime = datetime.datetime.utcnow()
expirationTime = datetime.datetime.utcnow() + datetime.timedelta(minutes = TOKEN_EXPIRATION)
webToken = {
    'iat': startTime,
    'exp': expirationTime,
    'aud': project
}
password = jwt.encode(webToken, secret, algorithm = ALGORITHM)

client.username_pw_set('unused', password)
client.tls_set(ca_certs = ROOT_CA,  tls_version = ssl.PROTOCOL_TLSv1_2)

# call back functions
def onConnect(client, userData, flags, rc):
    print('Connected to client with response code', rc)
def onPublish(client, userData, mid):
    print('Message id:', mid)
def onMessage(client, userData, message):
    payload = str(message.payload)
    print('Message received [', payload, '] on topic', message.topic, 'with qos', message.qos)

client.on_connect = onConnect
client.on_publish = onPublish
client.on_message = onMessage

try:
    # attempt a connection
    print('\nConnecting...\n')
    client.connect(broker, port, timeout)

    # publish the message
    while datetime.datetime.utcnow() < expirationTime:
        sensorData = sensordata.getData()
        for data in sensorData:
            telemetryData = json.dumps(data)
            print('Publishing telemetry data: \n', telemetryData)
            client.publish(publishTopic, telemetryData)
            print('---published---\n')
        sleep(10)
except KeyboardInterrupt:
    print('Interrupt received. Quitting...')
finally:
    # disconnect
    client.disconnect()
