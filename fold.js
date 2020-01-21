let ably = new Ably.Realtime('2L2RQA.NRr7ZQ:DddGQeHfnaZsHCv7');

let channelWeather = ably.channels.get('[product:ably-openweathermap/weather]weather:' + id);
let newTemperature, weatherDesc;
historyOpenWeather();
//subscribing to updates in the weather data
channelWeather.subscribe((msg) => {
  console.log(msg);
    
});

function historyOpenWeather() {
  channelWeather.attach(function(err) {
    channelWeather.history({ untilAttach: true, limit: 1 }, function(err, resultPage) {
      if(err){
          console.log(err)
          return
      }
      let recentMessage = resultPage.items[0];
      if(recentMessage) {
        console.log(recentMessage.data.main.temp - 273.15 ).toFixed(2)+ '°C with ' + recentMessage.data.weather[0].description);
      }
    });
  });
}

let body = document.body,
    html = document.documentElement;

let art = document.getElementById("art");
let squares = document.getElementsByClassName("square");

let width = Math.max( art.scrollWidth, art.offsetWidth, art.clientWidth, art.scrollWidth, art.offsetWidth );

for (var i = 1; i < 10; i++) {
  squares[i].style.width = 40 - i*(i*0.5) + "px";
}



       