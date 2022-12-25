import { MyChart } from './myChart.js';

// Activamos tooltips de Bootstraps
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

const $BAR_CHART = document.getElementById('myChart');
const NUEVO_CHART = new MyChart({ datasets: [20, 10], datalabels: ['a', 'b'], parent: $BAR_CHART });

NUEVO_CHART.create();