//Elementos de DOM
const overlay = document.getElementById('overlay-slider');
const carrusel = document.getElementById('carrusel-sliders');
const imgs = document.querySelectorAll(".slide img");
//Touch Events
overlay.addEventListener('touchstart', touchStart);
overlay.addEventListener('touchmove', touchMove);
overlay.addEventListener('touchend', touchEnd);
//Mouse Events
overlay.addEventListener('mousedown', touchStart);
overlay.addEventListener('mouseup', touchEnd);
overlay.addEventListener('mouseleave', touchEnd);
overlay.addEventListener('mousemove', touchMove);

//Función que deshabilita el menú contextual del clic derecho
overlay.oncontextmenu = function (event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
}

//Parametría Inicial
overlay.classList.add("cursor-grap");
let animationID = 0, //Se inicializa la variable para requestAnimationFrame
isDragging = false,
cursorMovSave = 0, //Movimiento (px) del cursor presionado en memoria
cursorNow = 0; //Movimiento (px) actual del cursor
screenIndex = 0, //Número de pantallas acumuladas
currentScreen = 0, //desplazamiento actual en la pantalla
prevTraslate = 0; //movimiento el cursor en memoria
const products = carrusel.childElementCount; //Cantidad de productos(slides) en el html

//Traza en consola
function print(event = '', message = "No message") {
    console.log(`TRAZA - evento: ${event.type} | ${message}`);
}

//Función visual para el cursor grabbing
function addGrabbing() {
    overlay.classList.remove("cursor-grap");
    overlay.classList.add("cursor-grabbing");
    //Scale on imgs
    imgs.forEach((img) => {
        img.classList.add("img-scale");
    })
}
//Función visual para restablecer cursor sin grabbing
function removeGrabbing() {
    overlay.classList.remove("cursor-grabbing");
    overlay.classList.add("cursor-grap");
    //Scale on imgs
    imgs.forEach((img) => {
        img.classList.remove("img-scale");
    })
}

//Función recursiva para requestAnimationFrame
function animation() {
    moveSlider()
    if (isDragging) requestAnimationFrame(animation)
}

//Función para mover la pantalla - debe ser llamada con requestAnimationFrame
function moveSlider() {
    carrusel.style.transform = `translateX(${cursorMovSave}px)`;
}

//Función para mover la pantalla dependiendo del index
function setPositionByIndex() {
    currentScreen = screenIndex * -window.innerWidth;
    prevTraslate = currentScreen;
    //print('', "cursorMovSave: "+cursorMovSave+" prevTraslate: " + prevTraslate)
    cursorMovSave = currentScreen;
    moveSlider();
}

//Función para obtener la posición del cursor
function getCursorPositionX(event) {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}

//Eventos de interacción
function touchStart(event) {
    addGrabbing();
    isDragging = true;
    initialCursor = getCursorPositionX(event);
    //print(event, "MovX: " + getCursorPositionX(event));
    animationID = requestAnimationFrame(animation);
}
function touchEnd(event) {
    if (isDragging) {
        isDragging = false;
        initialCursor = 0;
        cancelAnimationFrame(animationID);
        removeGrabbing();

        //Guarda el movimiento de la pantalla actual si el mov minimo se cumple
        //print(event, "cursorNow: "+cursorNow);
        if (cursorNow > 100 && screenIndex > 0) {
            screenIndex -= 1;
        }
        if (cursorNow < -100 && screenIndex < products-1) {
            screenIndex += 1;
        }
        //print(event, "Index: " + screenIndex);
        setPositionByIndex()
    }
}
function touchMove(event) {
    if (isDragging) {
        const cursorMov = getCursorPositionX(event);
        cursorNow = cursorMov - initialCursor;
        cursorMovSave = prevTraslate + cursorMov - initialCursor;
        //print(event, "CursorMovSave: " + cursorMovSave);
    }
}

