//////////////////
/// VARIABLES
//////////////////
let gameTimer;
let isGameActive = false;
let isEasyMode = true;
let loadedCards = easyBoardCards;
let firstCardIdSelector;


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
function startGameIfInactive() {
    if (!isGameActive) {
        isGameActive = true;
        const maxTime = 90 /* secondes */ * 10;
        let timeLeft = maxTime;
        gameTimer = setInterval(function () {
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
    clearInterval(gameTimer);
    $('#countdown').html('Temps écoulé !');
}

/**
 * Baisse la progress bar en fonction du temps restant et change sa couleur en fonction du % restant
 * @param timeLeft
 * @param maxTime
 */
function updateProgressBar(timeLeft, maxTime) {
    const currentPercent = ((1 * timeLeft) / maxTime) * 100;
    setProgressBarWidth(currentPercent);
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

function setProgressBarWidth(percent = 100) {
    $('#load').css('width', `${percent}%`);
}

function resetProgressBar() {
    setProgressBarWidth();
    changeProgressBarColor('bg-success');
}

/**
 * Au clic affiche la face ou le dos de l'image en fonction ce qui est déjà visible
 * @param colIdSelector
 */
function onImageClick(colIdSelector) {
    startGameIfInactive();
    const backFaceSelector = getBackFaceSelector(colIdSelector);
    const frontFaceSelector = getFrontFaceSelector(colIdSelector);
    if ($(backFaceSelector).css('display') !== 'none') {
        $(backFaceSelector).hide();
        $(frontFaceSelector).show();
    }
    if (firstCardIdSelector === undefined) {
        firstCardIdSelector = colIdSelector;
    } else {
        const firstCardId = getCardIdFromSelector(firstCardIdSelector);
        const secondCardId = getCardIdFromSelector(colIdSelector);
        const isSameCard = loadedCards[secondCardId].name === loadedCards[firstCardId].name;
        if (!isSameCard) {
            setTimeout(() => {
                // Carte qui vient d'être cliquée
                $(backFaceSelector).show();
                $(frontFaceSelector).hide();
                // Première carte déjà retournée
                $(getBackFaceSelector(firstCardIdSelector)).show();
                $(getFrontFaceSelector(firstCardIdSelector)).hide();
            }, 1000)
        }
    }
}

function onDifficultyClick(easyMode) {
    isEasyMode = easyMode;
    if (isGameActive) {
        resetGame();
    }
    createBoardGame();
}

function addEventOnDifficultyClick() {
    $('#btn-radio-easy').click(() => onDifficultyClick(true));
    $('#btn-radio-hard').click(() => onDifficultyClick(false));

}

function resetGame() {
    isGameActive = false;
    clearInterval(gameTimer);
    $('#countdown').html('');
    resetProgressBar();
}