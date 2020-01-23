let ably = new Ably.Realtime('2L2RQA.8DEPlw:Oc37iQaXFFdvT-Zx');
let trains = {};
let ordered = {};

function updateTfl(arrivals) {
  arrivals = arrivals.reverse();
  arrivals.forEach((arrival) => {
    let arrivalTime = new Date(arrival.ExpectedArrival).toLocaleTimeString();
  });
}

function onSubscriptionData(i, i2) {
 console.log("Some subscription data appeared"); 
}

function subscribeTfl(channelName, onSubscriptionData) {
  const channel = `[product:ably-tfl/tube]tube:${channelName}:940GZZLUKSX:arrivals`;

  return new Promise((resolve, reject) => { 
    let channelTfl = ably.channels.get(channel);

    channelTfl.attach(function(err) {
      channelTfl.history({ untilAttach: true, limit: 1 }, function(err, resultPage) {
        console.log("History retrieved for " + channelName); 
        
        if(err) {
            reject(err);
            return;
        }

        let recentMessage = resultPage.items[0];

        if(recentMessage) {            
          resolve(resultPage.items[0].data);
        } else { 
          resolve([]);
        }          
      });
      
      // channelTfl.subscribe(onSubscriptionData);
    });

    console.log("Subscribing to " + channel);      
  }); 
}

function sortByArrivalTime(i1, i2) {
    if(i1.ExpectedArrival < i2.ExpectedArrival) {
      return -1;
    } else if(i1.ExpectedArrival > i2.ExpectedArrival) {
      return 1;
    }
    return 0;
}

async function subscribeAll() {
  console.log("Starting");
  
  let allTrains = [];
  
  const subscriptionPromises = [
    subscribeTfl("northern"),
    subscribeTfl("victoria"),
    subscribeTfl("metropolitan"),
    subscribeTfl("piccadilly"),
    subscribeTfl("hammersmith-city"),
    subscribeTfl("circle")    
  ];
  
  const items = await Promise.all(subscriptionPromises);
  allTrains.push(...items.flat());
  
  const orderedTrains = allTrains.sort(sortByArrivalTime);
  
  orderedTrains.forEach(() => {
  });
  console.log(JSON.stringify(orderedTrains));
}

subscribeAll()

