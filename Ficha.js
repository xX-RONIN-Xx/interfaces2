class Ficha {

    constructor(homeX, homeY, posX, posY, radius, ctx, source, jugador, turno) {
        this.homeX = homeX;
        this.homeY = homeY;
        this.ctx = ctx;
        this.posX = posX;
        this.posY = posY;
        this.radius = radius;
        this.imgReady = false;
        this.source = source;
        this.jugador = jugador;
        this.colocada = true;
        this.turno = turno;
    }

    cargarImagen(source, jugador) {
        this.ctx.beginPath();
        this.ctx.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.closePath();
        this.source = source;
        this.jugador = jugador;
        const img = new Image();
        img.src = source;
        if (!this.imgReady) {
            this.imgReady = true;
            img.onload = () => {
                this.ctx.drawImage(img, this.posX - this.radius, this.posY - this.radius, 2 * this.radius, 2 * this.radius);
            }
        } else {
            this.ctx.drawImage(img, this.posX - this.radius, this.posY - this.radius, 2 * this.radius, 2 * this.radius);
        }
    }


    isPointInside(x, y) {
        let _x = this.posX - x;
        let _y = this.posY - y;
        return Math.sqrt(_x * _x + _y * _y) < this.radius;
    }

    setPosition(x, y) {
        this.posX = x;
        this.posY = y;
    }
    getPosition() {
        return {
            x: this.getPosX(),
            y: this.getPosY()
        };
    }
    getPosX() {
        return this.posX;
    }
    getPosY() {
        return this.posY;
    }
    getSource() {
        return this.source;
    }
    getJugador() {
        return this.jugador;
    }
    getTurno() {
        return this.turno;
    }
    getColocada() {
        return this.colocada;
    }
    setColocada(valor) {
        this.colocada = valor;
    }
}