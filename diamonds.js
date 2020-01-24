let ably = new Ably.Realtime('2L2RQA.8DEPlw:Oc37iQaXFFdvT-Zx');
let trains = {};
let ordered = {};
let container = document.getElementById('art');

function updateTfl(arrivals) {
  arrivals = arrivals.reverse();
  arrivals.forEach((arrival) => {
    let arrivalTime = new Date(arrival.ExpectedArrival).toLocaleTimeString();
  });
}

function onSubscriptionMessage(data) {
  console.log(data); 
}

async function subscribeTfl(channelName, onSubscriptionData) {
  const channel = `[product:ably-tfl/tube]tube:${channelName}:940GZZLUKSX:arrivals`;
  let channelTfl = ably.channels.get(channel);
  await channelTfl.attach();
  
  return new Promise((resolve, reject) => {     
    console.log("Subscribing to " + channel);
    
    channelTfl.attach(err => {      
      channelTfl.history({ untilAttach: true, limit: 1 }, (err2, resultPage) => {
        console.log("History retrieved for " + channelName); 
        
        if (err2) {
            reject(err2);
            return;
        }

        let recentMessage = resultPage.items[0] || { data: [] };   
        resolve(recentMessage.data);        
      });
      
      channelTfl.subscribe(onSubscriptionMessage);
    });
  }); 
}

function byArrivalTime(i1, i2) {
    if(i1.ExpectedArrival < i2.ExpectedArrival) {
      return -1;
    } else if(i1.ExpectedArrival > i2.ExpectedArrival) {
      return 1;
    }
    return 0;
}

async function asyncMain() { 
  
  const subscriptionPromises = [
    subscribeTfl("northern"),
    subscribeTfl("victoria"),
    subscribeTfl("metropolitan"),
    subscribeTfl("piccadilly"),
    subscribeTfl("hammersmith-city"),
    subscribeTfl("circle")
  ];
  
  const items = await Promise.all(subscriptionPromises);
  
  const selectedTrains = [];
  for(let collection of items) {
    const subset = collection.slice(1, 20);
    selectedTrains.push(...subset);
  }
  
  const allTrains = selectedTrains.sort(byArrivalTime);  
  
  allTrains.forEach((train, i) => {
   
    
    // console.log(`${train.ExpectedArrival} - ${train.LineId} - ${train.CurrentLocation}`);
  });
  
}

asyncMain();