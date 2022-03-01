const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext('2d');
const colors = document.querySelectorAll(".fillColor");

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.fillStyle = color;
}

for (var i = 0; i < colors.length; i++) {
    colors[i].addEventListener('click', (event) => {
        const color = event.target.style.backgroundColor;
        console.log(color);
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, canvas.width, canvas.height)
    });
}




