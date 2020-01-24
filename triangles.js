let ably = new Ably.Realtime('2L2RQA.8DEPlw:Oc37iQaXFFdvT-Zx');  //get your free api key here https://www.ably.io/
var channel = ably.channels.get('[product:ably-flightradar24/heathrow-flights]flights:airport:LHR:departures');

channel.subscribe(function(message) {
  console.log(message.data[1]);
});