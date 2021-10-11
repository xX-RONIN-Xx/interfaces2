
//obtiene la columna correspondiente al lugar donde se solto la ficha
function obtenerColumna(cantCasillerosw, tamanioCelda,x) {
    let posT=(canvasW / 2) - (tableroW / 2);
    let inicioCelda = posT;
    for (let i = 0; i < cantCasillerosw; i++) {
        if ((x > inicioCelda) && (x < inicioCelda + tamanioCelda)) {
            return i;
        }
        inicioCelda += tamanioCelda;
    }
    //por lo demas error
}


//cantidad de casilleros a lo ancho (tablero) col
//genera una matriz vacia
function generarMatriz(col) {
    let filas = col - 1;
   
    for (let f = 0; f < filas; f++) {
        matriz[f] = [];
    }
    for (let i=0; i < filas; i++) {
    
        for (let j = 0; j < col; j++) {
            matriz[i][j]=null;
        }

    }
}
 

//en base a la columna encontrada devuelve la fila correspondiente al casillero libre
function buscarPoslibreCol(col,cantCasillerosw){
    let filas=cantCasillerosw-1;
    for (let i=filas.valueOf()-1;i>=0;i-- ){
        if((matriz[i][col])==null){
            return i;//devuelve la fila en la cual hay un casillero libre, la columna ya la tengo
        }
    }
    return -1;//si toda la columna esta llena devuelve -1
}


//guarda la ficha en la posicion libre encontrada
function actualizarMatriz(fil,col,ficha,cantCasillerosw,radius){
    matriz[fil][col]=ficha;
    let x=(col*3-1.5)*radius+((canvasW/2)-tableroW/2);
    let y=(fil*3-1.5)*radius+((canvasW/2)-tableroW/2);
    ficha.setPosition(x,y);
    drawFigure(cantCasillerosw, cant, imagen1, imagen2);

}


