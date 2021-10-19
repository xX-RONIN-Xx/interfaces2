class Tablero {
    constructor(sizeX, sizeY, tableroX, tableroY, ctx) {
            this.canvasX = tableroX;
            this.canvasY = tableroY;
            this.tableroW = sizeX;
            this.tableroH = sizeY;
            this.ctx = ctx;
        }
        //dibuja el tablero
    draw(tableroW, tableroH, canvasW, canvasH, radius) {
        let posX = (canvasW / 2) - (tableroW / 2);
        let posY = ((canvasH / 2) - (tableroH / 2));
        ctx.shadowOffsetX = 7; //desplazamiento horizontal sombra.
        ctx.shadowOffsetY = 7; //desplazamiento vertical sombra
        ctx.shadowColor = "#002800"; //color de sombra
        ctx.shadowBlur = 15;
        ctx.fillStyle = "#42b825";
        ctx.fillRect(posX, posY, tableroW, tableroH);
        let xAux = posX + 1.5 * radius;
        let yAux = posY + 1.5 * radius;
        //crea los huecos en una disposicion equidistante 
        for (let x = 1.5 * radius; x <= tableroW; x += 3 * radius) {
            for (let y = 1.5 * radius; y <= tableroH; y += 3 * radius) {
                let casillero = new Casillero(xAux, yAux, ctx, radius);
                yAux += 3 * radius;
                casillero.draw();
            }
            yAux = posY + 1.5 * radius;
            xAux += 3 * radius;
        }
    }
}