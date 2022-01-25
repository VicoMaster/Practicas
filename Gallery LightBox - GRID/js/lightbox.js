import { RUTAS_IMAGENES, RUTAS_IMAGENES_SMALL, agregarBloquesImg } from './rutas_imagenes.js';

//Componentes
let botonCerrar = document.getElementById('lightbox-button-close'),
    overlay = document.getElementById('lightbox-overlay'),
    centralImg = document.getElementById('img-overlay'),
    imagenesGallery = document.getElementById('lightbox-gallery'),
    imagenesCarruselFooter = document.getElementById('lightbox-footer'),
    botonDescarga = document.getElementById('button-download'),
    botonRight = document.getElementById('button-right'),
    botonLeft = document.getElementById('button-left'),
    lightboxResult1 = document.getElementById('lightbox_result1'),
    lightboxResult2 = document.getElementById('lightbox_result2');


//Carga de bloques en HTML
const BLOQUES_GALLERY_SMALL = agregarBloquesImg(RUTAS_IMAGENES_SMALL);
BLOQUES_GALLERY_SMALL.forEach(elemento => {
    imagenesGallery.appendChild(elemento);
})
const BLOQUES_CARRUSEL_SMALL = agregarBloquesImg(RUTAS_IMAGENES_SMALL);
BLOQUES_CARRUSEL_SMALL.forEach(elemento => {
    imagenesCarruselFooter.appendChild(elemento);
})
lightboxResult2.innerText = RUTAS_IMAGENES.length;

//Variables Globales
let indexImgSelecterFooter = null,
    nombreImagen = "Imagen-Gallery-";

//Funciones
function changeNameImg(indexName) {
    return `${nombreImagen}${indexName + 1}`;
}

function imgDownload(rutaImg, nameImg) {
    botonDescarga.href = rutaImg;
    botonDescarga.download = nameImg;
}

function encontrarIndiceImagen(rutaAbuscar) {
    return RUTAS_IMAGENES.indexOf(rutaAbuscar);
}

function selecImgFooter(indexImgFooter) {
    imagenesCarruselFooter.children[indexImgFooter].classList.add('lightbox-footer--selected');
}

function removeSelectedFooter(indexImgFooter) {
    imagenesCarruselFooter.children[indexImgFooter].classList.remove('lightbox-footer--selected');
}

function paginationCounter(retroceder) {
    if (retroceder) {
        lightboxResult1.innerText = indexImgSelecterFooter >= 0
            ? ((indexImgSelecterFooter + 2) - 1) : RUTAS_IMAGENES.length;
    } else {
        lightboxResult1.innerText = indexImgSelecterFooter < (RUTAS_IMAGENES.length)
            ? (indexImgSelecterFooter + 1) : 1;
    }
    lightboxResult2.innerText = RUTAS_IMAGENES.length;
}

function abrirOverlay(event) {
    const NOMBRE_ELEMENTO = event.target.localName;
    if (NOMBRE_ELEMENTO === 'img') {
        //Remplazamos imagen central y datos de descarga
        centralImg.src = RUTAS_IMAGENES[event.target.id];
        centralImg.style.opacity = '1';
        //Abrimos el Overlay de la imagen central
        overlay.classList.remove('lightbox-overlay--hidden');
        overlay.classList.add('lightbox-overlay--show');
        //Clase CSS seleccionado para imagen carrusel
        indexImgSelecterFooter = encontrarIndiceImagen(RUTAS_IMAGENES[event.target.id]);
        lightboxResult1.innerText = (indexImgSelecterFooter + 1);
        selecImgFooter(indexImgSelecterFooter);
        imgDownload(RUTAS_IMAGENES[event.target.id], changeNameImg(indexImgSelecterFooter));
    }
}

function cerrarOverlay() {
    centralImg.style.opacity = '0';
    centralImg.src = "";
    removeSelectedFooter(indexImgSelecterFooter);
    overlay.classList.remove('lightbox-overlay--show');
    overlay.classList.add('lightbox-overlay--hidden');
}

function avanzarImagen() {
    let indexNextImg = indexImgSelecterFooter < (RUTAS_IMAGENES.length - 1)
        ? (indexImgSelecterFooter + 1) : 0;
    removeSelectedFooter(indexImgSelecterFooter);
    indexImgSelecterFooter = indexNextImg;
    selecImgFooter(indexImgSelecterFooter);
    centralImg.src = RUTAS_IMAGENES[indexImgSelecterFooter];
    imgDownload(RUTAS_IMAGENES[indexImgSelecterFooter], changeNameImg(indexImgSelecterFooter));
    paginationCounter(false);
}

function retrocederImagen() {
    let indexBackImg = indexImgSelecterFooter > 0
        ? (indexImgSelecterFooter - 1) : RUTAS_IMAGENES.length - 1;
    removeSelectedFooter(indexImgSelecterFooter);
    indexImgSelecterFooter = indexBackImg;
    selecImgFooter(indexImgSelecterFooter);
    centralImg.src = RUTAS_IMAGENES[indexImgSelecterFooter];
    imgDownload(RUTAS_IMAGENES[indexImgSelecterFooter], changeNameImg(indexImgSelecterFooter));
    paginationCounter(true);
}

function cambiarImagenCentral(event) {
    const NOMBRE_ELEMENTO = event.target.localName;
    if (NOMBRE_ELEMENTO === "img") {
        removeSelectedFooter(indexImgSelecterFooter);
        indexImgSelecterFooter = encontrarIndiceImagen(RUTAS_IMAGENES[event.target.id]);
        centralImg.src = RUTAS_IMAGENES[indexImgSelecterFooter];
        selecImgFooter(indexImgSelecterFooter);
        imgDownload(RUTAS_IMAGENES[indexImgSelecterFooter], changeNameImg(indexImgSelecterFooter));
        lightboxResult1.innerText = (indexImgSelecterFooter + 1);
    }
}

function print(texto) {
    console.log(texto);
}

//Eventos
imagenesGallery.addEventListener('click', abrirOverlay);
botonCerrar.addEventListener('click', cerrarOverlay);
botonRight.addEventListener('click', avanzarImagen);
botonLeft.addEventListener('click', retrocederImagen);
imagenesCarruselFooter.addEventListener('click', cambiarImagenCentral);