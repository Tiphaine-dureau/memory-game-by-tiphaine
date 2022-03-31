/**
 * Initialisation des évènements liés au DOM
 */
function addDomEvents() {
    addEventOnDifficultyClick();
}

/**
 *Au click appelle la fonction qui gère le retournement des cartes
 * @param cardIndex
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
 * Par défaut la difficulté du jeu est facile
 * @param easyMode
 */
function onDifficultyClick(easyMode) {
    g_isEasyMode = easyMode;
    resetGame();
}
