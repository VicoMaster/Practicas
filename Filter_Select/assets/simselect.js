const $SIMSELECT = document.getElementById('simselect-header'),
    $SIMSELECT_OPTIONS = document.getElementById('simselect-options'),
    $SIMSELECT_INPUT = document.getElementById('simselect-input'),
    $CONTAINER_HIDDEN_SIMSELECTOR = document.querySelector('.simselect-click-hidden');

function simselectShow() {
    $SIMSELECT_OPTIONS.classList.toggle('simselect-hidden');
    const $SIMSELECT_ICON_UP = document.getElementById('simselect-icon-up'),
        $SIMSELECT_ICON_DOWN = document.getElementById('simselect-icon-down');
    $SIMSELECT_ICON_DOWN.classList.toggle('simselect-hidden');
    $SIMSELECT_ICON_UP.classList.toggle('simselect-hidden');
}

function actionOption(event) {
    const OPTION_SELECTED = event.target.getAttribute('name');
    if (OPTION_SELECTED === 'simselect__option') {
        $SIMSELECT_INPUT.setAttribute('value', event.target.getAttribute('value'));
        simselectShow();
    }
}


$SIMSELECT.addEventListener('click', simselectShow);
$SIMSELECT_OPTIONS.addEventListener('click', actionOption);
