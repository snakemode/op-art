let body = document.body,
    html = document.documentElement;

let height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
let width = Math.max( body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth );
let gap = width/100 * 28;
let holder = document.getElementById("holder");
let colHeight = Math.trunc((height - gap) / 100);
let rowLen = Math.trunc((width - gap) / 100);
let quantity = colHeight * rowLen;

console.log(height, width, gap, colHeight, rowLen)
holder.style.width = rowLen * 100 + "px"


for (var i = 0; i < quantity; i++) {
  let square = document.createElement('div');
      square.className="square";
  
 if (Math.random() >= 0.5) {
   square.classList.add("rotated");
 }
  
  holder.appendChild(square);
}
