
//VARIABLES
let textFilter = '',
    actionInput = false;
//ELEMENTOS DOOM 
const $SIMSELECT = document.querySelectorAll('#simselect-header'),
    $SIMSELECT_OPTIONS = document.getElementById('simselect-options'),
    $SIMSELECT_INPUT = document.getElementById('simselect-input'),
    $CONTAINER_HIDDEN_SIMSELECTOR = document.querySelector('.simselect-click-hidden'),
    $SIMSELECT_FILTER = document.getElementById('simselect-filter'),
    $SIMSELECT_OPTIONS_VALUES = document.querySelectorAll('.simselect__option');
let $simselectIconDown = document.getElementById('simselect-icon-down');


//GUARDAMOS LOS VALORES DE LOS OPTIONS
function saveValuesOptions() {
    let tempValueOptions = [];
    for (const ELEMENT of $SIMSELECT_OPTIONS_VALUES) {
        const VALOR_ELEMENT = ELEMENT.getAttribute('value');
        if (VALOR_ELEMENT != '') {
            tempValueOptions.push(VALOR_ELEMENT);
        }
    }
    return tempValueOptions;
}

//FILTRAMOS VALORES EN LAS OPTIONS vs FILTRO
function filtrarDatos(arrayValues) {
    let tempValuesFilter = arrayValues.filter(element => {
        let indexSearch = element.search(textFilter);
        if (indexSearch != -1 && indexSearch === 0) {
            return element;
        }
    });
    return tempValuesFilter;
}


//TEST MULTIINPUT
function identifyInput(element) {
    const ID_INPUT = element.getAttribute('id');
    const $ELEMENT_SELECTED = document.getElementById(ID_INPUT);
    return $ELEMENT_SELECTED;
}

//ACCION PARA MOSTRAR LA CAJA DE OPCIONES
function simselectShow(event = undefined) {
    //Init: lógica para cerrar las options cuando no se da click al input
    let nameEvent = '';
    if (event !== undefined) {
        const ACTUAL_ELEMENT = identifyInput(event.target);
        nameEvent = event.target.getAttribute('name');
        if (nameEvent === 'simselect-input') {
            actionInput = !actionInput;
        }
        //Init: Fix click on icon svg or path or HEADER
        const NODE_NAME = event.target.nodeName;
        if (NODE_NAME === 'path' || NODE_NAME === 'svg' || NODE_NAME === 'HEADER') {
            actionInput = !actionInput
        }
        //Close: Fix click on icon svg or path or HEADER
    } else {
        nameEvent = event;
        actionInput = false;
    }
    //Close: lógica para cerrar las options cuando no se da click al input
    $SIMSELECT_OPTIONS.classList.toggle('simselect-hidden');
    //Encontramos nuevamente las flechas de acción por funcionamiento SVG
    $simselectIconDown = document.getElementById('simselect-icon-down');
    const $RE_SIMSELECT_ICON_UP = document.getElementById('simselect-icon-up');
    //Cambiamos estilos
    $simselectIconDown.classList.toggle('simselect-hidden');
    $RE_SIMSELECT_ICON_UP.classList.toggle('simselect-hidden');
    $SIMSELECT_FILTER.focus();
}

//ACCION PARA CAMBIAR EL VALOR SELECCIONADO
function actionOption(event) {
    const OPTION_SELECTED = event.target.getAttribute('name');
    if (OPTION_SELECTED === 'simselect__option') {
        const VALOR_OPTION = event.target.getAttribute('value');
        $SIMSELECT_INPUT.setAttribute('value', VALOR_OPTION);
        simselectShow();
    }
}

//UTILIDAD PARA ELIMINAR TODOS LOS HIJOS DE UN ELEMENT
function eliminarHijos(contenedorPadre) {
    //Eliminamos los hijos si existen
    while (contenedorPadre.firstChild) {
        contenedorPadre.removeChild(contenedorPadre.firstChild);
    }
}

//CREAMOS HIJOS A MOSTRAR
function crearHijos(valoresArray, contenedorPadre) {
    //Crear elemento seleccione
    let $firstElementArticle = document.createElement('article');
    $firstElementArticle.setAttribute('name', 'simselect__option');
    $firstElementArticle.setAttribute('class', 'simselect__option');
    $firstElementArticle.setAttribute('value', '');
    $firstElementArticle.textContent = 'Seleccione una opción';
    contenedorPadre.appendChild($firstElementArticle);
    //Creamos e insertamos los demás hijos
    for (const element of valoresArray) {
        let $elementArticle = document.createElement('article');
        $elementArticle.setAttribute('name', 'simselect__option');
        $elementArticle.setAttribute('class', 'simselect__option');
        $elementArticle.setAttribute('value', element);
        $elementArticle.textContent = element;
        contenedorPadre.appendChild($elementArticle);
    }
}

//FUNCION PRINCIPAL, LEERA LAS LETRAS INGRESADAS
function ingresoFiltro(event) {
    textFilter = $SIMSELECT_FILTER.value;
    let valoresActuales = [];  // Valores actuales options
    let valoresFiltrados = [];  // Valores filtrados options
    //Creamos array con cada uno de los valores de las opciones
    valoresActuales = [...saveValuesOptions()];
    //Validamos las coincidencias del filtro en el array de valores
    valoresFiltrados = [...filtrarDatos(valoresActuales)];
    //Creamos los nuevos elementos article con los resultados del filtro
    const $CONTAINER_OPTIONS = document.getElementById('simselect-option-container');
    if (valoresFiltrados.length > 0) {
        eliminarHijos($CONTAINER_OPTIONS);
        crearHijos(valoresFiltrados, $CONTAINER_OPTIONS);
    } else {
        eliminarHijos($CONTAINER_OPTIONS);
    }
}

//CIERRA LAS OPTIONS CUANDO SE DA CLICK FUERA DEL SELECT -- ¡UNICAMENTE PARA ACCIONAR FUERA DEL SELECT!
function cerrarOptionsInput(event) {
    const NAME_EVENT = event.target.getAttribute('name');
    const NODE_NAME = event.target.nodeName;
    if (NODE_NAME !== 'svg' && NODE_NAME !== 'HEADER' && NODE_NAME !== 'path' && NAME_EVENT !== 'simselect-input'
        && actionInput && NAME_EVENT !== 'simselect-filter' && NAME_EVENT !== 'simselect__option') {
        simselectShow();
    }
}

//ADD EVENTOS
$SIMSELECT.forEach(elementSelect => {
    elementSelect.addEventListener('click', simselectShow);
});
$SIMSELECT_OPTIONS.addEventListener('click', actionOption);
$SIMSELECT_FILTER.addEventListener('keyup', ingresoFiltro);
document.addEventListener('click', cerrarOptionsInput);