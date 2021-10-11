
"use strict"

let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext("2d");
let canvasW = 1000;
let canvasH = 900;
let tableroW;
let tableroH;
let casW;
let cant;
let tipo;
let radius = 26;
let imagen1;
let imagen2;
let lastClickedFicha = null;
let isMouseDown = false;
let tamanioCelda=3*radius;
let textX = 50;
let textY = 50;
let matriz = [];

canvas.width = canvasW;
canvas.height = canvasH;
ctx.fillStyle = "#FFFFFF";
ctx.fillRect(0, 0, canvas.width, canvas.height);

function drawTxT(){
    ctx.font="25pt Verdana";
    ctx.strokeStyle="black";
    ctx.lineWidth = 2;
    ctx.strokeText("Player 1", textX - 22, textY ,120);
    ctx.strokeText("Player 2", textX + 800, textY,120);
}

drawTxT();
//tablero;
let tablero1 = new Tablero(tableroW, tableroH, ctx);
let tablero2 = new Tablero(tableroW, tableroH, ctx);
let tablero3 = new Tablero(tableroW, tableroH, ctx);
let tablero4 = new Tablero(tableroW, tableroH, ctx);

function cargarParametros(value){
    casW = value;

    if (casW == 7){
        cant = 21;
        drawTipo(casW, cant, imagen1, imagen2);
    }
    if (casW == 8){
        cant = 28;
        drawTipo(casW, cant, imagen1, imagen2);
    }  
    if (casW == 9){
        cant = 36;
        drawTipo(casW, cant, imagen1, imagen2);
    }
    if (casW == 10){
        cant = 45;
        drawTipo(casW, cant, imagen1, imagen2);
     }

}


partida.addEventListener("click", borrarPartida);

function borrarPartida(){
    clearCanvas();
    drawTablero();
    drawTxT();
}
 function drawTablero(){
    tableroW = radius * (3 * 7);
    tableroH = radius * (3 * 6);
    tablero1.draw(tableroW, tableroH, canvasW, canvasH, radius);
   

 }
 drawTablero();

function mostrarBotones(){

    swal({
        title: "Seleccione tipo de fichas",
        buttons: {
            casino: { text: " ",
            className : 'casino'
            },
            cartas: {
              text: " ",
              className : 'cartas'
            },
            color: {
                text: " ",
                className : 'color'
              },
          },
        })
        .then((value) => {
          switch (value) {
         
            case "casino":
              cargarTipo(value);
              break;
         
            case "cartas":
              cargarTipo(value);
              break;
            case "color":
                cargarTipo(value);
                break;
          }
        })

   

}

 function cargarTipo(value){
   tipo=value;
   casW= 7;
   cant =21;
    if(tipo=="casino"){
        imagen1 = "img/fichaRoja.png";
        imagen2 = "img/fichaAzul.png";
        drawTipo(casW, cant, imagen1, imagen2);
    }

    if(tipo=="cartas"){
        imagen1 = "img/cartas.png";
        imagen2 = "img/corazon.png";
        drawTipo(casW, cant, imagen1, imagen2); 
    }

    if(tipo=="color"){
        imagen1 = "img/fichaAmarilla.png";
        imagen2 = "img/fichaVerde.png";
        drawTipo(casW, cant, imagen1, imagen2); 
    }

 }

 function drawTipo(casW, cant, imagen1, imagen2){
    generarMatriz(casW);
    crearFichas(cant);
    drawFigure(casW, cant, imagen1, imagen2);
    if(casW!= null){
        fichas =[];
        fichas2=[];
        crearFichas(cant);
        drawFigure(casW, cant, imagen1, imagen2);
    }

 }

function findClickedFicha(x, y) {
    for (let i = 0; i < fichas.length; i++) {
        const element = fichas[i];
        const element2 = fichas2[i];
        if (element.isPointInside(x, y)) {
            return element;
        }else if
            (element2.isPointInside(x, y)) {
                return element2;
        }
    }
}

canvas.addEventListener('mousedown', onmousedown, false);
function onmousedown(e) {
    isMouseDown = true;
    if (lastClickedFicha != null) {//creo que el primer if esta demas
        lastClickedFicha = null;
    }
    let clickFig = findClickedFicha(e.layerX, e.layerY);
    if (clickFig != null) {
        lastClickedFicha = clickFig;
    }
}


canvas.addEventListener('mouseup', onmouseup, false);
function onmouseup(e) {
    isMouseDown = false;
    let col;
    let iLibre;
    if (lastClickedFicha != null) {
        if (((e.layerX > ((canvasW / 2) - (tableroW / 2))) && (e.layerX < ((canvasW / 2) + (tableroW / 2))))&&e.layerY< ((canvasH / 2) - (tableroH / 2)-radius) ){
            col=obtenerColumna(casW,tamanioCelda,e.layerX);
         
           iLibre= buscarPoslibreCol(col,casW);
           actualizarMatriz(iLibre,col,lastClickedFicha,casW,radius);
        }else{alert('Soltar la ficha desde arriba del tablero')}
    }
}




/*la idea es que cuando cargamos las fichas, se muestren no se si una arriba de otra o separadas, pero 
en cualquier caso necesito saber cual es la posicion, aplicar los metodos de click inside todos los 
eventos de mouse para mover las fichas*/


//creo el objeto ficha y luego un arreglo de fichas
let fichas = [];
let fichas2 = [];
function crearFichas(cant) {
    let posX = 50;
    let posY = 50;
    let ficha;
    let ficha2;
    for (let i = 0; i < cant; i++) {
        ficha = new Ficha(posX, posY+(i*13) + 200, radius, ctx);
        ficha2 = new Ficha(posX + 900, posY+(i*13) + 200, radius, ctx);
        fichas.push(ficha);
        fichas2.push(ficha2);
    }
}
//crearFichas(cant);


//borro el canvas y llamo a la funcion que le carg la imagen elegida
function drawFigure(casW, cant, imagen1, imagen2) {
    clearCanvas();
    mostrarTablero(casW);
    drawTxT();
    for (let i = cant-1; i >=0; i--) {

        fichas[i].cargarImagen(imagen1);
        fichas2[i].cargarImagen(imagen2);
    }
    
}

function mostrarTablero(casW){
 
    tableroW = radius * (3 * casW);
    tableroH = radius * (3 * (casW - 1));
    if(casW==7){
       tablero1.draw(tableroW, tableroH, canvasW, canvasH, radius);
    }
    if(casW==8){
        tablero2.draw(tableroW, tableroH, canvasW, canvasH, radius);   
    }
    if(casW==9){
        tablero3.draw(tableroW, tableroH, canvasW, canvasH, radius);   
    }
    if(casW==10){
        tablero4.draw(tableroW, tableroH, canvasW, canvasH, radius);   
    }
  
}


//pone en blanco too el canvas(luego habra que borrar solo una parte para dividir el tablero de las fichas sin usar)
function clearCanvas() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvasW, canvasH);
}

canvas.addEventListener('mousemove', onmousemove, false);
function onmousemove(e) {
    if (isMouseDown && (lastClickedFicha != null)) {
        lastClickedFicha.setPosition(e.layerX, e.layerY);
        drawFigure(casW, cant, imagen1, imagen2);
    }

}
/**************************************************** */





