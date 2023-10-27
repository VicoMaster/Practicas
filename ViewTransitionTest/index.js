function hideCard() {
    const $CARD_1 = document.getElementById('card1');
    const $CARD_2 = document.getElementById('card2');

    if ($CARD_1.classList.contains('hiddenElement')) {
        $CARD_1.classList.remove('hiddenElement');
        $CARD_2.classList.add('hiddenElement');
        return;
    }

    if ($CARD_2.classList.contains('hiddenElement')) {
        $CARD_2.classList.remove('hiddenElement');
        $CARD_1.classList.add('hiddenElement');
        return;
    }

    if (!$CARD_1.classList.contains('hiddenElement') && !$CARD_2.classList.contains('hiddenElement')) {
        $CARD_1.classList.add('hiddenElement');
        return;
    }

}

window.onload = () => {
    const $BTN_1 = document.getElementById('btn1');
    $BTN_1.addEventListener('click', () => {
        if (!document.startViewTransition) {
            console.log('No existe la API');
            hideCard();
            return;
        }
        document.startViewTransition(() => hideCard());
    });
}