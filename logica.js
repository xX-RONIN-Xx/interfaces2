//obtiene la columna correspondiente al lugar donde se solto la ficha
function obtenerColumna(cantCasillerosw, tamanioCelda, x) {
    let posT = (canvasW / 2) - (tableroW / 2);
    let inicioCelda = posT;
    for (let i = 0; i < cantCasillerosw; i++) {
        if ((x > inicioCelda) && (x < inicioCelda + tamanioCelda)) {
            return i;
        }
        inicioCelda += tamanioCelda;
    }
}

//cantidad de casilleros a lo ancho (tablero) col
//genera una matriz vacia
function generarMatriz(col) {
    let filas = col - 1;

    for (let f = 0; f < filas; f++) {
        matriz[f] = [];
    }
    for (let i = 0; i < filas; i++) {

        for (let j = 0; j < col; j++) {
            matriz[i][j] = 'vacio';
        }
    }
}

//en base a la columna encontrada devuelve la fila correspondiente al casillero libre
function buscarPoslibreCol(col, cantCasillerosw) {
    let filas = cantCasillerosw - 1;
    for (let i = filas.valueOf() - 1; i >= 0; i--) {
        if ((matriz[i][col]) == 'vacio') {
            return i; //devuelve la fila en la cual hay un casillero libre, la columna ya la tengo
        }
    }
    return -1; //si toda la columna esta llena devuelve -1
}


//guarda la ficha en la posicion libre encontrada
function actualizarMatriz(fil, col, ficha, cantCasillerosw, radius, e) {
    matriz[fil][col] = ficha;
    let x = ((col + 1) * 3 - 1.5) * radius + ((canvasW / 2) - tableroW / 2);
    let y = ((fil + 1) * 3 - 1.5) * radius + ((canvasH / 2) - tableroH / 2);
    ficha.setPosition(x, y);
    drawFigure(cantCasillerosw, cant, imagen1, imagen2);
}
//verifica si hay 4 en linea en alguna posicion
function verificarGanador(fil, col, uFicha) {
    let tamMatFila = matriz[fil].length;
    let tamMatCol = matriz.length;

    if ((contadorOeste(fil, col, uFicha) + contadorEste(fil, col, tamMatFila, uFicha) + 1) >= 4) { //mas 1 porque se tiene que contar a si misma
        ganador = true;
        return uFicha;
    }
    if ((contadorSur(fil, col, tamMatCol, uFicha) + 1) == 4) {
        ganador = true;
        return uFicha;
    }

    if (((contadorNoreste(fil, col, tamMatFila, uFicha) + (contadorSuroeste(fil, col, tamMatCol, uFicha)) + 1) >= 4)) {
        ganador = true;
        return uFicha;
    }

    if ((contadorSurEste(fil, col, tamMatCol, tamMatFila, uFicha) + contadorNoroeste(fil, col, uFicha) + 1) >= 4) {
        ganador = true;
        return uFicha;
    }

}

function contadorOeste(fil, col, uFicha) {
    col = col - 1;
    let contador = 0;
    while (col >= 0 && (matriz[fil][col] != 'vacio') && ((matriz[fil][col].getSource()) == uFicha.getSource())) {
        col -= 1;
        contador += 1;;
    }
    return contador;
}

function contadorEste(fil, col, maxFila, uFicha) {
    col = col + 1;
    let contador = 0;
    while (col < maxFila && (matriz[fil][col] != 'vacio') && (matriz[fil][col].getSource() == uFicha.getSource())) {
        col += 1;
        contador += 1;;
    }
    return contador;
}

function contadorNoreste(fil, col, maxFila, uFicha) {
    fil = fil - 1;
    col = col + 1;
    let contador = 0;
    while ((fil >= 0) && (col < maxFila) && (matriz[fil][col] != 'vacio') && (matriz[fil][col].getSource() == uFicha.getSource())) {
        fil -= 1;
        col += 1;
        contador += 1;
    }
    return contador;
}

function contadorSur(fil, col, maxCol, uFicha) {
    fil = fil + 1;
    let contador = 0;
    while (fil < maxCol && (matriz[fil][col] != 'vacio') && (matriz[fil][col].getSource() == uFicha.getSource())) {
        fil += 1;
        contador += 1;
    }
    return contador;
}

function contadorSuroeste(fil, col, maxCol, uFicha) {
    fil = fil + 1;
    col = col - 1;
    let contador = 0;
    while ((fil < maxCol) && (col >= 0) && (matriz[fil][col] != 'vacio') && (matriz[fil][col].getSource() == uFicha.getSource())) {
        fil += 1;
        col -= 1;
        contador += 1;
    }
    return contador;
}

function contadorSurEste(fil, col, maxCol, maxFila, uFicha) {
    fil = fil + 1;
    col = col + 1;
    let contador = 0;
    while ((fil < maxCol) && (col < maxFila) && (matriz[fil][col] != 'vacio') && (matriz[fil][col].getSource() == uFicha.getSource())) {
        fil += 1;
        col += 1;
        contador += 1;
    }
    return contador;
}

function contadorNoroeste(fil, col, uFicha) {
    fil = fil - 1;
    col = col - 1;
    let contador = 0;
    while ((fil >= 0) && (col >= 0) && (matriz[fil][col] != 'vacio') && (matriz[fil][col].getSource() == uFicha.getSource())) {
        fil -= 1;
        col -= 1;
        contador += 1;
    }
    return contador;
}
//inicio de partida y cuenta regresiva
inicio.addEventListener("click", iniciarPartida);

function iniciarPartida() {
    turno = "jugador1";
    let timeleft = tiempoDeJuego;
    let downloadTimer = setInterval(function() {
        segundos = secondsToString(timeleft)
        if (timeleft <= 0) {

            document.getElementById("countdown").innerHTML = "Se acabó el tiempo.";
            for (let i = 0; i < fichas.length; i++) {
                fichas[i].setColocada(true);
                fichas2[i].setColocada(true);
            }
            clearInterval(downloadTimer);
        } else {
            document.getElementById("countdown").innerHTML = segundos + " tiempo restante de la partida.";
        }
        timeleft -= 1;
    }, 1000);

}
//transforma los segundos a formato mm:ss
function secondsToString(seconds) {
    let minute = Math.floor((seconds / 60) % 60);
    minute = (minute < 10) ? '0' + minute : minute;
    let second = seconds % 60;
    second = (second < 10) ? '0' + second : second;
    return minute + ':' + second;
}