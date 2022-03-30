//////////////////
/// VARIABLES
//////////////////
let gameTimer;
let isGameActive = false;
let isEasyMode = true;
let loadedCards = easyBoardCards;
let firstCardIdSelector;
let userCanPlay = true;
let foundCardPairIds = [];
let maxTime = 90; // en secondes
let timeTickLeft;


$(document).ready(() => {
    init();
});

function init() {
    addEventOnDifficultyClick();
    resetGame();
}

/**
 * Au clic déclenche le chrono et la barre de progression.
 */
function startGameIfInactive() {
    if (!isGameActive) {
        isGameActive = true;
        const numberOfTick = maxTime /* secondes */ * 10;
        timeTickLeft = numberOfTick;
        gameTimer = setInterval(function () {
            timeTickLeft--;
            updateProgressBar(timeTickLeft, numberOfTick);
            $('#countdown').html(`${(timeTickLeft / 10).toFixed(0)}s`);
            if (timeTickLeft <= 0) {
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
    openToast(false);
    resetGame();
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
    changeBackgroundClass('.progress-bar', backgroundClass);
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
    if (!userCanPlay) {
        return;
    }
    startGameIfInactive();
    const backFaceSelector = getBackFaceSelector(colIdSelector);
    const frontFaceSelector = getFrontFaceSelector(colIdSelector);
    if ($(backFaceSelector).css('display') !== 'none') {
        $(backFaceSelector).hide();
        $(frontFaceSelector).show();
    } else {
        return;
    }
    if (firstCardIdSelector === undefined) {
        firstCardIdSelector = colIdSelector;
    } else {
        const firstCardId = getCardIdFromSelector(firstCardIdSelector);
        const secondCardId = getCardIdFromSelector(colIdSelector);
        const isSameCard = loadedCards[secondCardId].name === loadedCards[firstCardId].name;
        if (!isSameCard) {
            userCanPlay = false;
            setTimeout(() => {
                // Carte qui vient d'être cliquée
                $(backFaceSelector).show();
                $(frontFaceSelector).hide();
                // Première carte déjà retournée
                $(getBackFaceSelector(firstCardIdSelector)).show();
                $(getFrontFaceSelector(firstCardIdSelector)).hide();
                firstCardIdSelector = undefined;
                userCanPlay = true;
            }, 500)
        } else {
            firstCardIdSelector = undefined;
            foundCardPairIds.push(firstCardId, secondCardId);
            const isGameWon = getIsGameWon();
            if (isGameWon) {
                handleGameWon();
            }
        }
    }
}

function handleGameWon() {
    openToast();
    resetGame();
}

function onDifficultyClick(easyMode) {
    isEasyMode = easyMode;
    resetGame();
}

function addEventOnDifficultyClick() {
    $('#btn-radio-easy').click(() => onDifficultyClick(true));
    $('#btn-radio-hard').click(() => onDifficultyClick(false));

}

function resetGame() {
    isGameActive = false;
    firstCardIdSelector = undefined;
    foundCardPairIds = [];
    clearInterval(gameTimer);
    $('#countdown').html(`${maxTime}s`);
    resetProgressBar();
    createBoardGame();
}

function openToast(isGameWon = true) {
    let toastLiveExample = document.getElementById('liveToast');
    let toast = new bootstrap.Toast(toastLiveExample);
    changeBackgroundClass('#toastText', isGameWon ? 'bg-success' : 'bg-danger');
    $('#toastTitle').html(isGameWon ? 'Bravo !' : 'Temps écoulé !');
    $('#toastText').html(isGameWon ? `Vous avez gagné en ${maxTime - (timeTickLeft / 10).toFixed(0)}s` : 'Vous avez perdu :(');
    toast.show();
}
