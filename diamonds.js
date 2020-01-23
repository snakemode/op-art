let ably = new Ably.Realtime('2L2RQA.8DEPlw:Oc37iQaXFFdvT-Zx');

function subscribeTfl(name) { 
    channelTfl = ably.channels.get('[product:ably-tfl/tube]tube:northern:940GZZLUEUS:arrivals');
    historyTfl();
    channelTfl.subscribe(function(msg) {
      updateTfl(msg.data);
    });
  }

  function updateTfl(arrivals) {
    arrivals = arrivals.reverse();
    let newBodyTfl = document.createElement('tbody');
    arrivals.forEach((arrival) => {
      let arrivalTime = new Date(arrival.ExpectedArrival).toLocaleTimeString();
      let tmpTableRow = newBodyTfl.insertRow(0);
      tmpTableRow.insertCell(0).innerHTML = arrivalTime;
      tmpTableRow.insertCell(1).innerHTML = arrival.Towards;
      tmpTableRow.insertCell(2).innerHTML = arrival.PlatformName;
      tmpTableRow.insertCell(3).innerHTML = arrival.LineName;
    });
    for(let i=0; i < arrivals.length; i++) {
      let arrivalTime = new Date(arrivals[arrivals.length - i - 1].ExpectedArrival).toLocaleTimeString();
      if(tableBodyTfl.rows[i] != undefined && newBodyTfl.rows[i] != undefined){
        if(tableBodyTfl.rows[i].cells[0].innerHTML != arrivalTime) {
          newBodyTfl.rows[i].classList.add("c-flashbox__positive-flash");
        }
      }
    }

    tableBodyTfl.parentNode.replaceChild(newBodyTfl, tableBodyTfl);
    tableBodyTfl = newBodyTfl;
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
        }
      });
    });
  }