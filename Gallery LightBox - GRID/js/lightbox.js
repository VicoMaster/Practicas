//Componentes
let botonCerrar = document.getElementById('lightbox-button-close'),
    overlay = document.getElementById('lightbox-overlay'),
    centralImg = document.getElementById('img-overlay'),
    imagenesGallery = document.getElementById('lightbox-gallery'),
    botonDescarga = document.getElementById('button-download');

//Parametros
let rutaImagenDescarga = '',
    nombreImagenDescarga = '';

//Funciones
function abrirOverlay(event) {
    const NOMBRE_ELEMENTO = event.target.localName;
    if (NOMBRE_ELEMENTO === 'img') {
        let rutaImagen = event.target.src;
        let divideRuta = rutaImagen.split('/img/', 2);
        let rescataImagen = divideRuta[1].split('_small', 2);
        nombreImagenDescarga = rescataImagen[0];
        let nuevaRutaImagen = `img/${rescataImagen[0]}${rescataImagen[1]}`
        rutaImagenDescarga = nuevaRutaImagen;
        centralImg.src = nuevaRutaImagen;
        botonDescarga.href = rutaImagenDescarga;
        botonDescarga.download = nombreImagenDescarga;
        overlay.classList.remove('lightbox-overlay--hidden');
        overlay.classList.add('lightbox-overlay--show');
    }
}

function cerrarOverlay() {
    overlay.classList.remove('lightbox-overlay--show');
    overlay.classList.add('lightbox-overlay--hidden');
}

function descargarImagen() {
    console.log(`${rutaImagenDescarga} | ${nombreImagenDescarga}`);
    botonDescarga.href = rutaImagenDescarga;
    botonDescarga.download = nombreImagenDescarga;
}

//Eventos
imagenesGallery.addEventListener('click', abrirOverlay);
botonCerrar.addEventListener('click', cerrarOverlay);