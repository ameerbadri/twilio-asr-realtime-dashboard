var asrdashboard = new Vue({
    el: '#asrdashboard',
    data: {
      headerMessage: 'Real-Time Speech Recoginition Dashboard',
      loggedUser: "ameer@twilio.com",
      userAuthenticated: false,
      syncMode: false,
      syncStatus: "Disconnected",
      callList: [],
      maxCallList: 100,
      Intents: {"Default": 0}
    },
    methods: {
      syncRetrieveCallMap: function(data) {
        var self = this;
        var call = {};
        //var localcallList = [];
        //console.log(data[0]);
        for (let i = 0 ; i < data.length ; i++ ) {
          call = {};
          call['CallSid'] = data[i].value['CallSid'];
          call['CallDate'] = data[i].value['CallDate'];;
          call['From'] = data[i].value['From'];
          call['CallStatus'] = data[i].value['CallStatus'];
          call['SpeechResult'] = data[i].value['SpeechResult'];
          call['ASRConfidence'] = Math.round((parseFloat(data[i].value['Confidence']) * 100.00));
          call['Intent'] = data[i].value['Intent'];
          call['IntentScore'] = Math.round((parseFloat(data[i].value['IntentScore']) * 100.00));
          //localcallList.push(call);
          self.callList.push(call);
        }
        self.callList = _.orderBy(self.callList, ['CallDate'], ['desc']);
      },
      syncCallMap: function(data) {
        var self = this;
        var call = {};
        //console.log(data);
        call = {};
        call['CallSid'] = data.value['CallSid'];
        call['CallDate'] = data.value['CallDate'];;
        call['From'] = data.value['From'];
        call['CallStatus'] = data.value['CallStatus'];
        call['SpeechResult'] = data.value['SpeechResult'];
        call['ASRConfidence'] = Math.round((parseFloat(data.value['Confidence']) * 100.00));
        call['Intent'] = data.value['Intent'];
        call['IntentScore'] = Math.round((parseFloat(data.value['IntentScore']) * 100.00));
        self.callList.push(call);
        self.callList = _.orderBy(self.callList, ['CallDate'], ['desc']);
        var currentLength = self.callList.length;
        // Keep the callList array length of maxCallList
        if (currentLength > self.maxCallList)
        {
          delta = currentLength - self.maxCallList;
          self.callList.splice(self.maxCallList, delta);
        }
      }    
    },
    computed: {
      reverseCallList: function() {
          // Use lodash provided sort function
          return _.orderBy(this.callList, ['CallDate'], ['desc']);
      },
      totalIVRInteractions: function () {
        return this.callList.length;
      },
      callIntentData: function () {
        var self = this;
        var Intents = {};
        var allIntents = [];
        //console.log(self.callList.length)
        if (self.callList.length > 0) {
            for (var i = 0; i < self.callList.length; i++) {
                //console.log(self.callList[i]);
                //Intent[self.callList[i]["Intent"]] = Intent[self.callList[i]["Intent"]];
                if ( Intents[self.callList[i]["Intent"]]  >= 0 )
                 {
                  Intents[self.callList[i]["Intent"]] += 1 ;                   
                 }
                else
                {
                  Intents[self.callList[i]["Intent"]] = 1;
                }

            }
            //console.log(Intents);

            for ( intent in Intents )
            {
             allIntents.push( [intent, Intents[intent]]);
            }

            //self.Intents = Intent;
        }
        
        console.log("[DEBUG]::" + allIntents);
        return allIntents;
      },
      callIntentTrendsData: function () {
        var self = this;
        var intentTrends = [];
        var intentTrend = {};
        //console.log(self.callList.length)
        if (self.callList.length > 0) {
            for (var i = 0; i < self.callList.length; i++) {
                console.log(self.callList[i]);

                //Intent[self.callList[i]["Intent"]] = Intent[self.callList[i]["Intent"]];
                let intentName  = self.callList[i]["Intent"] ; 
                let intentDate = self.callList[i]["CallDate"];
                let intentDateFormatted =  new Date(intentDate.substring(0,10));
                let currIntent = {};

                if ( ! intentTrend[intentName] )
                  {
                    currIntent["name"] = intentName ; 
                    currIntent["data"] = {} ; 
                    currIntent["data"][intentDateFormatted] = 1 ; 
                    intentTrend[intentName] =   currIntent ;                    
                  }
                else
                  {
                    currIntent = intentTrend[intentName];
                    if ( ! currIntent["data"][intentDateFormatted] )
                    {
                      currIntent["data"][intentDateFormatted] = 1 ; 
                    }
                    else
                    {
                      currIntent["data"][intentDateFormatted] += 1 ; 
                    }
                   
                    intentTrend[intentName] =   currIntent ;  
                  }    
            }
            //console.log("TREND Data" + JSON.stringify(intentTrend));

            for ( thisIntentTrend in intentTrend )
            {
              intentTrends.push( intentTrend[thisIntentTrend] );
            }
            //self.Intents = Intent;
        }
        console.log("[TREND DATA ARRAY]::" + intentTrends);
        return intentTrends;        
 

      }
    },  
  })
  // Twilio Sync setup
  //Our interface to the Sync service
  var syncClient;
  //We're going to use a Sync Map for this demo
  var syncMapName;
  var userid = asrdashboard.$data.loggedUser;
  var ts = Math.round((new Date()).getTime() / 1000);
  var tokenUserid = userid + ts;
  asrdashboard.$data.syncEndpoint = tokenUserid;
  $.getJSON('/token' + '?identity=' + tokenUserid, function (tokenResponse) {
    //Initialize the Sync client
    var syncClient = new Twilio.Sync.Client(tokenResponse.token, { logLevel: 'info' });
    asrdashboard.$data.syncStatus = userid + ' Connected';
    //Get current Map and then subsribe to add and update events
    syncMapName = 'ASRBotEvents';

    syncClient.map(syncMapName).then(function(map) {
        function processPage(page) {
          //page.items.forEach(message => {console.log(message);});
          asrdashboard.syncRetrieveCallMap(page.items);
          if (page.hasNextPage) {
            page.nextPage().then(processPage);
          } else {
            console.log("DEBUG:: All Map Items Retrieved.");
          }
        }
        // retrieve 100 items per page
        map.getItems({pageSize: 100, order: 'desc'}).then(function(page) {
          processPage(page);
        });
        console.log("Dashboard Ready!");
        map.on('itemAdded', function(item) {
          console.log('New Key: ', item.key);
          console.log('New ASRBotEvents Data:', item);
          asrdashboard.syncCallMap(item);
        });
    });
  });