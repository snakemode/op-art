let ably = new Ably.Realtime('2L2RQA.NRr7ZQ:DddGQeHfnaZsHCv7');
let channelName = '[product:ably-openweathermap/weather]weather:2643741';
let channel = ably.channels.get(channelName);
channel.subscribe((msg) => {
    console.log(msg)
});

let body = document.body,
    html = document.documentElement;

let art = document.getElementById("art");
let squares = document.getElementsByClassName("square");

let width = Math.max( art.scrollWidth, art.offsetWidth, art.clientWidth, art.scrollWidth, art.offsetWidth );

for (var i = 1; i < 10; i++) {
  console.log(squares[i]);
  squares[i].style.width = 40 - i*(i*0.5) + "px";
}



       