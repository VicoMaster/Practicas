const menu = document.getElementById('menu');
const indicador = document.getElementById('indicador');
const secciones = document.querySelectorAll('.section');

// Con la linea de abajo se obtiene el width del elemento seleccionado
let tamanno_indicador = menu.querySelector('a').offsetWidth;
console.log(tamanno_indicador + 'px');
indicador.style.width = tamanno_indicador + 'px';


// variable para transformar la lista[list] de secciones a un arreglo[array]
let active_section;

//Observador
const observer = new IntersectionObserver(entradas => {
    entradas.forEach(entrada => {
        active_section = [...secciones].indexOf(entrada.target)
        if (entrada.isIntersecting) {
            indicador.style.transform = `translateX(${(tamanno_indicador-1) * active_section}px)`;
        } else {
            if (active_section == 0) {
                if (entrada.intersectionRect.top > 80) {
                    indicador.style.transform = `translateX(-100%)`;
                }
            }
        }
    });
}, {
    root: null,
    rootMargin: '-80px 0px 0px 0px',
    threshold: 0.2
});

// Asignamos un observador a cada una de las secciones

secciones.forEach(section => observer.observe(section));