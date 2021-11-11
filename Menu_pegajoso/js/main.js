const menu = document.getElementById('menu');
const indicador = document.getElementById('indicador');
const secciones = document.querySelectorAll('.section');

// Con la linea de abajo se obtiene el width del elemento seleccionado
let tamanno_indicador = menu.querySelector('a').offsetWidth;
console.log(tamanno_indicador+'px');
indicador.style.width = tamanno_indicador + 'px';




