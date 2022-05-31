
//VARIABLES
let textFilter = '',  // texto ingresado usado para filtrar resultados
    valoresOriginalsOptions = [],  // Valores de los options actuales, SE DEBE REINICIAR al cerrar simselect.
    dataSimselectIndex = 0;  // Index del elemento actual seleccionado, si cambia se reinicia valoresOriginalsOptions

//ELEMENTOS DOOM 
const $SIMSELECT = document.querySelectorAll('#simselect-header'),
    $SIMSELECT_OPTIONS = document.querySelectorAll('#simselect-options'),
    $SIMSELECT_INPUT = document.getElementById('simselect-input'),
    $SIMSELECT_FILTER = document.querySelectorAll('#simselect-filter'),
    $SIMSELECT_OPTIONS_VALUES = document.querySelectorAll('.simselect__option');
let $simselectIconDown = document.getElementById('simselect-icon-down');
let elementosActuales = {};  // Guarda los elementos target actuales


//GUARDAMOS LOS VALORES DE LOS OPTIONS y RETORNAMOS ARRAY DE VALORES
function saveReturnValues(elementos) {
    let tempValueOptions = [];
    if (valoresOriginalsOptions.length <= 0) {
        valoresOriginalsOptions = [...elementos];
    }
    for (const ELEMENT of valoresOriginalsOptions) {
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
        const REGEX = new RegExp(textFilter, 'gi');
        let indexSearch = element.search(REGEX);
        if (indexSearch != -1 && indexSearch === 0) {
            return element;
        }
    });
    return tempValuesFilter;
}

//ENCONTRAMOS LOS ELEMENTOS ACTUALES PARA MULTI-INPUT | si es nuevo cierra el anterior
function identifyInput(element) {
    const ELEMENTOS_DOM = {}
    const PATH = element.composedPath();
    PATH.forEach(element => {
        if (element !== document && element !== window && element.nodeName !== 'BODY' && element.nodeName !== 'HTML') {
            if (element.getAttribute('class') === 'simselect') {
                ELEMENTOS_DOM.main = element;
                ELEMENTOS_DOM.header = element.children[0];
                ELEMENTOS_DOM.sectionOptions = element.children[1];
                //Si el elemento main es diferente al anterior vacía los valoresOriginalsOptions
                if (dataSimselectIndex === 0) {
                    dataSimselectIndex = element.getAttribute('data-simselect-index');
                }
                if (dataSimselectIndex !== element.getAttribute('data-simselect-index')) {
                    dataSimselectIndex = element.getAttribute('data-simselect-index');
                    const HIDDEN_CLASS = elementosActuales.sectionOptions.getAttribute('class').includes('simselect-hidden');
                    if (!HIDDEN_CLASS) {
                        showClose(elementosActuales);
                    }
                    valoresOriginalsOptions = [];
                }
            }
        }
    })
    return ELEMENTOS_DOM;
}

//Vuelve a llenar las options con sus valores originales
function resetValuesOptions() {
    const $CONTAINER_OPTIONS = elementosActuales.sectionOptions.children[1];
    eliminarHijos($CONTAINER_OPTIONS);
    valoresActuales = [...saveReturnValues(valoresOriginalsOptions)];
    crearHijos(valoresActuales, $CONTAINER_OPTIONS);
    elementosActuales.sectionOptions.children[0].value = '';
}

function showClose(elementosDom) {
    elementosDom.sectionOptions.classList.toggle('simselect-hidden');
    //Encontramos nuevamente las flechas de acción por funcionamiento SVG
    $simselectIconDown = elementosDom.header.children[1];
    const $RE_SIMSELECT_ICON_UP = elementosDom.header.children[2];
    //Cambiamos estilos
    $simselectIconDown.classList.toggle('simselect-hidden');
    $RE_SIMSELECT_ICON_UP.classList.toggle('simselect-hidden');
    elementosDom.sectionOptions.children[0].focus();
    //Si existe una copia de los valores los restablece al cerrar
    if (valoresOriginalsOptions.length > 0) {
        resetValuesOptions();
    }
}

//ACCION PARA MOSTRAR LA CAJA DE OPCIONES
function simselectInit(event = undefined) {
    if (event !== undefined) {
        let temp = identifyInput(event);
        elementosActuales = { ...temp };
        nameEvent = elementosActuales.header.children[0].getAttribute('name');
        const NODE_NAME = event.target.nodeName;
        if (nameEvent === 'simselect-input' || (NODE_NAME === 'path' || NODE_NAME === 'svg' || NODE_NAME === 'HEADER')) {
            showClose(elementosActuales);
        }
    }
}

//ACCION PARA CAMBIAR EL VALOR SELECCIONADO
function actionOption(event) {
    const OPTION_SELECTED = event.target.getAttribute('name');
    if (OPTION_SELECTED === 'simselect__option') {
        const VALOR_OPTION = event.target.getAttribute('value');
        elementosActuales.header.children[0].setAttribute('value', VALOR_OPTION);
        elementosActuales.sectionOptions.children[0].value = '';
        showClose(elementosActuales);
        //Si existe una copia de los valores los restablece al cerrar
        if (valoresOriginalsOptions.length > 0) {
            resetValuesOptions();
        }
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
function ingresoFiltro() {
    textFilter = elementosActuales.sectionOptions.children[0].value;
    let valoresActuales = [];  // Valores actuales options
    let valoresFiltrados = [];  // Valores filtrados options
    //Creamos array con cada uno de los valores de las opciones
    valoresActuales = [...saveReturnValues(elementosActuales.sectionOptions.children[1].children)];
    //Validamos las coincidencias del filtro en el array de valores
    valoresFiltrados = [...filtrarDatos(valoresActuales)];
    //Creamos los nuevos elementos article con los resultados del filtro
    const $CONTAINER_OPTIONS = elementosActuales.sectionOptions.children[1];
    if (valoresFiltrados.length > 0) {
        eliminarHijos($CONTAINER_OPTIONS);
        crearHijos(valoresFiltrados, $CONTAINER_OPTIONS);
    } else {
        eliminarHijos($CONTAINER_OPTIONS);
    }
}

//CIERRA LAS OPTIONS CUANDO SE DA CLICK FUERA DEL SELECT -- ¡UNICAMENTE PARA ACCIONAR FUERA DEL SELECT!
function cerrarOptionsInput(event) {
    if (Object.keys(elementosActuales).length > 0) {
        const HIDDEN_CLASS = elementosActuales.sectionOptions.getAttribute('class').includes('simselect-hidden');
        if (!HIDDEN_CLASS) {
            const NAME_EVENT = event.target.getAttribute('name');
            const NODE_NAME = event.target.nodeName;
            if (NODE_NAME !== 'svg' && NODE_NAME !== 'HEADER' && NODE_NAME !== 'path' && NAME_EVENT !== 'simselect-input'
                && NAME_EVENT !== 'simselect-filter' && NAME_EVENT !== 'simselect__option') {
                showClose(elementosActuales);
            }
        }
    }
}

//ADD EVENTOS
$SIMSELECT.forEach(elementSelect => {
    elementSelect.addEventListener('click', simselectInit);
});
$SIMSELECT_OPTIONS.forEach(elementContainerOption => {
    elementContainerOption.addEventListener('click', actionOption);
})
$SIMSELECT_FILTER.forEach(elementInputFilter => {
    elementInputFilter.addEventListener('keyup', ingresoFiltro);
})
document.addEventListener('click', cerrarOptionsInput);