function getCardIndex(i, j) {
    return (i * getBoardSize()) + j;
}

/**
 * Obtient la racine carré du board (4) car mon tableau d'images est de 16)
 * @returns {number}
 */
function getBoardSize() {
    return Math.sqrt(g_loadedCards.length);
}

/**
 * Le dos de l'image correspond au premier enfant
 * @param cardIndex
 * @returns {string}
 */
function getBackFaceSelector(cardIndex) {
    return `#${cardIndex} img:first-child`;
}

/**
 * La face de l'image correspond au second enfant
 * @param cardIndex
 * @returns {string}
 */
function getFrontFaceSelector(cardIndex) {
    return `#${cardIndex} img:nth-child(2)`;
}

/**
 * Vérifie si la partie est gagnée :
 * @returns {boolean}
 */
function getIsGameWon() {
    return g_foundCardPairIds.length === g_loadedCards.length;
}

/**
 * La carte est révélée si la dos de la carte est masqué (dislay = none)
 * @param cardIndex
 * @returns {boolean}
 */
function isCardRevealed(cardIndex) {
    return $(getBackFaceSelector(cardIndex)).css('display') === 'none';
}

/**
 * Change la couleur : s'applique pour la progress barre et au toast
 * @param selector
 * @param backgroundClass
 */
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