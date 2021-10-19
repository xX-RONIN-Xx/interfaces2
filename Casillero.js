class Casillero {
    constructor(posX, posY, ctx, radius) {
        this.x = posX;
        this.y = posY;
        this.ctx = ctx;
        this.radius = radius;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.fillStyle = "#FFFFFF";
        this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.strokeStyle = 'black';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
        this.ctx.closePath();
    }
}