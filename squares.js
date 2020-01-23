let body = document.body,
    html = document.documentElement;

let height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
let width = Math.max( body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth );
let gap = width/100 * 28;
let holder = document.getElementById("holder");
let colHeight = Math.trunc((height - gap) / 100);
let rowLen = Math.trunc((width - gap) / 100);
let quantity = colHeight * rowLen;

holder.style.width = rowLen * 100 + "px"


let ably = new Ably.Realtime('2L2RQA.NRr7ZQ:DddGQeHfnaZsHCv7'); //get your free api key here https://www.ably.io/

var channel = ably.channels.get('[product:ably-bitflyer/bitcoin]bitcoin:jpy');

channel.subscribe((message) => {
  holder.innerHTML = "";
  
  for (var i = 0; i < quantity; i++) {
    let square = document.createElement('div');
        square.className="square";
        console.log(message.data.price, i)
   
    if ((message.data.price+'').indexOf(i) > -1) {
     square.classList.add("rotated");
   }
    
    holder.appendChild(square);
  }
});
