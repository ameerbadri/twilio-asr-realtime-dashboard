import os
from flask import Flask, request, Response, jsonify, send_from_directory
# from flask_cors import CORS, cross_origin
import requests
from requests.auth import HTTPBasicAuth
import json
from urllib.parse import urlencode, quote_plus
from datetime import datetime
from twilio.rest import Client
from twilio.jwt.access_token import AccessToken
from twilio.jwt.access_token.grants import SyncGrant
from twilio.twiml.voice_response import VoiceResponse, Gather

app = Flask(__name__)

# Twilio Settings
twilio_account_sid = os.environ["TWILIO_ACCOUNT_SID"]
twilio_auth_token = os.environ["TWILIO_AUTH_TOKEN"]
twilio_api_key = os.environ["TWILIO_API_KEY"]
twilio_api_secret = os.environ["TWILIO_API_SECRET"]
twilio_sync_service_id = os.environ["TWILIO_SYNC_SERVICE_ID"]
apiai_client_access_key = os.environ["APIAPI_CLIENT_ACCESS_KEY"]

# Create Client to access Twilio resources
client = Client(twilio_account_sid, twilio_auth_token)

def dialogflow_intent(sessionId, input_speech_text):
    apiai_url = "https://api.api.ai/v1/query"
    apiai_querystring = {"v": "20150910"}
    apiai_language = "en"
    # Initialize API.AI Bot
    headers = {
        'authorization': "Bearer " + apiai_client_access_key,
        'content-type': "application/json"
    }
    payload = {'query': input_speech_text,
               'lang': "en",
               'sessionId': sessionId
    }
    response = requests.request("POST", url=apiai_url, data=json.dumps(payload), headers=headers, params=apiai_querystring)
    output = json.loads(response.text)
    print (json.dumps(output, indent=2))
    try:
        intent = output['result']['metadata']['intentName']
        print ('intentName found')
    except:
        print('intentName not found')
        try:
            intent = output['result']['action']
            print('intent Action found')
        except:
            print('intent Action not found')
            intent = "Unknown"
    try:
        score = str(output['result']['score'])
    except:
        score = "0.0"
    return intent, score

@app.route('/asr_callback', methods=['POST'])
def asr_callback():
    request_dict = {}
    request_dict = request.form.to_dict()
    request_dict['initial_question'] = request.values.get('initial_question', '')
    language = request.values.get('language', 'en-GB')
    request_dict['CallDate'] = datetime.now().strftime("%Y-%m-%d-%H:%M:%S")
    item_key = request_dict['CallDate'] + ':' + request_dict['CallSid']
    intent, score = dialogflow_intent(request_dict['CallSid'], request_dict['SpeechResult'])
    request_dict['Intent'] = intent
    request_dict['IntentScore'] = score
    callback_data = json.dumps(request_dict)
    # print(callback_data)
    new_data = {'Key': item_key,
            'Data': callback_data}
    print(new_data)
    sync_map = 'ASRBotEvents'
    url = 'https://sync.twilio.com/v1/Services/' + twilio_sync_service_id + '/Maps/' + sync_map + '/Items'
    response = requests.request("POST", url, data=new_data, auth=HTTPBasicAuth(twilio_account_sid, twilio_auth_token))
    print(response.text)
        
    # Generate return twiml
    resp = VoiceResponse()
    resp.say('You said, ' + request_dict['SpeechResult'] + ' , With an intent of: ' + request_dict['Intent'] + ' , Thanks for calling.', language=language, voice='woman')
    print (resp)
    return str(resp)


@app.route('/start', methods=['POST'])
def start():
    request_dict = {}
    request_dict = request.form.to_dict()
    language = request.values.get('language', 'en-GB')
    initial_question = ' Welcome to Customer Care. You can ask questions related to order delivery or store hours and direction.  How may I help you? '
    asr_hints = 'I need order status, order status, status, track orders, order delivery, payments, customer service, help'
    # Generate initial twiml
    values = {'initial_question': initial_question,
            'language': language    
        }
    qs = urlencode(values, quote_via=quote_plus)
    callback_url = '/asr_callback?' + qs
    resp = VoiceResponse()
    gather = Gather(input='speech', hints=asr_hints, language=language, speech_timeout='auto', action=callback_url)
    gather.say(initial_question, language=language, voice='woman')
    resp.append(gather)
    print(resp)
    return str(resp) 

@app.route('/')
def index():
    return send_from_directory('static', 'asr_dashboard.html')

@app.route('/<path:path>')
def send_js(path):
    print (path)
    return send_from_directory('static', path)

@app.route('/token')
def token():
    # get the userid from the incoming request
    identity = request.values.get('identity', None)
    # Create access token with credentials
    token = AccessToken(twilio_account_sid, twilio_api_key, twilio_api_secret, identity=identity)
    # Create a Sync grant and add to token
    sync_grant = SyncGrant(service_sid=twilio_sync_service_id)
    token.add_grant(sync_grant)
    # Return token info as JSON
    return jsonify(identity=identity, token=token.to_jwt().decode('utf-8'))

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, threaded=True)