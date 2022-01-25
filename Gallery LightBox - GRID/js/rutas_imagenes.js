//Rutas de imagenes para importar
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
function agregarBloquesImg(rutasImg){
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
        indiceAlt ++;
        id ++;
    });
    return arrayImg;
}

export {RUTAS_IMAGENES_SMALL, RUTAS_IMAGENES, agregarBloquesImg};