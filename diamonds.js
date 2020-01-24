let ably = new Ably.Realtime('2L2RQA.8DEPlw:Oc37iQaXFFdvT-Zx');
let trains = {};
let squares = document.querySelectorAll('.square');

// Because global scope can't await.
async function asyncMain() {
  
  const items = await Promise.all([
    subscribeToLine("northern"),
    subscribeToLine("victoria"),
    subscribeToLine("metropolitan"),
    subscribeToLine("piccadilly"),
    subscribeToLine("hammersmith-city"),
    subscribeToLine("circle")
  ]);
  
  const trains = [];
  
  for (let collection of items) {
    const subset = collection.slice(1, 20);
    trains.push(...subset);
  }
  
  trains.sort(byArrivalTime).forEach(renderSingleTrain);
}

async function subscribeToLine(channelName, onSubscriptionData) {
  const channelId = `[product:ably-tfl/tube]tube:${channelName}:940GZZLUKSX:arrivals`;
  const channel = ably.channels.get(channelId);
  
  await attachPromise(channel);  
  channel.subscribe(onSubscriptionMessage); 
  
  const resultPage = await getHistoryPromise(channel, { untilAttach: true, limit: 1 });
  console.log("History retrieved for " + channelName); 
  
  const recentMessage = resultPage.items[0] || { data: [] }; 
  return recentMessage.data;
}

function renderSingleTrain(train, index) {  
  squares[index].classList.add(train.LineId);
   console.log(`${train.ExpectedArrival} - ${train.LineId} - ${train.CurrentLocation}`);
}

function onSubscriptionMessage(data) {
  //console.log(data); 
}

function byArrivalTime(i1, i2) {
    if(i1.ExpectedArrival < i2.ExpectedArrival) {
      return -1;
    } else if(i1.ExpectedArrival > i2.ExpectedArrival) {
      return 1;
    }
    return 0;
}

// Promisifying Ably API below here so async / await works

async function attachPromise(channel) {
  return new Promise((resolve, reject) => {
    channel.attach(err => {      
      if (err) { reject(err); } else { resolve(); }
    });
  });
}

async function getHistoryPromise(channel, params) {
  return new Promise((resolve, reject) => {
    channel.history(params, (err, response) => {
      if (err) { reject(err); } else { resolve(response); }
    });
  });
}

// Entrypoint
asyncMain();