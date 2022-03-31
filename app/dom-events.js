
function addDomEvents() {
    addEventOnDifficultyClick();
}

/**
 *
 * @param cardIndex
 */
function addEventOnImageClick(cardIndex) {
    $(`#${cardIndex}`).click(() => {
        onImageClick(cardIndex);
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
    isEasyMode = easyMode;
    resetGame();
}
