// [HTML INJECTION]
const $HTML_INJECTION = '<main class="graph-generator"> <header class="graph-generator__header"> <section class="graph-generator__header-section"> <div class="input-field col s12 graph-generator__select"> <select id="graphRegion"> </select> <label class="graph-generator__select-label">Región</label> </div><div class="input-field col s12 graph-generator__select"> <select multiple id="graphItems"> <option value="" selected>Todos</option> </select> <label class="graph-generator__select-label">Items</label> </div><div class="input-field col s12 graph-generator__select"> <select multiple id="graphPeriodos"> <option value="" selected>Todos</option> </select> <label class="graph-generator__select-label">Periodos</label> </div><section class="graph-generator__section-icons"> <article id="buttomBarChart" class="material-symbols-outlined bg-l-grey c-l-blue" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Gráfico de barras">bar_chart </article> <article id="buttomLineChart" class="material-symbols-outlined bg-l-grey" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Gráfico de línea">show_chart</article> <article id="tableBarChart" class="material-symbols-outlined bg-l-grey" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Tabla de datos">table_chart</article> </section> </section> <section class="graph-generator__header-section"> <div class="graph-generator__container-flex"> <article class="graph-generator__title"> <span>Titulo Principal</span> </article> <article class="material-symbols-outlined" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Pantalla completa">fullscreen</article> </div></section> </header> <section class="graph-generator__body" id="myChart"></section> <footer class="graph-generator__footer"> <section class="graph-generator__container-flex w-max-c position-relative"> <article class="material-symbols-outlined" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Cambiar Vista">visibility</article> <span class="text-abs-right">Vista #1</span> </section> <section class="graph-generator__section-icons"> <article class="material-symbols-outlined" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Imprima/Guarde el gráfico">print</article> <article class="material-symbols-outlined" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Descargue los datos">download</article> </section> </footer> </main>';
const $CONTAINER_GRAPH_INJECTION = document.getElementById('graphInjection');
$CONTAINER_GRAPH_INJECTION.innerHTML = $HTML_INJECTION;
// [VARIABLES]
let nuevoChart = undefined;
// [ACTIVAMOS TOOLTIPS DE BOOTSTRAPS]
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
// [FUNCTIONS]
async function buildData(params) {
    const DATA = params.data,
        ITEMS = params.items,
        REGION = params.region;
    let dataSet = [];
    ITEMS.forEach(item => {
        let dataItems = [];
        Object.keys(DATA).forEach(dataObject => {
            if (DATA[dataObject].region === REGION && DATA[dataObject].item === item) {
                dataItems.push(DATA[dataObject].$)
            }
        });
        dataSet.push({
            label: item,
            data: dataItems
        });
    });
    return dataSet;
}
async function fillSelect() {
    // Llenamos los selects con datos
    const $SELECT_REGION = document.getElementById('graphRegion');
    const $SELECT_ITEMS = document.getElementById('graphItems');
    const $SELECT_PERIODOS = document.getElementById('graphPeriodos');
    const DATA = DATA_JSON;
    let dataSet = [];
    let itemSet = new Set();
    let regionSet = new Set();
    let periodoSet = new Set();
    const PRIMERA_REGION = DATA[0].region;
    // Select Region
    Object.keys(DATA).forEach(element => {
        if (DATA[element].region !== '' && DATA[element].region !== undefined && !regionSet.has(DATA[element].region)) {
            const ELEMENT = DATA[element];
            const $OPTION = document.createElement('option');
            $OPTION.setAttribute('value', ELEMENT.region);
            $OPTION.textContent = DATA[element].region;
            regionSet.add(DATA[element].region);
            $SELECT_REGION.appendChild($OPTION);
        }
    });
    // Select Items
    Object.keys(DATA).forEach(element => {
        if (DATA[element].region === PRIMERA_REGION && !itemSet.has(DATA[element].item)) {
            const ELEMENT = DATA[element];
            const $OPTION = document.createElement('option');
            $OPTION.setAttribute('value', ELEMENT.item);
            $OPTION.setAttribute('data-period', ELEMENT.periodo);
            $OPTION.setAttribute('data-value', ELEMENT.$);
            $OPTION.setAttribute('data-percentage', ELEMENT['%']);
            $OPTION.setAttribute('data-c', ELEMENT['crecimiento_%']);
            $OPTION.textContent = DATA[element].item;
            itemSet.add(DATA[element].item);
            $SELECT_ITEMS.appendChild($OPTION);
            dataSet.push({ x: ELEMENT.item, y: ELEMENT.$ });
        }
    });
    // Select Periodos
    Object.keys(DATA).forEach(element => {
        if (DATA[element].periodo !== '' && DATA[element].periodo !== undefined && !periodoSet.has(DATA[element].periodo)) {
            const ELEMENT = DATA[element];
            const $OPTION = document.createElement('option');
            $OPTION.setAttribute('value', ELEMENT.periodo);
            $OPTION.textContent = DATA[element].periodo;
            periodoSet.add(DATA[element].periodo);
            $SELECT_PERIODOS.appendChild($OPTION);
        }
    });
    // Generamos la data inicial para los graficos (primera carga)
    const DATA_GRAPH = await buildData({ data: DATA, items: Array.from(itemSet), region: PRIMERA_REGION });
    const $BAR_CHART = document.getElementById('myChart');
    const $PRINCIPAL_TITLE = document.querySelector('.graph-generator__title span');
    $PRINCIPAL_TITLE.textContent = document.getElementById('graphRegion').value;
    const LABELS = Array.from(periodoSet);
    nuevoChart = new MyChart({ datasets: DATA_GRAPH, parent: $BAR_CHART, titleDataSet: $SELECT_PERIODOS.value, labels: LABELS });
    nuevoChart.create();
}
fillSelect();  // Primer llenado [SELECTS] y [GRAPH]

async function dataGraph(event) {
    const DATA = DATA_JSON;
    let dataSet = [];
    const $SELECT_REGION = document.getElementById('graphRegion'),
        $SELECT_ITEMS = document.getElementById('graphItems'),
        $SELECT_PERIODOS = document.getElementById('graphPeriodos');
    let valueRegion = $SELECT_REGION.value;
    debugger
    switch (event.target.id) {
        case 'graphRegion':
            Object.keys(DATA).forEach(element => {
                if (DATA[element].region === valueRegion) {
                    const ELEMENT = DATA[element];
                    dataSet.push({ x: ELEMENT.item, y: ELEMENT.$ });
                }
            });
            document.querySelector('.graph-generator__title span').textContent = event.target.value;


            //Init: TEST
            let regionSet 
            Object.keys(DATA).forEach(element => {
                if (DATA[element].region !== '' && DATA[element].region !== undefined && !regionSet.has(DATA[element].region)) {
                    regionSet.add(DATA[element].region);
                    $SELECT_REGION.appendChild($OPTION);
                }
            });
            //Close: TEST





            // Nuevo dataSet
            nuevoChart.datasets = dataSet;
            break;
        case 'graphItems':
            Object.keys(DATA).forEach(element => {
                if ((DATA[element].item === event.target.value && DATA[element].region === valueRegion) || event.target.value === 'items') {
                    const ELEMENT = DATA[element];
                    dataSet.push({ x: ELEMENT.item, y: ELEMENT.$ });
                }
            });
            nuevoChart.datasets = dataSet;
            break;

        default:
            break;
    }
}
// [EVENTOS]
const $BUTTON_BAR_CHART = document.getElementById('buttomBarChart');
const $BUTTON_LINE_CHART = document.getElementById('buttomLineChart');
$BUTTON_BAR_CHART.addEventListener('click', event => {
    $BUTTON_LINE_CHART.classList.remove('c-l-blue');
    event.target.classList.add('c-l-blue');
    nuevoChart.type = 'bar';
});
$BUTTON_LINE_CHART.addEventListener('click', event => {
    $BUTTON_BAR_CHART.classList.remove('c-l-blue');
    event.target.classList.add('c-l-blue');
    nuevoChart.type = 'line';
});
document.querySelectorAll('.graph-generator__select').forEach(select => {
    select.addEventListener('change', dataGraph);
});
// [MATERIALIZE]
document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
});