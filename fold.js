let ably = new Ably.Realtime('2L2RQA.NRr7ZQ:DddGQeHfnaZsHCv7');
function subscribeOpenWeather(id) {
  //OpenWeatherMap/Weather
  channelWeather = ably.channels.get('[product:ably-openweathermap/weather]weather:' + id);
  let newTemperature, weatherDesc;
  historyOpenWeather();
  //subscribing to updates in the weather data
  channelWeather.subscribe((msg) => {
    if($('select#city-id').val() == msg.data.id){
      if(oldTemperature > newTemperature) {
      $resultWeather.removeClass("c-flashbox__negative-flash");
      $resultWeather.removeClass("c-flashbox__neutral-flash");
      $resultWeather.removeClass("c-flashbox__positive-flash");
      setTimeout(function() {
        $resultWeather.addClass("c-flashbox__negative-flash");
      }, 6);
    } else if(oldTemperature < newTemperature) {
      $resultWeather.removeClass("c-flashbox__negative-flash");
      $resultWeather.removeClass("c-flashbox__positive-flash");
      setTimeout(function() {
        $resultWeather.addClass("c-flashbox__positive-flash");
      }, 6);
    } else if(weatherDesc == msg.data.weather[0].description){
      $resultWeather.removeClass("c-flashbox__negative-flash");
      $resultWeather.removeClass("c-flashbox__neutral-flash");
      $resultWeather.removeClass("c-flashbox__positive-flash");
      setTimeout(function() {
        $resultWeather.addClass("c-flashbox__neutral-flash");
      }, 6);
    }
    oldTemperature = newTemperature;
    weatherDesc = msg.data.weather[0].description
    $resultWeather.text((msg.data.main.temp - 273.15 ).toFixed(2)+ '°C with ' + msg.data.weather[0].description);
    }
  });
}

function historyOpenWeather() {
  channelWeather.attach(function(err) {
    channelWeather.history({ untilAttach: true, limit: 1 }, function(err, resultPage) {
      if(err){
          console.log(err)
          return
      }
      let recentMessage = resultPage.items[0];
      if(recentMessage) {
        $resultWeather.text((recentMessage.data.main.temp - 273.15 ).toFixed(2)+ '°C with ' + recentMessage.data.weather[0].description);
      }
    });
  });
}
$('select#city-id').on('change', function() {
  subscribeToChannel($('select#city-id').val(), channelWeather, subscribeOpenWeather);
});
subscribeToChannel($('select#city-id').val(), channelWeather, subscribeOpenWeather);

let body = document.body,
    html = document.documentElement;

let art = document.getElementById("art");
let squares = document.getElementsByClassName("square");

let width = Math.max( art.scrollWidth, art.offsetWidth, art.clientWidth, art.scrollWidth, art.offsetWidth );

for (var i = 1; i < 10; i++) {
  squares[i].style.width = 40 - i*(i*0.5) + "px";
}



       