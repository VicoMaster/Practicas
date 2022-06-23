# SIMSELECT (Simple Select)
Solo se necesitas crear un componente [select] con la clase [simSelect]. Puedes agregar las [option] que necesites.


<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="assets/simSelect.css">
    <title>SimSelect | Simple Select</title>
</head>

<body style="padding: 20px;">
    <!-- INIT - simSelect -->
    <select class="simSelect">
        <option value="" selected>Seleccione una opci&oacute;n</option>
        <option value=1>Uno</option>
        <option value=2>Dos</option>
        <option value=3>Tres</option>
    </select>
    <!-- Close - simSelect -->

    <!-- INIT - simSelect -->
    <select class="simSelect">
        <option value="" selected>Seleccione una opci&oacute;nn</option>
        <option value='Dog'>Perro</option>
        <option value='Cat'>Gato</option>
        <option value='Parrot'>Loro</option>
    </select>
    <!-- Close - simSelect -->

    <!-- JS -->
    <script src="assets/simSelect.js"></script>
</body>

</html>