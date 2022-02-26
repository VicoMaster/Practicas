//Objetos del tablero
botonPlay = document.getElementById('play-button'),
    bolita = document.getElementById('bolita'),
    barra = document.getElementById('barra'),
    gameArea = document.getElementById('game-area'),
    botonPause = document.getElementById('pause');


//Global Var
let movePosX = 0, //Movimiento en X para la barra
    barPosX = 0, // Position de la barra en X
    screenWidth = gameArea.clientWidth, //Ancho de la ventana
    stateMoveBar = true;
const ANCHO_BARRA = barra.offsetWidth; //Ancho de la barra

//Game Functions
function obtenerPosX(elementoHtml) {
    return elementoHtml.clientX;
}
function ocultarBotonPlay() {
    botonPlay.classList.add('opacity-0');
    bolita.classList.add('init-ball');
    bolita.classList.remove('opacity-0');
    botonPause.classList.remove('opacity-0');
}
function mostrarBotonPlay() {
    botonPlay.classList.remove('opacity-0');
    bolita.classList.remove('init-ball');
    bolita.classList.add('opacity-0');
    botonPause.classList.add('opacity-0');
}
function moverBarra(evento) {
    barPosX = barra.offsetWidth + (document.getElementById('barra').getBoundingClientRect().left);
    let movCursor = evento.movementX;
    //validamos movimiento en limite de la pantalla
    if (barPosX <= ANCHO_BARRA && movCursor < 0) {
        stateMoveBar = false;
    } else if (barPosX >= screenWidth && movCursor >= 1) {
        stateMoveBar = false;
    } else {
        stateMoveBar = true;
    }

    if (stateMoveBar) {
        movePosX += evento.movementX;
        barra.style.transform = `translateX(${movePosX}px)`;
    }
}
function resizeVentana() {
    screenWidth = gameArea.clientWidth;
}
function playGame() {
    ocultarBotonPlay();
    gameArea.addEventListener('mousemove', moverBarra);
}
function stopGame() {
    gameArea.removeEventListener('mousemove', moverBarra);
    movePosX = 0;
    barra.style.transform = `translateX(${movePosX}px)`;
    mostrarBotonPlay();
}

//Añadimos eventos
botonPlay.addEventListener('click', playGame);
botonPause.addEventListener('click', stopGame);
window.addEventListener('resize', resizeVentana);
