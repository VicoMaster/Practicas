/*
    Autor: AndrésR.Dev 
    Description: Siguiendo la estructura html creada[FIJA] identificará cada componente main para ubicar las acciones
    Comments: Creado para sustituir las etiquetas [SELECT] que no ofrecen comodidad al usuario.

*/


//VARIABLES
let textFilter = '',  // texto ingresado usado para filtrar resultados
    valoresOriginalsOptions = [],  // Elementos DOM [article] actuales, SE REINICIA al cambiar de simselect.
    dataSimselectIndex = 0,  // Index del elemento actual seleccionado, si cambia se reinicia valoresOriginalsOptions
    testValores = {},  // test para guardar los valores y textContent de los article
    contKeyArrow = 0, // Añade o disminuye dependiendo de la flecha de navegación usada
    accessKey = false; // SI es True activará la recolección del valor de [ARTICLE] focuseado por flechas de teclado


//ELEMENTOS DOOM 
const $SIMSELECT = document.querySelectorAll('.simselect-header'),
    $SIMSELECT_OPTIONS = document.querySelectorAll('.simselect-options'),
    $SIMSELECT_INPUT = document.querySelector('.simselect-input'),
    $SIMSELECT_FILTER = document.querySelectorAll('.simselect-filter'),
    $SIMSELECT_OPTIONS_VALUES = document.querySelectorAll('.simselect__option');
let $simselectIconDown = undefined;  // Icono de flecha abajo actual
let $iconClearInputFiltro = undefined;  // Icono X clear Input actual 
let $iconSearchInputFiltro = undefined;  // Icono Lupa en Input actual 
let elementosActuales = {};  // Guarda los elementos target(DOM elements) actuales


//GUARDAMOS LOS VALORES DE LOS OPTIONS y RETORNAMOS ARRAY DE VALORES DE LOS ARTICLE
function saveReturnValues(elementosArticle) {
    let tempValueOptions = [];
    if (valoresOriginalsOptions.length <= 0) {
        valoresOriginalsOptions = [...elementosArticle];
    }
    for (const ELEMENT of valoresOriginalsOptions) {
        const VALOR_ELEMENT = ELEMENT.getAttribute('value');
        if (VALOR_ELEMENT != '') {
            tempValueOptions.push(VALOR_ELEMENT);
            testValores[`"${ELEMENT.textContent}"`] = VALOR_ELEMENT;
        }
    }
    return tempValueOptions;
}

//FILTRAMOS VALORES EN LAS OPTIONS vs FILTRO
function filtrarDatos(arrayValues) {
    navegationKeys();
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
                    testValores = {};
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
    let valoresActuales = [...saveReturnValues(valoresOriginalsOptions)];
    crearHijos(valoresActuales, $CONTAINER_OPTIONS);
    elementosActuales.sectionOptions.children[0].children[0].value = '';
}

//Se llama cuando se necesita cerrar la caja de opciones y reiniciar todo
function showClose(elementosDom) {
    elementosDom.sectionOptions.classList.toggle('simselect-hidden');
    //Si la caja de opciones está oculta mandamos focus al header
    if (elementosDom.sectionOptions.classList.contains('simselect-hidden')) {
        directHeader();
        navegationKeys();
    }
    elementosDom.header.classList.toggle('border-focus');
    //Encontramos nuevamente las flechas de acción por funcionamiento SVG
    $simselectIconDown = elementosDom.header.children[1];
    const $RE_SIMSELECT_ICON_UP = elementosDom.header.children[2];
    //Cambiamos estilos
    $simselectIconDown.classList.toggle('simselect-hidden');
    $RE_SIMSELECT_ICON_UP.classList.toggle('simselect-hidden');
    elementosDom.sectionOptions.children[0].children[0].focus();
    //Si existe una copia de los valores los restablece al cerrar
    if (valoresOriginalsOptions.length > 0) {
        resetValuesOptions();
    }
}

//Navegación con flechas del teclado
function navegationKeys(event = undefined) {
    if (event !== undefined) {
        //elementosActuales.sectionOptions.children[1].children[3].classList.add('border-focus');
        elementosActuales.sectionOptions.children[1].children[contKeyArrow].classList.remove('border-focus');
        contKeyArrow += (event.code === 'ArrowDown' || event.code === 'ArrowRight')
            ? (contKeyArrow < elementosActuales.sectionOptions.children[1].children.length - 1) ? 1 : 0
            : (contKeyArrow > 0) ? -1 : 0;
        elementosActuales.sectionOptions.children[1].children[contKeyArrow].classList.add('border-focus');
        accessKey = true;
    } else {
        //Reiniciamos la interacción con las flechas del teclado
        if (contKeyArrow >= 0) {
            elementosActuales.sectionOptions.children[1].children[contKeyArrow].classList.remove('border-focus');
            contKeyArrow = 0;
            accessKey = false;
        }
    }
}

//Limpia el input de filtro y reinicia los datos
function clearFiltro() {
    elementosActuales.sectionOptions.children[0].children[0].value = '';
    elementosActuales.sectionOptions.children[0].children[0].focus();
    //Si existe una copia de los valores los restablece al cerrar
    if (valoresOriginalsOptions.length > 0) {
        resetValuesOptions();
    }
}

//Redirecciona al input Filter
function directInput() {
    elementosActuales.sectionOptions.children[0].children[0].focus();
}

//Redirecciona al main
function directHeader() {
    elementosActuales.header.focus();
}

//ACCION PARA MOSTRAR-OCULTAR LA CAJA DE OPCIONES
function simselectInit(event = undefined) {
    if (event !== undefined) {
        //identificamos los elementos actuales
        let temp = identifyInput(event);
        elementosActuales = { ...temp };
        //Añadimos evento clearInput al icono de flecha en el input y a la lupa
        if ($iconClearInputFiltro === undefined) {
            $iconClearInputFiltro = elementosActuales.sectionOptions.children[0].children[2].children[0];
            $iconClearInputFiltro.addEventListener('click', clearFiltro);
            $iconSearchInputFiltro = elementosActuales.sectionOptions.children[0].children[1].children[0];
            $iconSearchInputFiltro.addEventListener('click', directInput);
        } else {
            $iconClearInputFiltro.removeEventListener('click', clearFiltro);
            $iconClearInputFiltro = elementosActuales.sectionOptions.children[0].children[2].children[0];
            $iconClearInputFiltro.addEventListener('click', clearFiltro);
            $iconSearchInputFiltro.removeEventListener('click', directInput);
            $iconSearchInputFiltro = elementosActuales.sectionOptions.children[0].children[1].children[0];
            $iconSearchInputFiltro.addEventListener('click', directInput);
        }
        //Cerramos la caja de opciones dependiendo del componente
        nameEvent = elementosActuales.header.children[0].getAttribute('class').includes('simselect-input');
        const NODE_NAME = event.target.nodeName;
        if (nameEvent || (NODE_NAME === 'path' || NODE_NAME === 'svg' || NODE_NAME === 'HEADER')) {
            showClose(elementosActuales);
        }
    }
}

//ACCION PARA CAMBIAR EL VALOR SELECCIONADO EN LOS ARTICLE
function actionOption(event) {
    const VALID_KEYS = ['Space', 'Enter', 'NumpadEnter'];
    //Si detecta TAB reiniciamos lógica de flechas del teclado
    if (event.code === 'Tab') {
        navegationKeys();
    }
    //Lógica para seleccionar option por medio de clic o VALID_KEYS
    if (VALID_KEYS.includes(event.code) || event.type === 'click') {
        const COMPONENTES_INVALIDOS = ['path', 'INPUT', 'svg'];
        if (!COMPONENTES_INVALIDOS.includes(event.target.nodeName)) {
            const OPTION_SELECTED = event.target.getAttribute('class').includes('simselect__option');;
            if (OPTION_SELECTED) {
                const VALOR_OPTION = event.target.getAttribute('value');
                elementosActuales.header.children[0].value = VALOR_OPTION;
                elementosActuales.header.children[0].setAttribute('value', VALOR_OPTION);
                elementosActuales.sectionOptions.children[0].children[0].value = '';
                showClose(elementosActuales);
                //Si existe una copia de los valores los restablece al cerrar
                if (valoresOriginalsOptions.length > 0) {
                    resetValuesOptions();
                }
            }
        }
    } else if (event.code === 'Escape') {
        directHeader();
        showClose(elementosActuales);
    }

    //Si está seleccionado una opcion con las flechas recoge su valor
    if (accessKey && VALID_KEYS.includes(event.code)) {
        const VALOR_OPTION = elementosActuales.sectionOptions.children[1].children[contKeyArrow].getAttribute('value');
        elementosActuales.header.children[0].value = VALOR_OPTION;
        elementosActuales.header.children[0].setAttribute('value', VALOR_OPTION);
        elementosActuales.sectionOptions.children[0].children[0].value = '';
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
    $firstElementArticle.setAttribute('class', 'simselect__option');
    $firstElementArticle.setAttribute('value', '');
    $firstElementArticle.textContent = 'Seleccione una opción';
    contenedorPadre.appendChild($firstElementArticle);
    //Creamos e insertamos los demás hijos
    for (const element of valoresArray) {
        let $elementArticle = document.createElement('article');
        $elementArticle.setAttribute('class', 'simselect__option');
        $elementArticle.setAttribute('value', element);
        $elementArticle.setAttribute('tabindex', '0');
        $elementArticle.textContent = element;
        contenedorPadre.appendChild($elementArticle);
    }
}

//Cuando no existen coincidencias en filtro crea hijo NODATA
function noDataElement($CONTAINER = undefined) {
    let $noData = document.createElement('p');
    $noData.setAttribute('class', 'noData noSelect');
    $noData.textContent = `No hay coincidencias para "${textFilter}"`;
    $CONTAINER.appendChild($noData);
    $noData.addEventListener('click', event => {
        elementosActuales.sectionOptions.children[0].children[0].focus();
    });
}

//FUNCION PRINCIPAL, LEERA LAS LETRAS INGRESADAS
function ingresoFiltro(event) {
    const VALID_KEYS = ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown']
    if (VALID_KEYS.includes(event.code)) {
        navegationKeys(event);
    } else {
        const INVALID_KEYS = ['Enter', 'NumpadEnter']
        if (!INVALID_KEYS.includes(event.code)) {
            textFilter = elementosActuales.sectionOptions.children[0].children[0].value;
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
                //Crear elemento no data
                noDataElement($CONTAINER_OPTIONS);
            }
        }
    }
}

//CIERRA LAS OPTIONS CUANDO SE DA CLICK FUERA DEL SELECT -- ¡UNICAMENTE PARA ACCIONAR FUERA DEL SELECT!
function cerrarOptionsInput(event) {
    if (Object.keys(elementosActuales).length > 0) {
        const HIDDEN_CLASS = elementosActuales.sectionOptions.getAttribute('class').includes('simselect-hidden');
        let nameEvent = false;
        if (!HIDDEN_CLASS) {
            const INCLUDES_CLASS = ['simselect-input', 'simselect-filter', 'simselect__option', 'noData'];
            INCLUDES_CLASS.forEach(element => {
                let containClass = event.target.getAttribute('class');
                if (containClass !== null) {
                    containClass = containClass.includes(element);
                    if (containClass) {
                        nameEvent = true;
                    }
                }
            });
            const NODE_NAME = event.target.nodeName;
            if (NODE_NAME !== 'svg' && NODE_NAME !== 'HEADER' && NODE_NAME !== 'path' && !nameEvent) {
                showClose(elementosActuales);
            }
        }
    }
}

//Abre los simSelects dependiendo de la tecla
function detectKey(event = undefined) {
    const VALID_KEYS = ['Space', 'Enter', 'NumpadEnter', 'ArrowDown'];
    if (event !== undefined) {
        if (VALID_KEYS.includes(event.code)) {
            simselectInit(event);
        }
    }
}

//ADD EVENTOS
$SIMSELECT.forEach(elementSelect => {
    elementSelect.addEventListener('click', simselectInit);
    elementSelect.addEventListener('keyup', detectKey);
});
$SIMSELECT_OPTIONS.forEach(elementContainerOption => {
    elementContainerOption.addEventListener('click', actionOption);
    elementContainerOption.addEventListener('keyup', actionOption);
})
$SIMSELECT_FILTER.forEach(elementInputFilter => {
    elementInputFilter.addEventListener('keyup', ingresoFiltro);
})
document.addEventListener('click', cerrarOptionsInput);