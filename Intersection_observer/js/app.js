const image_1 = document.getElementById('image-1');
const image_2 = document.getElementById('image-2');

const cargarImagen = (entradas, observador) => { /*Los argumentos los manda la clase IntersectionObserver*/
    console.log("ESTAS SON LAS ENTRADAS: ",entradas);
    console.log("ESTE ES EL OBSERVADOR: ",observador);
    entradas.forEach(entrada => {
        if(entrada.isIntersecting){
            entrada.target.classList.add('visible')
        } else{
            entrada.target.classList.remove('visible')
        }
    });
}


const observador = new IntersectionObserver(cargarImagen, {
    root: null, 
    rootMargin: '0px',
    threshold: 0.3
});


observador.observe(image_1);
observador.observe(image_2);
