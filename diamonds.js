let ably = new Ably.Realtime('YOUR_API_KEY');
let channelName = '[product:ably-tfl/tube]tube:northern:940GZZLUEUS:arrivals';
let channel = ably.channels.get(channelName);
channel.subscribe((msg) => {
  /* station update in msg */
});