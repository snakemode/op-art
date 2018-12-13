let body = document.body,
    html = document.documentElement;

let art = document.getElementById("art");

let width = Math.max( art.scrollWidth, art.offsetWidth, art.clientWidth, art.scrollWidth, art.offsetWidth );
let gap = width/100 * 28;
let rowLen = Math.trunc((width - gap) / 100);
let quantity = 500;

console.log(width, gap, rowLen)

for (var i = 0; i < quantity; i++) {
  let square = document.createElement('div');
      square.className="square";
  
  art.appendChild(square);
}



//console.log(Math.pow(4, 0.5));
