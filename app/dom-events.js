function addDomEvents() {
    addEventOnDifficultyClick();
}

function addEventOnImageClick(colIdSelector) {
    $(colIdSelector).click(() => {
        onImageClick(colIdSelector);
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
