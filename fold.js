let ably = new Ably.Realtime('2L2RQA.NRr7ZQ:DddGQeHfnaZsHCv7');

let channelWeather = ably.channels.get('[product:ably-openweathermap/weather]weather:2643741');
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
      //  console.log((recentMessage.data.main.temp - 273.15 ).toFixed(2)+ '°C');
      }
    });
  });
}

function degToRad(degrees)
{
  var pi = Math.PI;
  return degrees * (pi/180);
}

function setWidth() {
     
  let squares = document.querySelectorAll('.square');

  squares.forEach(el => {
    el.style.width = 40 * Math.sin(degToRad(el.dataset.squareno)) + 'px'
  });
}
       
let squWidth = 40;

setWidth();