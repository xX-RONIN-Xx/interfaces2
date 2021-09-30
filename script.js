"USE STRICT"
document.addEventListener('DOMContentLoaded', (event) => {


    let c = document.getElementById("myCanvas");
    let ctx = c.getContext("2d");
    let Cwidth = c.width;
    let Cheight = c.height;
    for (let i = 0; i < 10; i++) {
        ctx.fillStyle = randomRGBA();
        ctx.beginPath();
        ctx.arc(Math.round(Math.random() * Cwidth), Math.round(Math.random() * Cheight), 20, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
    }

    function randomRGBA() {
        let r = Math.round((Math.random() * 255));
        let g = Math.round((Math.random() * 255));
        let b = Math.round((Math.random() * 255));
        let a = 255;
        return `rgba(${r},${g},${b},${a})`;
    }
});