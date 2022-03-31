
function addDomEvents() {
    addEventOnDifficultyClick();
}

/**
 *
 * @param cardIndex
 */
function addEventOnCardClick(cardIndex) {
    $(`#${cardIndex}`).click(() => {
        onCardClick(cardIndex);
    });
}

/**
 * Au click change la difficulté du jeu
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
