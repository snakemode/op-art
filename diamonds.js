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

function subscribeTfl(channelName, onSubscriptionData) {
  const channel = `[product:ably-tfl/tube]tube:${channelName}:940GZZLUKSX:arrivals`;
  let channelTfl = ably.channels.get(channel);

  return new Promise((resolve, reject) => { 
    
    channelTfl.attach(function(err) {
      if (err) {
          reject(err);
          return;
      }
      
      channelTfl.history({ untilAttach: true, limit: 1 }, function(err, resultPage) {
        console.log("History retrieved for " + channelName); 
        
        if (err) {
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
      
      channelTfl.subscribe((msg) => {
        console.log(msg);
      });
    });

    console.log("Subscribing to " + channel);      
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
    let square = document.createElement('div');
    square.className="square " + train.LineId;

    container.appendChild(square);
    console.log(`${train.ExpectedArrival} - ${train.LineId} - ${train.CurrentLocation}`);
    
    /*
    You are a ghost in the machine <3 <3 <3
    */
  });
  
}

asyncMain();