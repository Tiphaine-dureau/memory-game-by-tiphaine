/**
 * Initialisation des évènements liés au DOM
 */
function addDomEvents() {
    addEventOnDifficultyClick();
}

/**
 * Au click appelle la fonction qui gère le retournement des cartes
 * @param {number} cardIndex
 */
function addEventOnCardClick(cardIndex) {
    $(`#${cardIndex}`).click(() => {
        onCardClick(cardIndex);
    });
}

/**
 * Au click sur les boutons change la difficulté du jeu
 */
function addEventOnDifficultyClick() {
    $('#btn-radio-easy').click(() => onDifficultyClick(true));
    $('#btn-radio-hard').click(() => onDifficultyClick(false));
}

/**
 * Stocke la difficulté choisie par l'utilisateur
 * Et réinitialise le jeu
 * @param {boolean} easyMode
 */
function onDifficultyClick(easyMode) {
    g_isEasyMode = easyMode;
    resetGame();
}
