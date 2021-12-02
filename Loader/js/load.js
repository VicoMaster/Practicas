window.onload = () => {
    setTimeout(() => {
        pantalla_carga = document.getElementById('overlay-load');
        pantalla_carga.style.visibility = 'hidden';
        pantalla_carga.style.opacity = '0';
    },3000)
}