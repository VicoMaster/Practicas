
//VARIABLES
let textFilter = '';

//ELEMENTOS DOOM 
const $SIMSELECT = document.getElementById('simselect-header'),
    $SIMSELECT_OPTIONS = document.getElementById('simselect-options'),
    $SIMSELECT_INPUT = document.getElementById('simselect-input'),
    $CONTAINER_HIDDEN_SIMSELECTOR = document.querySelector('.simselect-click-hidden'),
    $SIMSELECT_FILTER = document.getElementById('simselect-filter'),
    $SIMSELECT_OPTIONS_VALUES = document.querySelectorAll('.simselect__option');


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
    let tempValuesFilter = [];
    for (const element of arrayValues) {
        let indexSearch = element.search(textFilter);
        if (indexSearch != -1 && indexSearch === 0) {
            tempValuesFilter.push(element);
        }
    }
    return tempValuesFilter;
}

//ACCION PARA MOSTRAR LA CAJA DE OPCIONES
function simselectShow() {
    $SIMSELECT_OPTIONS.classList.toggle('simselect-hidden');
    const $SIMSELECT_ICON_UP = document.getElementById('simselect-icon-up'),
        $SIMSELECT_ICON_DOWN = document.getElementById('simselect-icon-down');
    $SIMSELECT_ICON_DOWN.classList.toggle('simselect-hidden');
    $SIMSELECT_ICON_UP.classList.toggle('simselect-hidden');
    $SIMSELECT_FILTER.focus();
}

//ACCION PARA CAMBIAR EL VALOR SELECCIONADO
function actionOption(event) {
    const OPTION_SELECTED = event.target.getAttribute('name');
    if (OPTION_SELECTED === 'simselect__option') {
        $SIMSELECT_INPUT.setAttribute('value', event.target.getAttribute('value'));
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
    for (const element of valoresArray) {
        let $ELEMENT_ARTICLE = document.createElement('article');
        $ELEMENT_ARTICLE.setAttribute('name', 'simselect__option');
        $ELEMENT_ARTICLE.setAttribute('class', 'simselect__option');
        $ELEMENT_ARTICLE.setAttribute('value', element);
        $ELEMENT_ARTICLE.textContent = element;
        contenedorPadre.appendChild($ELEMENT_ARTICLE);
    }
}

//FUNCION PRINCIPAL, LEERA LAS LETRAS INGRESADAS
function ingresoFiltro(event) {
    textFilter += event.key;
    console.log(textFilter);
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

//REMUEVE LA ULTIMA LETRA EN TEXTO GUARDADO
function removeFiltro(event) {
    if (event.key === 'Backspace') {
        textFilter = textFilter.slice(0, -1);
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
}

//ADD EVENTOS
$SIMSELECT.addEventListener('click', simselectShow);
$SIMSELECT_OPTIONS.addEventListener('click', actionOption);
$SIMSELECT_FILTER.addEventListener('keypress', ingresoFiltro);
$SIMSELECT_FILTER.addEventListener('keydown', removeFiltro);