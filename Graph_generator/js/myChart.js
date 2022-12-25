/*
    Autor: AndrésR.Dev 21-12-2022
    Description: Construye un gráfico [Chart()] usando librería chart.js en un contenedor padre. 
    Comments: La clase provee todos los metodos necesarios para manipular la librería.
    Important: Se debe inicializar la librería[chart.js] en el html antes de llamar esta clase.
*/

class MyChart {
    constructor(params = {}) {
        try {
            this._datasets = params.datasets;
            this._datalabels = params.datalabels;
            this._type = params.type || 'bar';
            this._parent = params.parent;
            this._width = params.width || `${this._parent.clientWidth}px`;
            this._height = params.height || `${this._parent.clientHeight}px`;
            this.reSize = true;
        } catch (error) {
            console.error('MyChart: error en constructor');
        }
    }
    // [GETTERS]
    get datasets() {
        return this._datasets;
    }
    get datalabels() {
        return this._datalabels;
    }
    get type() {
        return this._type;
    }
    get parent() {
        return this._parent;
    }
    get width() {
        return this._width;
    }
    get height() {
        return this._height;
    }
    // [SETTERS]
    set datasets(datasets) {
        this._datasets = datasets;
        this.#reCreate();
    }
    set datalabels(datalabels) {
        this._datalabels = datalabels;
        this.#reCreate();
    }
    set type(type) {
        this._type = type;
        this.#reCreate();
    }
    set parent(parent) {
        this._parent = parent;
        this.#reCreate();
    }
    set width(width) {
        // width max 740px for performance
        if (String(width).search('px') !== -1) {
            let tempWidth = parseInt(width.split('px')[0]);
            if (tempWidth > 740) {
                width = `740px`;
                console.warn('Max width: 740');
            };
            this._width = width;
            this.#reCreate();
        } else {
            console.error('Unidad requerida [px]');
        }
    }
    set height(height) {
        // height max 550px for performance
        if (String(height).search('px') !== -1) {
            let tempheight = parseInt(height.split('px')[0]);
            if (tempheight > 550) {
                height = `550px`;
                console.warn('Max height: 550px');
            };
            this._height = height;
            this.#reCreate();
        } else {
            console.error('Unidad requerida [px]');
        }
    }
    // [METHODS]
    #reSizeWitdh() {
        //timeOut para evitar ejecución desmedida de reSize
        if (this.reSize) {
            this.reSize = false;
            this._width = `${this._parent.clientWidth}px`;
            this.#reCreate();
            setTimeout(() => {
                this.reSize = true;
            }, 200);
        }
    }
    #reCreate() {
        this._parent.removeChild(this._parent.firstChild);
        this.create();
    }
    create() {
        if (this._datasets !== undefined && this._datalabels !== undefined && this._parent !== undefined) {
            // Creamos el canvas dentro del <article>
            const $CONTAINER_CANVAS = document.createElement('section');
            $CONTAINER_CANVAS.style.width = this._width;
            $CONTAINER_CANVAS.style.height = this._height;
            const $CANVAS = document.createElement('canvas');
            $CANVAS.setAttribute('id', 'canvasChart');
            $CONTAINER_CANVAS.appendChild($CANVAS);
            this._parent.appendChild($CONTAINER_CANVAS);
            // Creamos la configuración
            const configChart = {
                type: this._type,
                data: {
                    datasets: [{
                        label: '# de datos',
                        data: this._datasets,
                        borderWidth: 1,
                        backgroundColor: 'rgb(33, 160, 210, 1)',
                    }],
                    labels: this._datalabels,
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            //max: 100
                        }
                    },
                    indexAxis: 'x',
                    plugins: {
                        legend: {
                            display: true,
                            labels: {
                                fillStyle: 'rgb(222, 195, 0)',
                                usePointStyle: true,
                                font: {
                                    size: 14,
                                }
                            }
                        }
                    }
                }
            }
            // Pintamos el Chart
            new Chart($CANVAS, configChart);
            // Añadimos evento al documento para resizeWidth
            window.addEventListener('resize', this.#reSizeWitdh.bind(this));
        } else {
            let parameter = undefined;
            if (this._datasets === undefined) parameter = 'datasets';
            if (this._datalabels === undefined) parameter = 'datalabels';
            if (this._parent === undefined) parameter = 'parent';
            console.error(`Se necesita parametro: ${parameter}`);
        }
    }
}

export { MyChart };