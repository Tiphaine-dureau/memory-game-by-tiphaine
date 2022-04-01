/**
 * Récupère l'index d'une carte lors de la création des 2 boucles imbriquées Row / Col
 * Pour i = 0 à 3
 * Pour j = 0 à 3
 * On aura cardIndex = 0 à 15
 * @param {number} i
 * @param {number} j
 * @returns {number} cardIndex
 */
function getCardIndex(i, j) {
    return (i * getBoardSize()) + j;
}

/**
 * La plateau de jeu possède autant de lignes que de colonnes (Longeur = largeur)
 * On a L * l = nombre de cartes du plateau
 * Comme L = l on écrit L^2 = nombre de cartes du plateau
 * Et donc L = sqrt(nombre de cartes du plateau)
 * @returns {number} La longueur du plateau
 */
function getBoardSize() {
    return Math.sqrt(g_loadedCards.length);
}

/**
 * Le dos de l'image correspond au premier enfant
 * @param {number} cardIndex
 * @returns {string}
 */
function getBackFaceSelector(cardIndex) {
    return `#${cardIndex} img:first-child`;
}

/**
 * La face de l'image correspond au second enfant
 * @param {number} cardIndex
 * @returns {string}
 */
function getFrontFaceSelector(cardIndex) {
    return `#${cardIndex} img:nth-child(2)`;
}

/**
 * Vérifie si la partie est gagnée
 * @returns {boolean}
 */
function getIsGameWon() {
    return g_foundCardPairIndex.length === g_loadedCards.length;
}

/**
 * La carte est révélée si la dos de la carte est masqué (dislay = none)
 * @param {number} cardIndex
 * @returns {boolean}
 */
function isCardRevealed(cardIndex) {
    return $(getBackFaceSelector(cardIndex)).css('display') === 'none';
}

/**
 * Change la couleur de fond avec les classes Bootstrap
 * Utilisée pour la progress bar et pour le toast
 * @param {string} selector
 * @param {string} backgroundClass (bg-primary | bg-warning | bg-danger)
 */
function changeBackgroundClass(selector, backgroundClass) {
    $(selector)
        .removeClass('bg-primary')
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

/**
 * Retourne le temps restant en secondes
 * @returns {string}
 */
function getTimeLeftInSeconds() {
    const tickPerSecond = 1000 / g_refreshRate;
    return (g_timeTickLeft / tickPerSecond).toFixed(0);
}