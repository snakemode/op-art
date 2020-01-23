let ably = new Ably.Realtime('2L2RQA.8DEPlw:Oc37iQaXFFdvT-Zx');
let northern = '[product:ably-tfl/tube]tube:northern:940GZZLUKSX:arrivals';
let victoria = '[product:ably-tfl/tube]tube:victoria:940GZZLUKSX:arrivals';
let metropolitan = '[product:ably-tfl/tube]tube:metropolitan:940GZZLUKSX:arrivals';
let piccadilly = '[product:ably-tfl/tube]tube:piccadilly:940GZZLUKSX:arrivals';
let hammersmith = '[product:ably-tfl/tube]tube:hammersmith-city:940GZZLUKSX:arrivals';
let circle = '[product:ably-tfl/tube]tube:circle:940GZZLUKSX:arrivals';

let trains = {};
let ordered = {};


function updateTfl(arrivals) {
  arrivals = arrivals.reverse();

  arrivals.forEach((arrival) => {
    let arrivalTime = new Date(arrival.ExpectedArrival).toLocaleTimeString();
  });
}

function historyTfl(channel, resolve, reject) {

}

function subscribeTfl(channel) {  
    return new Promise((resolve, reject) => { 
      
      let channelTfl = ably.channels.get(channel);
     
      channelTfl.subscribe(function(msg) {
        console.log(msg.data);
      });
      
      channelTfl.attach(function(err) {
        channelTfl.history({ untilAttach: true, limit: 1 }, function(err, resultPage) {
          if(err){
              reject(err);
              return
          }
          
          let recentMessage = resultPage.items[0];
          
          if(recentMessage) {            
            resolve(resultPage.items[0].data);
          } else { 
            resolve([]);
          }          
        });
      });
      
      console.log("Subscribed to " + channel);      
    }); 
}

async function subscribeAll() {
  console.log("Starting");
  
  let allTrains = [];
  
  allTrains.push(... await subscribeTfl(northern));
  allTrains.push(... await subscribeTfl(victoria));
  allTrains.push(... await subscribeTfl(metropolitan));
  allTrains.push(... await subscribeTfl(piccadilly));
  allTrains.push(... await subscribeTfl(hammersmith));
  allTrains.push(... await subscribeTfl(circle));
  
  console.log(allTrains.length);
  
  allTrains.forEach(train => {
    console.log(train);
    /*trainSet.forEach(train => {
      console.log(train);
    });  */  
  });
  
  // call Order trains here? Merge all the different sets?
  
  console.log("Everything is now subscribed");
}

subscribeAll()

function orderTrains(unordered) {
  
  const ordered = {};
  Object.keys(unordered).sort().forEach(function(key) {
    ordered[key] = unordered[key];
  });

  console.log(JSON.stringify(ordered));
}
