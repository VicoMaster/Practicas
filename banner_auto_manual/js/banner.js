/**
 * Descripción: Script que desplaza las imagenes en el ejeX y cambia el background de los progress-bar
 * Descripción-2: Luego inicia un intervalo para ejecutar la función avanzar en tiempo
 * Autor: Riveloper
 * Fecha: 02/12/2021
 */

//Import datos de las imagenes para agregar
import { PACK_IMAGENES } from './rutas-img.js';

const flecha_izquierda = document.getElementById('left-arrow');
const flecha_derecha = document.getElementById('right-arrow');
const slider = document.getElementById('slider');
const progress_bar = document.querySelectorAll('.progress__bar');
const container_progress = document.getElementById('container-progress');
const overlayBanner = document.getElementById('overlay-banner');
let sectionImg = document.querySelectorAll('.section-img');
//Ponemos el color inicial al elemento 1 del progress_bar
const color_progress = 'rgb(227, 186, 8)';
const color_white = 'rgba(255, 255, 255, .4)';
progress_bar[0].style.background = color_progress;

//GLOBAL VARIABLES
let position = 0,
    widthOverlayBanner = overlayBanner.offsetWidth;

//CARGA DE IMAGENES EN EL BANNER POR ANCHO DEL CONTENEDOR
function chargeImgBanner() {
    if (widthOverlayBanner > 700) {
        sectionImg.forEach((img, index) => {
            img.src = PACK_IMAGENES[0][index]; //Pack IMG Large
        });
    } else {
        sectionImg.forEach((img, index) => {
            img.src = PACK_IMAGENES[1][index]; //Pack IMG MOBILE
        });
    }
}
chargeImgBanner();

//FUNCION PARA BACKGROUND BARRAS DE PROGRESO
const next_progress = () => {
    progress_bar.forEach((bar) => {
        bar.style.background = color_white;
    });
    switch (position) {
        case 0:
            progress_bar[0].style.background = color_progress;
            break;
        case -20:
            progress_bar[1].style.background = color_progress;
            break;
        case -40:
            progress_bar[2].style.background = color_progress;
            break;
        case -60:
            progress_bar[3].style.background = color_progress;
            break;
        case -80:
            progress_bar[4].style.background = color_progress;
            break;
        default:
            break;
    }
}

//FUNCION DE AVANCE
function avance() {
    if (position === 0 || position > -80) {
        position -= 20;
    } else {
        position = 0;
    }
    next_progress();
    slider.style.transform = `translateX(${position}%)`;
}

//FUNCION DE RETROCESO
function retroceso() {
    if (position < 0 && position >= -80) {
        position += 20;
    } else {
        position = -80;
    }
    next_progress();
    slider.style.transform = `translateX(${position}%)`;
}

//FUNCION PROPAGADORA PARA BARRAS DE PROGRESO
container_progress.addEventListener('click', (evento) => {
    let pgb = evento.target.id;
    let node_name = evento.target.classList.value;
    if (node_name === 'progress__bar') {
        switch (pgb) {
            case 'pgb-1':
                position = 0;
                next_progress();
                slider.style.transform = `translateX(${position}%)`;
                break;
            case 'pgb-2':
                position = -20;
                next_progress();
                slider.style.transform = `translateX(${position}%)`;
                break;
            case 'pgb-3':
                position = -40;
                next_progress();
                slider.style.transform = `translateX(${position}%)`;
                break;
            case 'pgb-4':
                position = -60;
                next_progress();
                slider.style.transform = `translateX(${position}%)`;
                break;
            case 'pgb-5':
                position = -80;
                next_progress();
                slider.style.transform = `translateX(${position}%)`;
                break;
            default:
                break;
        }
    }
})

//FUNCIONES TOUCH
let touchPixelsMove = 0,
    movimientoToqueTouch = 0,
    primerToqueTouch = 0;
function galleryMoveOverlay(event) {
    touchPixelsMove++;
    movimientoToqueTouch = event.touches[0].clientX;
}

function galleryMoveOverlayEnd() {
    if (touchPixelsMove > 2) {
        if (primerToqueTouch > movimientoToqueTouch) {
            avance();
        }
        if (primerToqueTouch < movimientoToqueTouch) {
            retroceso();
        }
    }
    touchPixelsMove = 0;
    primerToqueTouch = 0;
}

function galleryMoveOverlaystart(event) {
    primerToqueTouch = event.touches[0].clientX;
}

//EVENTOS
flecha_derecha.addEventListener('click', avance);
flecha_izquierda.addEventListener('click', retroceso);
overlayBanner.addEventListener('touchmove', galleryMoveOverlay);
overlayBanner.addEventListener('touchend', galleryMoveOverlayEnd);
overlayBanner.addEventListener('touchstart', galleryMoveOverlaystart);


function resizeWindow() {
    widthOverlayBanner = overlayBanner.offsetWidth;
    chargeImgBanner();
}
window.onresize = resizeWindow;


//FUNCION DE AVANCE CON EL TIEMPO
let auto_avance = setInterval(avance, 3000);
window.onload = auto_avance; //Solo puede haber una llamada en toda la página web... verificar donde se llama este metodo de window

//TENER EN CUENTA QUE LA FUNCION LLAMADA CON window.onload DEBERA SER LLAMADA DONDE SE EJECUTE PRIMERO ESTE METODO