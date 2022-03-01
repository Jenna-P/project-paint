const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext('2d');
const fillColors = document.querySelectorAll(".fillColor");
const paintColors = document.querySelectorAll(".paintColor");
const range = document.getElementById("jsRange");
const saveBtn = document.getElementById("jsSave");
const resetBtn = document.getElementById("jsReset");

canvas.width = 550;
canvas.height = 550;

//default background white
ctx.fillStyle="white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

//context default
ctx.strokeStyle="#2c2c2c";
ctx.fillStyle="white";
ctx.lineWidth=2.5;

let painting = false;
let filling = false;

//prevent right click
const handelCM = (event) => event.preventDefault();

//fill canvas by click on fill colors
Array.from(fillColors).forEach(color => 
    color.addEventListener("click",(event) => {
        const color = event.target.style.backgroundColor;
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, canvas.width, canvas.height)
    })
);

//paint on canvas
Array.from(paintColors).forEach(color => 
    color.addEventListener("click",(event) => {
        const color = event.target.style.backgroundColor;
        console.log(color);
        ctx.strokeStyle = color;
        
    })
);

const stopPainting = () => painting = false; 
const startPainting = () => painting = true;

const onMouseMove = (event) => {
    //(x,y) When pointer is inside canvas 
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

if(canvas){
    //move mouse on canvas
    canvas.addEventListener("mousemove",onMouseMove);
    //click on canvas
    canvas.addEventListener("mousedown",startPainting);
    //release mouse button
    canvas.addEventListener("mouseup",stopPainting);
    //pointer out og canvas
    canvas.addEventListener("mouseleave", stopPainting);
    //prevent right click
    canvas.addEventListener("contextmenu",handelCM);
}

//thickness brush
if(range){
    range.addEventListener("input", (event) => {
        const rangeValue = event.target.value;
        ctx.lineWidth = rangeValue;
    });
}

// save painting as a image 
saveBtn.addEventListener('click', () => {
    const image = canvas.toDataURL();
    const link = document.createElement('a'); 
    link.href = image;
    link.download = "myPaint[👩‍🎨]";
    link.click();
});

// reset canvas
resetBtn.addEventListener('click', () => {
    ctx.fillStyle="white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
});