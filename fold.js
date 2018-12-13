let body = document.body,
    html = document.documentElement;

let art = document.getElementById("art");
let squares = document.getElementsByClassName("square");

let width = Math.max( art.scrollWidth, art.offsetWidth, art.clientWidth, art.scrollWidth, art.offsetWidth );

for (var i = 1; i < 7; i++) {
  console.log(squares[i]);
  squares[i].style.width = 40 - i*i + "px";
}



       