//Componentes html
let imagen = document.getElementById('img-roulette'),
overlay = document.getElementById('overlay'),
botonAtras = document.getElementById('button-back'),
botonAdelante = document.getElementById('button-forward');

//Rutas imagenes
const rutaSmallImg = [
    "img/food1_small.webp", 
    "img/food2_small.webp", 
    "img/food3_small.webp", 
    "img/food4_small.webp"];

//Parametros
const INTERVAL_TIME = 3000; //ms
let intervalo = setInterval(playInterval, INTERVAL_TIME);
let indexAction = 0; //Lleva el indice de las acciones

//FUNCIONES
//Simple Print en consola
function print(text){
    console.log(text);
}
//Cambia el indice con el tiempo del interval
function playInterval(){
    if(indexAction < rutaSmallImg.length-1){
        indexAction ++;
    }else {
        indexAction = 0;
    }
    cambiarImg();
}
//Cambia la imagen dependiendo del indice
function cambiarImg(){
    print("RUTA: "+rutaSmallImg[indexAction]+" INDICE:"+indexAction);
    imagen.src = rutaSmallImg[indexAction];
}
//Acciones
function avanzarImagen(){
    if(indexAction < rutaSmallImg.length-1){
        indexAction ++;
    }else {
        indexAction = 0;
    }
    cambiarImg();
}

function retrocederImagen(){
    if(indexAction < rutaSmallImg.length){
        indexAction --;
        if (indexAction<0){
            indexAction = rutaSmallImg.length-1;
        }
    }
    cambiarImg();
}

function pausarIntervalo(){
    clearInterval(intervalo);
}

function iniciarIntervalo(){
    intervalo = setInterval(playInterval, INTERVAL_TIME);
}

//Eventos Mouse
botonAdelante.addEventListener('click', avanzarImagen);
botonAtras.addEventListener('click', retrocederImagen);
overlay.addEventListener('mouseenter', pausarIntervalo);
overlay.addEventListener('mouseleave', iniciarIntervalo);
