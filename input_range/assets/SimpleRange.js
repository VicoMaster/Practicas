/*
    Autor: AndrésR.Dev
    Description: Un simple range input para seleccionar un rango de datos
*/
const $SIMPLE_RANGE = document.querySelectorAll('.simple-range__input');
const $CONTAINER_CONTROLS = document.querySelectorAll('.simple-range__controls');


$SIMPLE_RANGE.forEach(element => {
    element.addEventListener('mousemove', event => {
        event.composedPath()[1].children[1].value = event.target.value;
        event.composedPath()[1].children[1].setAttribute('value', event.target.value);
    })
})

$CONTAINER_CONTROLS.forEach(element => {
    element.addEventListener('click', event => {
        const CLASS_LIST = event.target.classList;
        const ARROW_UP = CLASS_LIST.contains("arrow-up");
        const ARROW_DOWN = CLASS_LIST.contains("arrow-down");
        if (ARROW_UP) {
            let valorInput = parseInt((event.composedPath()[2].children[1].value), 10) + 1;
            if (valorInput >= 100) {
                valorInput = 100;
            }
            //RANGE
            event.composedPath()[2].children[0].value = valorInput;
            event.composedPath()[2].children[0].setAttribute('value', valorInput);
            //INPUT
            event.composedPath()[2].children[1].value = valorInput;
            event.composedPath()[2].children[1].setAttribute('value', valorInput);
        }
        if (ARROW_DOWN) {
            let valorInput = parseInt((event.composedPath()[2].children[1].value), 10) - 1;
            if (valorInput <= 0) {
                valorInput = 0;
            }
            //RANGE
            event.composedPath()[2].children[0].value = valorInput;
            event.composedPath()[2].children[0].setAttribute('value', valorInput);
            //INPUT
            event.composedPath()[2].children[1].value = valorInput;
            event.composedPath()[2].children[1].setAttribute('value', valorInput);
        }
    })
})

