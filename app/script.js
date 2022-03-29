//////////////////
/// VARIABLES
//////////////////
let timer;
let isGameActive = false;
let isEasyMode = true;
let loadedCards = easyBoardCards;


$(document).ready(() => {
    init();
});

function init() {
    addEventOnDifficultyClick();
    createBoardGame();
}

/**
 * Au clic déclenche le chrono et la barre de progression.
 */
function handlePlay() {
    if (!isGameActive) {
        isGameActive = true;
        const maxTime = 90 /* secondes */ * 10;
        let timeLeft = maxTime;
        timer = setInterval(function () {
            timeLeft--;
            updateProgressBar(timeLeft, maxTime);
            $('#countdown').html(`${(timeLeft / 10).toFixed(0)} secondes restantes`);
            if (timeLeft <= 0) {
                handleEndGame();
            }
        }, 100);
    }
}

/**
 * Gère la fin d'une partie
 */
function handleEndGame() {
    clearInterval(timer);
    $('#countdown').html('Temps écoulé !');
}

/**
 * Baisse la progress bar en fonction du temps restant et change sa couleur en fonction du % restant
 * @param timeLeft
 * @param maxTime
 */
function updateProgressBar(timeLeft, maxTime) {
    const currentPercent = ((1 * timeLeft) / maxTime) * 100;
    $('#load').css('width', `${currentPercent}%`);
    if (currentPercent <= 50 && currentPercent > 10) {
        changeProgressBarColor('bg-warning');
    } else if (currentPercent <= 10) {
        changeProgressBarColor('bg-danger');
    }
}

/**
 * Change la couleur du background de la progress bar
 * @param backgroundClass (bg-success | bg-warning | bg-danger)
 */
function changeProgressBarColor(backgroundClass) {
    $('.progress-bar')
        .removeClass('bg-success')
        .removeClass('bg-warning')
        .removeClass('bg-danger')
        .addClass(backgroundClass);
}

/**
 * Au clic affiche la face ou le dos de l'image en fonction ce qui est déjà visible
 * @param colIdSelector
 */
function onImageClick(colIdSelector) {
    handlePlay()
    const backFaceSelector = `${colIdSelector} img:first-child`;
    const frontFaceSelector = `${colIdSelector} img:nth-child(2)`;
    if ($(backFaceSelector).css('display') !== 'none') {
        $(backFaceSelector).hide();
        $(frontFaceSelector).show();
    }
}

function onDifficultyClick(easyMode) {
    isEasyMode = easyMode;
    createBoardGame();
}

function addEventOnDifficultyClick() {
    $('#btn-radio-easy').click(() => onDifficultyClick(true));
    $('#btn-radio-hard').click(() => onDifficultyClick(false));

}
