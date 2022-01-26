/** 
 * Developer: Andrés F. Rivera 
 * Description: Script para agregar imagenes al carrusel
 * Observations: No se necesita poner algun nombre en especial
 * Comments: Tamaño imgs [Small: 640*480] [Medium/High: 1920*1440] aproximadamente
 * Comments: El orden de las imagenes para cada arreglo debe respetarse [1-small = 1]
 **/

const NOMBRE_IMAGEN_DESCARGAR = 'Imagen-Gallery-';

const RUTAS_IMAGENES_SMALL = [
    "img/img1_small.webp",
    "img/img2_small.webp",
    "img/img3_small.webp",
    "img/img4_small.webp",
    "img/img5_small.webp",
    "img/img6_small.webp",
    "img/img7_small.webp",
    "img/img8_small.webp",
    "img/img9_small.webp"
];

const RUTAS_IMAGENES = [
    "img/img1.webp",
    "img/img2.webp",
    "img/img3.webp",
    "img/img4.webp",
    "img/img5.webp",
    "img/img6.webp",
    "img/img7.webp",
    "img/img8.webp",
    "img/img9.webp"
];

//Devuelve un arreglo de imagenes con las rutas de argumento
function agregarBloquesImg(rutasImg) {
    let arrayImg = [],
        indiceAlt = 1,
        id = 0;
    rutasImg.forEach(ruta => {
        let atributoAlt = `Imagen de Gallería ${indiceAlt}`,
            img = document.createElement('img');
        img.src = ruta;
        img.alt = atributoAlt;
        img.id = id;
        arrayImg.push(img);
        indiceAlt++;
        id++;
    });
    return arrayImg;
}

export { RUTAS_IMAGENES_SMALL, RUTAS_IMAGENES, NOMBRE_IMAGEN_DESCARGAR, agregarBloquesImg };