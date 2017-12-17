
self.oninstall = function (e) {
  // populate cache
  // download all resources needed for offline experience

}

self.onactivate = function (e) {
  // cleanup like managing cache

    var title = 'Worker activated!';
    var body = 'Twilio GCM tester ready to get pushes!';

    self.registration.showNotification(title, {  
      body: body,  
      icon: '',  
      tag: 'tag'  
    })  
}

self.onfetch = function (e) {
  // deal with network traffic
}

self.addEventListener('push', function(event) {  
  console.log('Received a push message', event);

  var title = 'Yay a message.';  
  var body = 'We have received a push message.';  
  var icon = '/images/icon-192x192.png';  
  var tag = 'simple-push-demo-notification-tag';

  event.waitUntil(  
    self.registration.showNotification(title, {  
      body: body,  
      icon: icon,  
      tag: tag  
    })  
  );  
});

