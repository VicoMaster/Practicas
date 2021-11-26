const pantalla = document.getElementById('container-clic');
const check = document.getElementById('btn-menu');
pantalla.addEventListener('click', ()=> {
    check.checked = false;
});