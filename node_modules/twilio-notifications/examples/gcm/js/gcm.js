'use strict';

function PushNotification()
{
}

PushNotification.prototype.init = function()
{
    this.isPushEnabled = false;
    
    if ('serviceWorker' in navigator) {  
        navigator.serviceWorker.register('./service-worker.js')  
        //navigator.serviceWorker.register('http://localhost:8080/examples/ipmessaging/chat/service-worker.js')  
            .then(function() {
                this.initialiseState();
            }.bind(this))  
            .catch(function(reason) { console.log("Failed to init push receiver: " + reason); });

    } else {  
        console.warn('Service workers aren\'t supported in this browser.');  
    }  
};

PushNotification.prototype.initialiseState = function()
{
    var self = this;

  // Are Notifications supported in the service worker?  
  if (!('showNotification' in ServiceWorkerRegistration.prototype)) {  
    console.warn('Notifications aren\'t supported.');  
    return;  
  }

  // Check the current Notification permission.  
  // If its denied, it's a permanent block until the  
  // user changes the permission  
  if (Notification.permission === 'denied') {  
    console.warn('The user has blocked notifications.');  
    return;  
  }

  if(Notification.permission!=="granted") {
    Notification.requestPermission(function(state) {
        console.log("The answer is: " + state);   
    });
  }
  // Check if push messaging is supported  
  if (!('PushManager' in window)) {  
    console.warn('Push messaging isn\'t supported.');  
    return;  
  }

  // We need the service worker registration to check for a subscription  
  navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {  
    // Do we already have a push message subscription?  
    serviceWorkerRegistration.pushManager.getSubscription()  
      .then(function(subscription) {  
          //

        // Enable any UI which subscribes / unsubscribes from  
        // push messages.  
        // var pushButton = document.querySelector('.js-push-button');  
        // pushButton.disabled = false;

        if (!subscription) {  
          // We aren't subscribed to push, so set UI  
          // to allow the user to enable push  


            serviceWorkerRegistration.pushManager.subscribe()
               .then(function(subscription) {
                    self.sendSubscriptionToServer(subscription);
                    self.isPushEnabled = true;  
               }, function(reason) {
                    console.log("Failed to subscribe " + reason);   
               }) 

          return;  
        }
        
        // Keep your server in sync with the latest subscriptionId
        self.sendSubscriptionToServer(subscription);
        self.isPushEnabled = true;  
      })  
      .catch(function(err) {  
        console.warn('Error during getSubscription()', err);  
      });  
  });  
}

PushNotification.prototype.sendSubscriptionToServer = function(subscription)
{
    console.log("SUBSCRIPTION TO ADD: " + subscription);
    //this.emit('subscribed', subscription);
    this.onReady(subscription);
}

