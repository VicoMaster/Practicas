//Componentes
const $INPUT_KEY = document.getElementById('inputKey'),
    $CONTAINER_ROOT = document.getElementById('root');


//Variables
let dataBank = {};

// Consumo archivo JSON
fetch("./assets/data_bank.json")
    .then(response => {
        return response.json();
    })
    .then(data => dataBank = {
        ...data
    })
    .catch(error => {
        console.log('Se produjo un error en el consumo: ' + error);
    })


//Lógica para el input
$INPUT_KEY.addEventListener('change', evento => {
    let tablaBusqueda = "";
    const valorInput = evento.target.value;
    const rescueObjects = Object.values(dataBank);
    let indexDatabank = 0;
    rescueObjects.forEach(objeto => {
        const index = Object.keys(objeto).indexOf(valorInput);
        let regExp = new RegExp('('+valorInput+')', 'gi');
        //AQUI SE AGREGARIA LA LOGICA PARA USAR EXPRESIONES REGULARES EN LA BUSQUEDA
        console.log(regExp);
        console.log(regExp.exec(Object.keys(objeto).join()));
        //CIERRE LOGICA PARA REGEXP
        if (index !== -1) {
            const tituloTabla = Object.keys(dataBank)[indexDatabank],
                codeTabla = Object.keys(objeto)[index],
                descripTabla = Object.values(objeto)[index];
            tablaBusqueda +=
                `<p>${tituloTabla}</p>
                <table class="table">
                    <tbody>
                        <tr>
                            <td><code>${codeTabla}</code></td>
                            <td>${descripTabla}</td>
                        </tr>
                    </tbody>
                </table>`
        }
        indexDatabank += 1;
    });
    $CONTAINER_ROOT.innerHTML = tablaBusqueda;
});
