/*
    Autor: AndrésR.Dev 
    Description: Identifica los [select] con la clase [simSelect] para remplazarlos con el contenido HTML creado
                 en la function [transformSelect()]. Esta recogera los atributos ingresados en el [select] original
                 y los pondra en el input donde se refleja la option seleccionada.
    Logica: Luego de remplazar los [select] identifica cada parte del HTML nuevo y así generar las acciones correspondientes.
    Comments: Creado para sustituir las etiquetas [SELECT] que no ofrecen comodidad al usuario.

*/

//ELEMENTOS DOM - ACTUALIZADOS EN FUNCION addEventDom()
let $simSelect = undefined,
    $simSelectOptions = undefined,
    $simSelectInput = undefined,
    $simSelectFilter = undefined,
    $simSelectOptionsValues = undefined,
    $simselectIconDown = undefined,  // Icono de flecha abajo actual
    $iconClearInputFiltro = undefined,  // Icono X clear Input actual 
    $iconSearchInputFiltro = undefined,  // Icono Lupa en Input actual 
    elementosActuales = {};  // Guarda los elementos target(DOM elements) actuales

//VARIABLES
let textFilter = '',  // texto ingresado usado para filtrar resultados
    valoresOriginalsOptions = [],  // Elementos DOM [article] actuales, SE REINICIA al cambiar de simselect.
    dataSimselectIndex = 0,  // Index del elemento actual seleccionado, si cambia se reinicia valoresOriginalsOptions
    contKeyArrow = -1, // Añade o disminuye dependiendo de la flecha de navegación usada
    accessKey = false; // SI es True activará la recolección del valor de [ARTICLE] focuseado por flechas de teclado

//GUARDAMOS LOS VALORES DE LOS OPTIONS y RETORNAMOS OBJECT DE VALORES DE LOS ARTICLE
function saveReturnValues(elementosArticle) {
    let keysValuesOptions = {};
    if (valoresOriginalsOptions.length <= 0) {
        valoresOriginalsOptions = [...elementosArticle];
    }
    for (const ELEMENT of valoresOriginalsOptions) {
        const VALOR_ELEMENT = ELEMENT.getAttribute('value');
        keysValuesOptions[`${ELEMENT.textContent}`] = VALOR_ELEMENT;
    }
    return keysValuesOptions;
}

//FILTRAMOS VALORES EN LAS OPTIONS vs FILTRO
function filtrarDatos(objectValuesOptions) {
    navegationKeys();
    let keysValuesOptions = {};
    Object.keys(objectValuesOptions).filter(element => {
        const REGEX = new RegExp(`.*${textFilter}.*`, 'gi');
        let indexSearch = element.search(REGEX);
        if (indexSearch != -1 && indexSearch === 0) {
            keysValuesOptions[element] = objectValuesOptions[element];
        }
    });
    return keysValuesOptions;
}

//ENCONTRAMOS LOS ELEMENTOS ACTUALES PARA MULTI-INPUT | si es nuevo cierra el anterior
function identifyInput(element) {
    const ELEMENTOS_DOM = {}
    const PATH = element.composedPath();
    PATH.forEach(element => {
        if (element !== document && element !== window && element.nodeName !== 'BODY' && element.nodeName !== 'HTML') {
            if (element.getAttribute('class') === 'simSelect') {
                ELEMENTOS_DOM.main = element;
                ELEMENTOS_DOM.header = element.children[0];
                ELEMENTOS_DOM.sectionOptions = element.children[1];
                //Si el elemento main es diferente al anterior vacía los valoresOriginalsOptions
                if (dataSimselectIndex === 0) {
                    dataSimselectIndex = element.getAttribute('data-simselect-index');
                }
                if (dataSimselectIndex !== element.getAttribute('data-simselect-index')) {
                    dataSimselectIndex = element.getAttribute('data-simselect-index');
                    const HIDDEN_CLASS = elementosActuales.sectionOptions.getAttribute('class').includes('simSelect-hidden');
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
    let valoresActuales = { ...saveReturnValues(valoresOriginalsOptions) };
    crearHijos(valoresActuales, $CONTAINER_OPTIONS);
    elementosActuales.sectionOptions.children[0].children[0].value = '';
}

//Se llama cuando se necesita cerrar la caja de opciones y reiniciar todo
function showClose(elementosDom) {
    elementosDom.sectionOptions.classList.toggle('simSelect-hidden');
    //Si la caja de opciones está oculta mandamos focus al header
    if (elementosDom.sectionOptions.classList.contains('simSelect-hidden')) {
        directHeader();
        navegationKeys();
    }
    elementosDom.header.classList.toggle('border-focus');
    //Encontramos nuevamente las flechas de acción por funcionamiento SVG
    $simselectIconDown = elementosDom.header.children[1];
    const $RE_SIMSELECT_ICON_UP = elementosDom.header.children[2];
    //Cambiamos estilos
    $simselectIconDown.classList.toggle('simSelect-hidden');
    $RE_SIMSELECT_ICON_UP.classList.toggle('simSelect-hidden');
    elementosDom.sectionOptions.children[0].children[0].focus();
    //Si existe una copia de los valores los restablece al cerrar
    if (valoresOriginalsOptions.length > 0) {
        resetValuesOptions();
    }
}

//Navegación con flechas del teclado
function navegationKeys(event = undefined) {
    try {
        if (event !== undefined) {
            if (contKeyArrow !== -1) {
                elementosActuales.sectionOptions.children[1].children[contKeyArrow].classList.remove('border-focus');
            }
            contKeyArrow += (event.code === 'ArrowDown' || event.code === 'ArrowRight')
                ? (contKeyArrow < elementosActuales.sectionOptions.children[1].children.length - 1) ? 1 : 0
                : (contKeyArrow > 0) ? -1 : 0;
            if (contKeyArrow === -1) {
                contKeyArrow = 0;
            }
            elementosActuales.sectionOptions.children[1].children[contKeyArrow].classList.add('border-focus');
            accessKey = true;
        } else {
            //Reiniciamos la interacción con las flechas del teclado cuando se llama sin argumentos
            if (contKeyArrow >= 0) {
                elementosActuales.sectionOptions.children[1].children[contKeyArrow].classList.remove('border-focus');
                contKeyArrow = 0;
                accessKey = false;
            }
        }
    } catch {
        console.log('ALGO RARO PASO...');
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
        //Añadimos evento clearInput al icono de close(X) en el input y a la lupa
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
        nameEvent = elementosActuales.header.children[0].getAttribute('class').includes('simSelect-input');
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
            const OPTION_SELECTED = event.target.getAttribute('class').includes('simSelect__option');;
            if (OPTION_SELECTED) {
                const VALOR_OPTION = event.target.getAttribute('value');
                const VALOR_TEXT_CONTENT = event.target.textContent;
                elementosActuales.header.children[0].value = VALOR_TEXT_CONTENT;
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
        const VALOR_TEXT_CONTENT = elementosActuales.sectionOptions.children[1].children[contKeyArrow].textContent;
        elementosActuales.header.children[0].value = VALOR_TEXT_CONTENT;
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
function crearHijos(objectValoresOptions, contenedorPadre) {
    //Creamos e insertamos los hijos
    Object.keys(objectValoresOptions).forEach(key => {
        let $elementArticle = document.createElement('article');
        $elementArticle.setAttribute('class', 'simSelect__option');
        $elementArticle.setAttribute('value', objectValoresOptions[key]);
        $elementArticle.setAttribute('tabindex', '0');
        $elementArticle.textContent = key;
        contenedorPadre.appendChild($elementArticle);

    });
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
            let valoresActuales = {};  // Valores actuales options
            let valoresFiltrados = {};  // Valores filtrados options
            //Creamos Object con cada uno de los Keys(textContent)/valores(values) de las opciones
            valoresActuales = { ...saveReturnValues(elementosActuales.sectionOptions.children[1].children) };
            //Validamos las coincidencias del filtro en el Object de valores
            valoresFiltrados = { ...filtrarDatos(valoresActuales) };
            //Creamos los nuevos elementos article con los resultados del filtro
            const $CONTAINER_OPTIONS = elementosActuales.sectionOptions.children[1];
            if (Object.keys(valoresFiltrados).length > 0) {
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
        const HIDDEN_CLASS = elementosActuales.sectionOptions.getAttribute('class').includes('simSelect-hidden');
        let nameEvent = false;
        if (!HIDDEN_CLASS) {
            const INCLUDES_CLASS = ['simSelect-input', 'simSelect-filter', 'simSelect__option', 'noData'];
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

//ADD EVENTOS - LLamada para leer los elementos validos luego de remplazo del select (transformSelect())
function addEventDom() {
    //ELEMENTOS DOOM 
    $simSelect = document.querySelectorAll('.simSelect-header'),
        $simSelectOptions = document.querySelectorAll('.simSelect-options'),
        $simSelectInput = document.querySelector('.simSelect-input'),
        $simSelectFilter = document.querySelectorAll('.simSelect-filter'),
        $simSelectOptionsValues = document.querySelectorAll('.simSelect__option');

    $simSelect.forEach(elementSelect => {
        elementSelect.addEventListener('click', simselectInit);
        elementSelect.addEventListener('keyup', detectKey);
    });
    $simSelectOptions.forEach(elementContainerOption => {
        elementContainerOption.addEventListener('click', actionOption);
        elementContainerOption.addEventListener('keyup', actionOption);
    })
    $simSelectFilter.forEach(elementInputFilter => {
        elementInputFilter.addEventListener('keyup', ingresoFiltro);
    })
    document.addEventListener('click', cerrarOptionsInput);
}

//FUNCION PARA TRANSFORMAR ELEMENTOS [SELECT] Y CONVERTIRLOS EN EL simSelect
function transformSelect($select = undefined, index = 0) {
    const newElement = element => document.createElement(element);
    //Creamos y agregamos los atributos del select al nuevo elemento main
    let $newSelect = newElement('main');
    $newSelect.setAttribute('class', 'simSelect');
    $newSelect.setAttribute('data-simselect-index', index);
    //Creamos Header del main
    let $header = newElement('header');
    $header.setAttribute('class', 'simSelect-header');
    $header.setAttribute('tabindex', '0');
    let $input = newElement('input');
    let $span_1 = newElement('span');
    let $span_2 = newElement('span');
    const ATTRIBUTES_SELECT = $select.getAttributeNames();
    ATTRIBUTES_SELECT.forEach(attribute => {
        if (attribute === 'class') {
            const CLASES = 'simSelect-input ' + $select.getAttribute(attribute).replace('simSelect', '').trim();
            $input.setAttribute('class', CLASES);
        } else {
            $input.setAttribute(`${attribute}`, $select.getAttribute(attribute));
        }
    });
    $select.classList.add('simSelect-hidden');
    $input.setAttribute('type', 'text');
    $input.setAttribute('disabled', '');
    $span_1.setAttribute('class', 'iconify-inline simSelect-icon');
    $span_1.setAttribute('data-icon', 'akar-icons:chevron-down');
    $span_1.style.color = 'rgb(31, 31, 31)';
    $span_1.setAttribute('data-width', '15');
    $span_2.setAttribute('class', 'iconify-inline simSelect-icon simSelect-hidden');
    $span_2.setAttribute('data-icon', 'akar-icons:chevron-up');
    $span_2.style.color = 'rgb(31, 31, 31)';
    $span_2.setAttribute('data-width', '15');
    //Creamos Section OPTIONS del Main
    let $sectionOptions = newElement('section');
    $sectionOptions.setAttribute('class', 'simSelect-options simSelect-hidden');
    let $headerSectionOptions = newElement('header');
    //Creamos hijos del sections OPTIONS [HEADER FILTRO]
    $headerSectionOptions.setAttribute('class', 'simSelect-filter-header');
    let $inputOption = newElement('input');
    $inputOption.setAttribute('class', 'simSelect-filter');
    $inputOption.setAttribute('type', 'text');
    $inputOption.setAttribute('tabindex', '0');
    $inputOption.setAttribute('placeholder', '¿Qué busca?');
    let $sectionIcon1 = newElement('section');
    let $sectionIcon2 = newElement('section');
    $sectionIcon1.setAttribute('class', 'simSelect-icon-search');
    $sectionIcon2.setAttribute('class', 'simSelect-icon-close');
    let $spanIcon1 = newElement('span');
    $spanIcon1.setAttribute('class', 'iconify-inline');
    $spanIcon1.setAttribute('data-icon', 'codicon:search');
    $spanIcon1.setAttribute('data-width', '16');
    $spanIcon1.style.color = '#36c';
    let $spanIcon2 = newElement('span');
    $spanIcon2.setAttribute('class', 'iconify-inline');
    $spanIcon2.setAttribute('data-icon', 'codicon:chrome-close');
    $spanIcon2.setAttribute('data-width', '18');
    //Creamos hijos del sections OPTIONS [section OPTIONS]
    let $sectionsOptionsValues = newElement('section');
    $sectionsOptionsValues.setAttribute('class', 'simSelect-option-container');
    //Creamos las options[Articles], si existe una option [selected] tomara esa como primer hijo
    let $optionSelected = undefined; // Guarda la option SELECTED, si no hay ninguna toma la primera option
    Array.from($select.children).forEach($children => {
        if ($children.getAttributeNames().findIndex(attribute => attribute === 'selected') !== -1) {
            $optionSelected = $children;
        }
    });
    if ($optionSelected === undefined) {
        if ($select.children[0] !== undefined) {
            $optionSelected = $select.children[0];
            $input.setAttribute('value', $optionSelected.value);
            $input.value = $optionSelected.textContent;
        } else {
            $input.setAttribute('placeholder', 'NO OPTIONS');
            $input.setAttribute('value', '');
            $input.value = '';
        }
    } else {
        $input.setAttribute('value', $optionSelected.value);
        $input.value = $optionSelected.textContent;
    }
    Array.from($select.children).forEach(option => {
        const valueOption = option.value;
        const textContentOption = option.textContent;
        let $article = newElement('article');
        $article.setAttribute('class', 'simSelect__option');
        $article.setAttribute('tabindex', '0');
        $article.setAttribute('value', valueOption);
        $article.textContent = textContentOption;
        $sectionsOptionsValues.appendChild($article);
    })
    $header.appendChild($input);
    $header.appendChild($span_1);
    $header.appendChild($span_2);
    $newSelect.appendChild($header);
    $headerSectionOptions.appendChild($inputOption);
    $sectionIcon1.appendChild($spanIcon1);
    $sectionIcon2.appendChild($spanIcon2);
    $headerSectionOptions.appendChild($sectionIcon1);
    $headerSectionOptions.appendChild($sectionIcon2);
    $sectionOptions.appendChild($headerSectionOptions);
    $sectionOptions.appendChild($sectionsOptionsValues);
    $newSelect.appendChild($sectionOptions);
    //Remplazamos el Select por lo nuevo
    $select.parentNode.replaceChild($newSelect, $select)
    addEventDom();
}

//ADD Plugin ICONIFY to BODY
const scriptIconify = document.createElement('script');
scriptIconify.setAttribute('src', 'https://code.iconify.design/2/2.2.1/iconify.min.js')
document.body.appendChild(scriptIconify);

//Buscamos todos los elementos Selects y los remplazamos
const $SELECT_SIMSELECT = document.querySelectorAll('.simSelect');
$SELECT_SIMSELECT.forEach((select, index) => {
    transformSelect(select, index);
});