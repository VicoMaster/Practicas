/*
    Autor: AndrésR.
    Description: Simple Calendario para recolectar el año, el mes y el día que se desea ingresar
    Logica: Crea los elementos span[ANNO] y span[MONTH]; para luego dependiendo del numero de días del mes crear span[DAYS].
            Recolecta los datos ingresados por el usuario y los posiciona en el input objetivo.
*/

//VARIABLES GLOBALES
const $INPUT_CALENDAR_OBSERVER = document.getElementById('test-calendar-input'), //INPUT OBSERVER - ACTION
    $OVERLAY_CALENDAR = document.getElementById('overlay-simcalendar'),
    $TITLE_CALENDAR = document.getElementById('simcalendar-span-title'),
    $CONTAINER_CALENDAR = document.getElementById('simcalendar-container'),
    $ARTICLE_ANNO_CALENDER = document.getElementById('simcalendar-years'),
    $ARTICLE_MONTH_CALENDER = document.getElementById('simcalendar-month'),
    $ARTICLE_DAYS_CALENDER = document.getElementById('simcalendar-days'),
    $ARROW_LEFT = document.getElementById('arrow-retroceder'),
    $ARROW_RIGHT = document.getElementById('arrow-avanzar'),
    AUMENTO_ANNOS = 42,  // Incremento a los años por página
    ANNO_INICIAL_CALENDAR = 1910,  // Constante fecha inicial
    MIN_ANNO_PERMITIDO = 1490;  // Minimo año permitido
let fechaActual = [ANNO_INICIAL_CALENDAR, 1],  // Fecha inicial para el calendario
    annoAnterior = 0,  // Guarda el primer año de la página anterior para lógica de flecha anterior
    annoActual = 0,  // Guarda el primer año de la página actual para lógica de flecha anterior
    annoSelectedStyle = undefined,  // Guarda el span del año seleccionado para agregar/eliminar la clase selected
    monthSelectedStyle = undefined,  // Guarda el span del mes seleccionado para agregar/eliminar la clase selected
    dayselectedStyle = undefined,  // Guarda el span del dá seleccionado para agregar/eliminar la clase selected
    monthList = {
        'Enero': '01', 'Febrero': '02', 'Marzo': '03', 'Abril': '04', 'Mayo': '05',
        'Junio': '06', 'Julio': '07', 'Agosto': '08', 'Septiembre': '09', 'Octubre': '10',
        'Noviembre': '11', 'Diciembre': '12'
    },
    selectedFechaToInput = ['', '', ''];  // Fecha ingresada por el Usuario para el Input


//CREAMOS LOS SPAN ANNO
//Article anno
function crearAnnos(aumentoAnnos = AUMENTO_ANNOS) {
    $TITLE_CALENDAR.textContent = 'AÑO';
    $TITLE_CALENDAR.setAttribute('value', 'AÑO');
    //Eliminamos los hijos si existen
    while ($ARTICLE_ANNO_CALENDER.firstChild) {
        $ARTICLE_ANNO_CALENDER.removeChild($ARTICLE_ANNO_CALENDER.firstChild);
    }
    // Añadimos span al article anno
    Array.from(new Array(aumentoAnnos)).forEach(() => {
        let spanElement = document.createElement('span');
        spanElement.classList.add('simcalendar__field');
        spanElement.textContent = fechaActual[0];
        spanElement.setAttribute('value', fechaActual[0]);
        spanElement.setAttribute('name', 'anno');
        fechaActual[0] += 1;
        $ARTICLE_ANNO_CALENDER.appendChild(spanElement);
    })
}
crearAnnos();

// CREAMOS LOS SPAN MES
function crearMonth() {
    let monthNow = new Date().getMonth();
    let yearNow = new Date().getFullYear();
    let maximoMonth = 11;
    //Eliminamos los meses existentes
    while ($ARTICLE_MONTH_CALENDER.firstChild) {
        $ARTICLE_MONTH_CALENDER.removeChild($ARTICLE_MONTH_CALENDER.firstChild);
    }
    //Si el año es el actual parametriza el mes máximo
    if (fechaActual[0] === yearNow) {
        maximoMonth = monthNow;
    }
    //Se crean los meses
    let contadorMonth = 0;
    for (const month of Object.keys(monthList)) {
        if (contadorMonth <= maximoMonth) {
            let spanElement = document.createElement('span');
            spanElement.classList.add('simcalendar__field');
            spanElement.textContent = month;
            spanElement.setAttribute('value', month);
            spanElement.setAttribute('name', 'month');
            $ARTICLE_MONTH_CALENDER.appendChild(spanElement);
        }
        contadorMonth += 1;
    }
}



//FUNCION PARA CREAR SPAN DAYS
function crearSpanDays() {
    let DayNow = new Date().getDate();
    let monthNow = (new Date().getMonth()) + 1;
    let yearNow = new Date().getFullYear();
    let maximoDay = 0;
    //Eliminamos los días existentes
    while ($ARTICLE_DAYS_CALENDER.firstChild) {
        $ARTICLE_DAYS_CALENDER.removeChild($ARTICLE_DAYS_CALENDER.firstChild);
    }
    //Calculo de dias de acuerdo al año y mes ingresado por usuario
    //const PRIMER_DIA_MES = new Date(fechaActual[0], parseInt(fechaActual[1], 10) - 1, 1).getDay();
    const NO_DIAS_MES = new Date(fechaActual[0], parseInt(fechaActual[1], 10), 0).getDate();
    //const ULTIMO_DIA_MES = new Date(fechaActual[0], parseInt(fechaActual[1], 10) - 1, NO_DIAS_MES).getDay();
    //const DIAS_SEMANA = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
    //console.log('Primer día mes: ' + DIAS_SEMANA[PRIMER_DIA_MES]);
    //console.log('Ultimo día mes: ' + DIAS_SEMANA[ULTIMO_DIA_MES]);
    //console.log('Número de días del mes: ' + NO_DIAS_MES);

    //Si el año y el mes son los actual parametriza el día máximo
    if (fechaActual[0] === yearNow && parseInt(fechaActual[1], 10) === monthNow) {
        maximoDay = DayNow;
    } else {
        maximoDay = NO_DIAS_MES;
    }
    //Creamos los span de días
    let initialDays = 1;
    let contadorDays = 0;
    Array.from(new Array(NO_DIAS_MES)).forEach(() => {
        if (contadorDays < maximoDay) {
            let spanElement = document.createElement('span');
            spanElement.classList.add('simcalendar__field');
            spanElement.classList.add('justify--right');
            spanElement.textContent = initialDays;
            if (initialDays < 10) {
                spanElement.setAttribute('value', '0' + initialDays);
            } else {
                spanElement.setAttribute('value', initialDays);
            }
            spanElement.setAttribute('name', 'days');
            $ARTICLE_DAYS_CALENDER.appendChild(spanElement);
            contadorDays += 1;
            initialDays += 1;
        }
    })
}


//FUNCION PARA AVANZAR EL AÑO
let fixDobleClick = true; // sin esto hay que dar doble click en la primera ejecución de la flecha atras
function controlArrows(direction) {
    let yearNow = new Date().getFullYear();
    if (direction === 'arrow-avanzar') {
        fechaActual[0] = parseInt($ARTICLE_ANNO_CALENDER.lastChild.getAttribute('value'), 10) + 1;
        let valAnno = AUMENTO_ANNOS + fechaActual[0];
        let aumentoActual = valAnno > yearNow ?
            AUMENTO_ANNOS - (valAnno - yearNow) + 1 : AUMENTO_ANNOS;
        if (aumentoActual != 0) {
            annoAnterior = parseInt($ARTICLE_ANNO_CALENDER.firstChild.getAttribute('value'), 10);
            crearAnnos(aumentoActual);
            annoActual = parseInt($ARTICLE_ANNO_CALENDER.firstChild.getAttribute('value'), 10);
        }
    } else if (direction === 'arrow-retroceder') {
        let temporalPrimerAnnoActual = parseInt($ARTICLE_ANNO_CALENDER.firstChild.getAttribute('value'), 10);
        if (temporalPrimerAnnoActual > MIN_ANNO_PERMITIDO) {
            if (fechaActual[0] === annoAnterior) {
                // Esta validación arregla la disminución de años para más de un regreso
                fechaActual[0] -= AUMENTO_ANNOS;
            } else {
                if (annoAnterior === 0) {
                    annoAnterior = parseInt($ARTICLE_ANNO_CALENDER.firstChild.getAttribute('value'), 10);
                }
                fechaActual[0] = annoAnterior;
                //Fix para primer click de la flecha retroceso
                if (fixDobleClick === true) {
                    controlArrows('arrow-retroceder');
                    fixDobleClick = false;
                }
            }
            let valAnno = AUMENTO_ANNOS + fechaActual[0];
            let aumentoActual = valAnno > yearNow ?
                AUMENTO_ANNOS - (valAnno - yearNow) + 1 : AUMENTO_ANNOS;
            if (aumentoActual != 0) {
                crearAnnos(aumentoActual);
                annoAnterior = parseInt($ARTICLE_ANNO_CALENDER.firstChild.getAttribute('value'), 10);
                fechaActual[0] = annoAnterior;
            }
        }
    }
}

//FUNCION PARA REINICIAR EL CALENDARIO
function resetCalendar() {
    $TITLE_CALENDAR.textContent = 'AÑO';
    $TITLE_CALENDAR.setAttribute('value', 'AÑO');
    $TITLE_CALENDAR.setAttribute('name', 'anno');
    $ARTICLE_ANNO_CALENDER.classList.remove('simcalendar--hidden');
    $ARTICLE_MONTH_CALENDER.classList.add('simcalendar--hidden');
    $ARTICLE_DAYS_CALENDER.classList.add('simcalendar--hidden');
    $ARROW_RIGHT.classList.remove('simcalendar--opacity0');
}

//FUNCION ACTIVADORA (para todos los elementos del calendario)
function actionField(evento) {
    const TARGET = evento.target.getAttribute('name');
    switch (TARGET) {
        case 'anno':
            fechaActual[0] = parseInt(evento.target.getAttribute('value'), 10);
            selectedFechaToInput[0] = fechaActual[0];
            //Posicionamos los elementos seleccionados en el input
            $INPUT_CALENDAR_OBSERVER.value = `${selectedFechaToInput[0]}-`;
            $ARTICLE_ANNO_CALENDER.classList.add('simcalendar--hidden');
            if (annoSelectedStyle != undefined) {
                annoSelectedStyle.classList.remove('simcalendar--selected');
            }
            annoSelectedStyle = evento.target;
            annoSelectedStyle.classList.add('simcalendar--selected');
            $TITLE_CALENDAR.textContent = 'MES';
            $TITLE_CALENDAR.setAttribute('value', 'MES');
            $TITLE_CALENDAR.setAttribute('name', 'MES');
            crearMonth();
            $ARTICLE_MONTH_CALENDER.classList.remove('simcalendar--hidden');
            $ARROW_RIGHT.classList.add('simcalendar--opacity0');
            break;

        case 'month':
            fechaActual[1] = monthList[evento.target.getAttribute('value')];
            selectedFechaToInput[1] = fechaActual[1];
            //Posicionamos los elementos seleccionados en el input
            $INPUT_CALENDAR_OBSERVER.value = `${selectedFechaToInput[0]}-${selectedFechaToInput[1]}-`;
            if (monthSelectedStyle != undefined) {
                monthSelectedStyle.classList.remove('simcalendar--selected');
            }
            monthSelectedStyle = evento.target;
            monthSelectedStyle.classList.add('simcalendar--selected');
            crearSpanDays();
            $TITLE_CALENDAR.textContent = 'DIA';
            $TITLE_CALENDAR.setAttribute('value', 'DIA');
            $TITLE_CALENDAR.setAttribute('name', 'DIA');
            $ARTICLE_MONTH_CALENDER.classList.add('simcalendar--hidden');
            $ARTICLE_DAYS_CALENDER.classList.remove('simcalendar--hidden');
            break;

        case 'days':
            const daySelected = evento.target.getAttribute('value');
            selectedFechaToInput[2] = daySelected;
            //Posicionamos los elementos seleccionados en el input
            $INPUT_CALENDAR_OBSERVER.value = `${selectedFechaToInput[0]}-${selectedFechaToInput[1]}-${selectedFechaToInput[2]}`;
            showOrHiddenCalendar();
            break;

        default:
            let otherName = '';
            try {
                otherName = evento.composedPath()[0].attributes[1].nodeValue;
            } catch (error) {
                otherName = '';
            }
            if (otherName === 'arrow-avanzar' || otherName === 'arrow-retroceder') {
                const TITLE_ARTICLE = $TITLE_CALENDAR.getAttribute('name');
                if (TITLE_ARTICLE === 'anno') {
                    const DIRECTION_ARROW = otherName;
                    controlArrows(DIRECTION_ARROW);
                }
                if (TITLE_ARTICLE === 'MES') {
                    $TITLE_CALENDAR.textContent = 'AÑO';
                    $TITLE_CALENDAR.setAttribute('value', 'AÑO');
                    $TITLE_CALENDAR.setAttribute('name', 'anno');
                    $ARTICLE_MONTH_CALENDER.classList.add('simcalendar--hidden');
                    $ARTICLE_ANNO_CALENDER.classList.remove('simcalendar--hidden');
                    $ARROW_RIGHT.classList.remove('simcalendar--opacity0');
                }
                if (TITLE_ARTICLE === 'DIA') {
                    $TITLE_CALENDAR.textContent = 'MES';
                    $TITLE_CALENDAR.setAttribute('value', 'MES');
                    $TITLE_CALENDAR.setAttribute('name', 'MES');
                    $ARTICLE_DAYS_CALENDER.classList.add('simcalendar--hidden');
                    $ARTICLE_MONTH_CALENDER.classList.remove('simcalendar--hidden');
                }
            }
            break;
    }
}

//FUNCION PARA EL INPUT OBSERVER : show | hidden Calendar
function showOrHiddenCalendar() {
    $CONTAINER_CALENDAR.classList.toggle('simcalendar--hidden');
    $OVERLAY_CALENDAR.classList.toggle('simcalendar--hidden');
    resetCalendar();
}

//AÑADIMOS EVENTOS
const $CALENDAR = document.getElementById('simcalendar');
$CALENDAR.addEventListener('click', actionField);
$INPUT_CALENDAR_OBSERVER.addEventListener('click', showOrHiddenCalendar);
$OVERLAY_CALENDAR.addEventListener('click', showOrHiddenCalendar);