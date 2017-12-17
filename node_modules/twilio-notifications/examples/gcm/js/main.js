var pushNotification;
var twilioNotification;

function getSubscription() {
    console.log("Get Subscription");
    pushNotification.init();
}

function removeSubscription() {
    console.log("Remove subscription");
}

function initNotification(token)
{
    var notification = new Twilio.IPMessagingCore.NotificationClient(token);

    notification.on('transport_ready', function(state) {
        console.log("UI: Transport state: " + state ? 'ready' : 'down');
    });

    notification.subscribe('gcm_test_message', 'gcm');

    return notification;
}

$(document).ready(function() {

    var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBQzc4ZThlNjdmYzAyNDY1MjE0OTBmYjk5MDdmZDBjMTY1IiwiZXhwIjoiNDAzMTM3NzcwNiIsInNjb3BlIjoic2NvcGU6Y2xpZW50Om91dGdvaW5nP2FwcFNpZD1BUDcwMGQ3M2ZlMTVjYWRjMzU3MWU4YTYyZTRkODFjODU3JmFwcFBhcmFtcz1jcmVkZW50aWFsX3NpZCUzRENSODUyNjAzNDgxZGM0YTBhZjc1NTJkODhhZTdjOWZiYTclMjZlbmRwb2ludF9pZCUzRGNkcy1lMmUtdGVzdC1lbmRwb2ludCUyNmlkZW50aXR5JTNEY2RzX2UyZV90ZXN0X3VzZXIlMjZzZXJ2aWNlX3NpZCUzRElTNmIwZmE2MDgzOWM1MTFlNWExNTFmZWZmODE5Y2RjOWYifQ.7q49FGBLBl3NQ32mULHW-SFiCgIjLwO9yHF_1_5yurY';

    twilioNotification = initNotification(token);

    pushNotification = new PushNotification();
    pushNotification.onReady = function(subscription) {
        console.log('Got subscription : ' + JSON.stringify(subscription));
        twilioNotification.setGCMToken(subscription);
    };
});

