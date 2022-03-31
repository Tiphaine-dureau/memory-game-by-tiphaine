function addDomEvents() {
    addEventOnDifficultyClick();
}

function addEventOnImageClick(cardIndex) {
    $(`#${cardIndex}`).click(() => {
        onImageClick(cardIndex);
    });
}

function addEventOnDifficultyClick() {
    $('#btn-radio-easy').click(() => onDifficultyClick(true));
    $('#btn-radio-hard').click(() => onDifficultyClick(false));
}

function onDifficultyClick(easyMode) {
    isEasyMode = easyMode;
    resetGame();
}
