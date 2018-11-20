/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

// prints "hi" in the browser's dev tools console


let len = document.getElementsByClassName("square");

var randomItem = len[Math.floor(Math.random()*len.length)];

console.log(randomItem);