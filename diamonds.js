let ably = new Ably.Realtime('UeZ7NA.1_lKNA:4Twl7lf-0ozS09kQ');
let channelName = '[product:ably-tfl/tube]tube:northern:940GZZLUEUS:arrivals';
let channel = ably.channels.get(channelName);
channel.subscribe((msg) => {
 console.log(msg);
});