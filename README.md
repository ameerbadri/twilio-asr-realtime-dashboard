# Twilio ASR and Intent Realtime Dashboard

This demo is about the power of using Twilio realtime Automated Speech Recoginition (ASR) and Intent analysis system (Dialogflow) in an IVR. The results of the ASR and Intent analysis are displayed in a dashboard using Twilio Sync. The practical aspect of this demo is to show the following capabilities:
1) The awesome accuracy and the realtime nature of ASR
2) Using a 3rd party Bot system for Intent analysis
3) Visualising the derived information in a dashboard
4) Importantly, companies can easliy and cost effectively adopt modern speech recoginiton technologies and augment into their existing contact centres.

## Realtime ASR and Intent Dashboard

![](asr_ivr_dashboard.png)

You'll need following accounts:
1) Twilio (https://www.twilio.com)
2) Dialogflow (https://dialogflow.com)
3) Heroku (if you want a one-click install) (https://www.heroku.com)

## Technologies
1) Twilio Speech Recoginition (https://www.twilio.com/speech-recognition)
2) Twilio Sync (https://www.twilio.com/sync)
3) Server side app using Python and Twilio REST APIs (Sync)
4) Dialogflow REST API 
5) Dashboard app components:
5.1) Javascript framework Vue.js (https://vuejs.org)
5.2) UI framework Semantic-ui (https://semantic-ui.com)
5.3) Twilio Sync JS SDK (https://www.twilio.com/docs/api/sync/quickstart-js)

## Setup

### Configuring Dialogflow
1) Upload the ASRIntents.zip file into the Dialogflow console (https://dialogflow.com/docs/intents#upload_intents)
2) Obtain the developer access key from the dialogflow console (https://dialogflow.com/docs/reference/agent/#obtaining_access_tokens)
3) You'll need this key when you configure during Heroku app install

### Obtaining Credentials and Sync Service ID
1) Log into your Twilio console to get:
1.1) Account SID and Auth Token from console dashboard
1.2) API Key and Secret (https://www.twilio.com/console/runtime/api-keys)
1.3) Create a Sync Service (https://www.twilio.com/console/sync/services)
2) You'll need the Twilio Credentials and Sync Service ID during the Heroku app install

### Create a Sync Map (ASRBotEvents)
Sync Map object is used to store call details along with ASR and Intents. This map is subscribed by the frontend dashboard.
Run the following CURL command:
curl -X POST https://sync.twilio.com/v1/Services/<SYNC_SERVICE_ID>/Maps \
 -d 'UniqueName=ASRBotEvents' \
 -u 'YOUR_TWILIO_ACCOUNT_SID:YOUR_TWILIO_AUTH_TOKEN'


### One Click Heroku Deploy of Web App
This will install the wep application and all the dependencies on Heroku (login required). As part of the installation, the Heroku app will walk you through configuration of environment variables.  Please click on the following button to deploy the application.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/ameerbadri/twilio-asr-realtime-dashboard)

### Configuring Twilio inbound phone number
1) Log into your Twilio console and purchase a phone number
2) Assign the URL https://<YOUR_HEROKU_APP_URL>/start?language=en-GB to the phone number

### You're all set
Now, Navigate to https://<YOUR_HEROKU_APP_URL>

As the phone calls come into your Twilio phone number, the user ASR and Intent will be displayed in the dashboard.
