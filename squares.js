let body = document.body,
    html = document.documentElement;

let height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
let width = Math.max( body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth );
let holder = document.getElementById("holder");
let quantity;
let rowLen;
let colHeight;

if (body.classList.contains('framed')) {
  let gap = width/100 * 28;
  colHeight = Math.trunc((height - gap) / 100);
  rowLen = Math.trunc((width - gap) / 100);
  quantity = colHeight * rowLen;
  holder.style.width = rowLen * 100 + "px";
  console.log('yes')
} else {
  rowLen = width / 10;
  colHeight = height / rowLen;
  quantity = colHeight * rowLen;
  holder.style.width = "100%";
}



for (var i = 0; i < quantity; i++) {
  let square = document.createElement('div');
      square.className="square";

 if (Math.random() >= 0.5) {
   square.classList.add("rotated");
 }

  holder.appendChild(square);
}