function getCardId(i, j) {
    return (i * getBoardSize()) + j;
}

function getCardIdFromSelector(selector) {
    const fragments = selector.split('-'); // transforme "#col-0-1" ==> ["#col", "0", "1"]
    return getCardId(+fragments[1], +fragments[2]);
}

function getBoardSize() {
    return Math.sqrt(loadedCards.length);
}

function getBackFaceSelector(colIdSelector) {
    return `${colIdSelector} img:first-child`;
}

function getFrontFaceSelector(colIdSelector) {
    return `${colIdSelector} img:nth-child(2)`;
}

function getIsGameWon() {
    return foundCardPairIds.length === loadedCards.length;
}

function changeBackgroundClass(selector, backgroundClass) {
    $(selector)
        .removeClass('bg-success')
        .removeClass('bg-warning')
        .removeClass('bg-danger')
        .addClass(backgroundClass);
}

/**
 * Mélange les cartes en utilisant l'algo de Durstenfeld
 * @param cards
 */
function shuffleCards(cards) {
    for (let i = cards.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
}