/**
 * Descripción: Script que desplaza las imagenes en el ejeX y cambia el background de los progress-bar
 * Descripción-2: Luego inicia un intervalo para ejecutar la función avanzar en tiempo
 * Autor: Riveloper
 * Fecha: 02/12/2021
 */

const flecha_izquierda = document.getElementById('left-arrow');
const flecha_derecha = document.getElementById('right-arrow');
const slider = document.getElementById('slider');
const progress_bar = document.querySelectorAll('.progress__bar');
const container_progress = document.getElementById('container-progress');
//Ponemos el color inicial al elemento 1 del progress_bar
const color_progress = 'rgba(60, 64, 198, .9)';
const color_white = 'rgba(255, 255, 255, .4)';
progress_bar[0].style.background = color_progress;

let position = 0;

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
flecha_derecha.addEventListener('click', avance);

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
flecha_izquierda.addEventListener('click', retroceso);

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

//FUNCION DE AVANCE CON EL TIEMPO
let auto_avance = setInterval(avance,3000);
window.onload = auto_avance;