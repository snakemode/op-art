let ably = new Ably.Realtime('2L2RQA.8DEPlw:Oc37iQaXFFdvT-Zx');
let northern = '[product:ably-tfl/tube]tube:northern:940GZZLUKSX:arrivals';
let victoria = '[product:ably-tfl/tube]tube:victoria:940GZZLUKSX:arrivals';
let metropolitan = '[product:ably-tfl/tube]tube:metropolitan:940GZZLUKSX:arrivals';
let piccadilly = '[product:ably-tfl/tube]tube:piccadilly:940GZZLUKSX:arrivals';
let hammersmith = '[product:ably-tfl/tube]tube:hammersmith-city:940GZZLUKSX:arrivals';
let circle = '[product:ably-tfl/tube]tube:circle:940GZZLUKSX:arrivals';

let trains = {};
let ordered = {};

function subscribeTfl(channel) {
  let channelTfl = ably.channels.get(channel);
  
  historyTfl(channel);
  channelTfl.subscribe(function(msg) {
    updateTfl(msg.data);
  });
}

function updateTfl(arrivals) {
  arrivals = arrivals.reverse();

  arrivals.forEach((arrival) => {
    let arrivalTime = new Date(arrival.ExpectedArrival).toLocaleTimeString();
  });
}

function historyTfl(channel) {
  let channelTfl = ably.channels.get(channel);

  channelTfl.attach(function(err) {
    channelTfl.history({ untilAttach: true, limit: 1 }, function(err, resultPage) {
      if(err){
          console.log(err)
          return
      }
      
      let recentMessage = resultPage.items[0];
      
      if(recentMessage) {
        updateTfl(recentMessage.data);
        recentMessage.data.forEach((train, index, array) => {
          let arrival = train.ExpectedArrival;
          let line = train.LineId;
          trains[arrival] = line;
          asyncFunction(train, () => {
            itemsProcessed++;
            if(itemsProcessed === array.length) {
              callback();
            }
          });
        });
        orderTrains(trains);
      }
    });
  });
}

subscribeTfl(northern);
subscribeTfl(victoria);
subscribeTfl(metropolitan);
subscribeTfl(piccadilly);
subscribeTfl(hammersmith);
subscribeTfl(circle);

function orderTrains(unordered) {
  
  const ordered = {};
  Object.keys(unordered).sort().forEach(function(key) {
    ordered[key] = unordered[key];
  });

  console.log(JSON.stringify(ordered));
}




function callback () { console.log('all done'); }

var itemsProcessed = 0;

[1, 2, 3].forEach((item, index, array) => {
  asyncFunction(item, () => {
    itemsProcessed++;
    if(itemsProcessed === array.length) {
      callback();
    }
  });
});