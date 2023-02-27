 const canvas = document.querySelector("canvas");
 canvas.width=window.innerWidth-70;
 canvas.height=400;
 
let context = canvas.getContext("2d");
let StartBackgroundcolor="white";
context.fillStyle= StartBackgroundcolor;
context.fillRect(0,0, canvas.width, canvas.height);

let DrawColor="black";
let DrawWidth="2";
let IsDrawing="false";

let restorearray=[];
let index = -1;

canvas.addEventListener("touchstart",start,false);
canvas.addEventListener("toucmove",draw,false);
canvas.addEventListener("mousedown",start,false);
canvas.addEventListener("mousemove",draw,false);

canvas.addEventListener("touchend",stop,false);
canvas.addEventListener("mouseup",stop,false);
canvas.addEventListener("mouseout",stop,false);

function start(event){
    IsDrawing=true;
    context.beginPath();
    context.moveTo(event.clientX-canvas.offsetLeft,
                    event.clientY-canvas.offsetTop);
    event.preventDefault();
}

function draw(event){
    if (IsDrawing) {
    context.lineTo(event.clientX-canvas.offsetLeft,
                   event.clientY-canvas.offsetTop);
   context.strokeStyle = DrawColor;
   context.lineWidth= DrawWidth;
   context.lineCap="round";
   context.lineJoin="round";
   context.stroke();
    }
    event.preventDefault();
}

function stop(event){
    if (IsDrawing){
        context.stroke();
        context.closePath();
        IsDrawing=false;
    }
    event.preventDefault();
if(event.type != 'mouseout'){
 restorearray.push(context.getImageData(0,0, canvas.width, canvas.height));
 index += 1;
}
}
function Changecolor(element){
     DrawColor = element.style.background
}


function Clearcanvas(){
    context.fillStyle= StartBackgroundcolor;
context.fillRect(0,0, canvas.width, canvas.height);
context.ClearRect(0,0, canvas.width, canvas.height);

restorearray=[];
index=-1;
}


function Undolast(){
    if(index <= 0){
        Clearcanvas();
    }else{
        index -= 1;
        restorearray.pop();
        context.putImageData(restorearray[index],0,0) 
    }
}

const adviceArea = document.querySelector(".advice-slip");

function getAdvice() {
  fetch("https://api.adviceslip.com/advice")
    .then((res) => res.json())
    .then(
      (data) =>
        (adviceArea.innerHTML = `<span class="id">${data.slip.id}.</span><h2 class="advice">${data.slip.advice}</h2>`)
    );
}

getAdvice();
