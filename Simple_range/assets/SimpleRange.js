/*
    Autor: AndrésR.Dev
    Description: Un simple range input para seleccionar un rango de datos
    Logica: identifica todos los inputs y modifica los datos del range, 
            la función updateProgressBar() actualiza los datos de los range leyendo la info guardada.
*/
const $SIMPLE_RANGE = document.querySelectorAll('.simple-range__input');
const $CONTAINER_CONTROLS = document.querySelectorAll('.simple-range__controls');

let recursiveFunction = false;  // se vuelve true cuando el mouseDown está en proceso, con UP pasa a false
let globalComposedPath = undefined;
let globalEvent = undefined;


//CONTROLA LA ADICIÓN O DISMINUCIÓN DE LOS INPUTS
function arrowControls() {
    if (recursiveFunction) {
        const CLASS_LIST = globalEvent.target.classList;
        const ARROW_UP = CLASS_LIST.contains("arrow-up");
        const ARROW_DOWN = CLASS_LIST.contains("arrow-down");
        if (ARROW_UP) {
            let valorInput = parseFloat(globalComposedPath.children[1].value) + 0.01;
            if (valorInput >= 100) {
                valorInput = 100;
            }
            valorInput = valorInput.toFixed(2);
            //RANGE
            globalComposedPath.children[0].value = valorInput;
            globalComposedPath.children[0].setAttribute('value', valorInput);
            //INPUT
            globalComposedPath.children[1].value = valorInput;
            globalComposedPath.children[1].setAttribute('value', valorInput);
        }
        if (ARROW_DOWN) {
            let valorInput = parseFloat(globalComposedPath.children[1].value) - 0.01;
            valorInput = valorInput.toFixed(2);
            if (valorInput <= 0) {
                valorInput = 0;
            }
            //RANGE
            globalComposedPath.children[0].value = valorInput;
            globalComposedPath.children[0].setAttribute('value', valorInput);
            //INPUT
            globalComposedPath.children[1].value = valorInput;
            globalComposedPath.children[1].setAttribute('value', valorInput);
        }
        setTimeout(arrowControls, 60)
    }
}


$CONTAINER_CONTROLS.forEach(element => {
    element.addEventListener('mousedown', event => {
        recursiveFunction = true;
        globalEvent = event;
        globalComposedPath = event.composedPath()[2];
        arrowControls();
    });
    element.addEventListener('mouseup', () => {
        globalComposedPath = undefined;
        globalEvent = undefined;
        recursiveFunction = false;
    });
})

$SIMPLE_RANGE.forEach(element => {
    element.addEventListener('mousemove', event => {
        event.composedPath()[1].children[1].value = event.target.value;
        event.composedPath()[1].children[1].setAttribute('value', event.target.value);
    })
    element.addEventListener('click', event => {
        event.composedPath()[1].children[1].value = event.target.value;
        event.composedPath()[1].children[1].setAttribute('value', event.target.value);
    })
})

//Llamar donde se leen/obtienen los datos del form
function updateProgressBar() {
    const $SIMPLE_INPUT_VALUES = document.querySelectorAll('.simple-range__input-values');
    const $PROGRESS_BAR = document.querySelectorAll('.simple-range__input');
    let valorInput = [];
    $SIMPLE_INPUT_VALUES.forEach(element => {
        valorInput.push(element.value)
    });
    $PROGRESS_BAR.forEach((element, index) => {
        element.value = valorInput[index];
        element.setAttribute('value', valorInput[index]);
    })
}