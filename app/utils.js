function getCardIndex(i, j) {
    return (i * getBoardSize()) + j;
}

function getBoardSize() {
    return Math.sqrt(g_loadedCards.length);
}

function getBackFaceSelector(cardIndex) {
    return `#${cardIndex} img:first-child`;
}

function getFrontFaceSelector(cardIndex) {
    return `#${cardIndex} img:nth-child(2)`;
}

function getIsGameWon() {
    return g_foundCardPairIds.length === g_loadedCards.length;
}

/**
 * La carte est révélée si la backface est masquée (dislay = none)
 * @param backFaceSelector
 * @returns {boolean}
 */
function isCardRevealed(backFaceSelector) {
    return $(backFaceSelector).css('display') === 'none';
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