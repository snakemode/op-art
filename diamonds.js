let ably = new Ably.Realtime('2L2RQA.8DEPlw:Oc37iQaXFFdvT-Zx');
let channelName = '[product:ably-tfl/tube]tube:disruptions';
let channel = ably.channels.get(channelName);
channel.subscribe((msg) => {
  let data = JSON.stringify(msg.data);
  console.log(data);
});