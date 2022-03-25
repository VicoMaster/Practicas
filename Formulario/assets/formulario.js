// PRACTICA DE FORMULARIO CON EL OBJETO formData

//Rescatamos componentes HTML - Symbol $ para DOM
let $contactFormOne = document.getElementById('contact-form-1'),
    $imgPreviewForm = document.getElementById('image'),
    $userNameForm = document.getElementById('username'),
    $inputFileForm = document.getElementById('file');


function dataPreview(dataForm = {}) {
    //Cambiar src de la imagen
    const UPLOADED_FILE = dataForm.get('image'); //Esto se maneja como un Blob
    const RUTA_IMG = URL.createObjectURL(UPLOADED_FILE);
    console.log(RUTA_IMG)
    $imgPreviewForm.setAttribute('src', RUTA_IMG);
    //Poner nombre de usuario a la imagen
    let userName = dataForm.get('username');
    $userNameForm.textContent = userName;
}


//Evento Submit
$contactFormOne.addEventListener('submit', event => {
    event.preventDefault();
    const dataContactForm = new FormData($contactFormOne);
    dataPreview(dataContactForm);
    alert('SE HA ENVIADO LA INFO...')
});

//Evento Change en Input File del Formulario
$inputFileForm.addEventListener('change', event => {
    //event.currentTarget también contiene el component
    const dataContactForm = new FormData($contactFormOne);
    dataPreview(dataContactForm);
});
