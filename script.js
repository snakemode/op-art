/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

// prints "hi" in the browser's dev tools console

let body = document.body,
    html = document.documentElement;

let height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
let width = Math.max( body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth );
let gap = width/100 * 28;
let holder = document.getElementById("holder");
let colHeight = Math.trunc((height - gap) / 100);
let rowLen = Math.trunc((width - gap) / 100);
let quantity = colHeight * rowLen;
 
holder.style.padding.top(width - (rowLen * 100) - (width / 10));
holder.style.padding.bottom(width - (rowLen * 100) - (width / 10));


//let len = document.getElementsByClassName("square");
//let quantity = Math.floor(Math.random() * len.length);
console.log(quantity);


for (var i = 0; i < quantity; i++) {
  let square = document.createElement('div');
      square.className="square";
  console.log('here', i);
  holder.appendChild(square);
}











var iDiv = document.createElement('div');
iDiv.id = 'block';
iDiv.className = 'block';

// Create the inner div before appending to the body
var innerDiv = document.createElement('div');
innerDiv.className = 'block-2';

// The variable iDiv is still good... Just append to it.
iDiv.appendChild(innerDiv);

// Then append the whole thing onto the body
document.getElementsByTagName('body')[0].appendChild(iDiv);