/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

// prints "hi" in the browser's dev tools console


let len = document.getElementsByClassName("square");
let quantity = Math.floor(Math.random() * len.length);
console.log(quantity);


for (var i = 0; i < quantity; i++) {
  var randomItem = len[Math.floor(Math.random()*len.length)];
  randomItem.classList.add("rotated");
}

console.log(randomItem);