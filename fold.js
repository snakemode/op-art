let body = document.body,
    html = document.documentElement;

let art = document.getElementById("art");
let squares = document.getElementsByClassName("square");

let width = Math.max( art.scrollWidth, art.offsetWidth, art.clientWidth, art.scrollWidth, art.offsetWidth );

for (var i = 1; i < 40; i++) {
  console.log(squares[i]);
  squares[i].style.width = i * i + "px";
}



       