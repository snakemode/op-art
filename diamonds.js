let ably = new Ably.Realtime('2L2RQA.8DEPlw:Oc37iQaXFFdvT-Zx');
let channelTfl = ably.channels.get('[product:ably-tfl/tube]tube:northern:940GZZLUKSX:arrivals');

function subscribeTfl(name) {
    historyTfl();
    channelTfl.subscribe(function(msg) {
      updateTfl(msg.data);
      console.log('live: ', msg.data)
    });
  }

  function updateTfl(arrivals) {
    arrivals = arrivals.reverse();
 
    arrivals.forEach((arrival) => {
      let arrivalTime = new Date(arrival.ExpectedArrival).toLocaleTimeString();
    });
  }

  function historyTfl() {
    channelTfl.attach(function(err) {
      channelTfl.history({ untilAttach: true, limit: 1 }, function(err, resultPage) {
        if(err){
            console.log(err)
            return
        }
        let recentMessage = resultPage.items[0];
        if(recentMessage) {
          updateTfl(recentMessage.data);
          console.log('recent: ', recentMessage.data);
        }
      });
    });
  }

subscribeTfl();