/**
 * Gestion du timer et de la barre de progression
 * A la fin du Chrono appelle un évènement de partie perdue
 */
function startCountdown() {
    const numberOfTick = maxTime /* secondes */ * 10;
    timeTickLeft = numberOfTick;
    gameTimer = setInterval(function () {
        timeTickLeft--;
        updateProgressBar(timeTickLeft, numberOfTick);
        $('#countdown').html(`${(timeTickLeft / 10).toFixed(0)}s`);
        if (timeTickLeft <= 0) {
            handleGameLost();
        }
    }, 100);
}

/**
 * Commence le jeu et le chrono
 * On va regarder a chaque clic d'image si on doit démarrer la partie
 * (puisqu'il n'y a pas de bouton jouer)
 */
function startGameIfNotActive() {
    if (!isGameActive) {
        startCountdown();
        isGameActive = true;
    }
}

/**
 * Gère le click sur une image
 * @param cardIndex
 */
function onImageClick(cardIndex) {
    if (!userCanPlay || isCardRevealed(getBackFaceSelector(cardIndex))) {
        return;
    }
    startGameIfNotActive();
    toggleCard(cardIndex);
    if (firstCardIndex === undefined) {
        onFirstImageClick(cardIndex);
    } else {
        onSecondImageClick(cardIndex);
    }
}

function onFirstImageClick(cardIndex) {
    firstCardIndex = cardIndex;
}

function onSecondImageClick(secondCardIndex) {
    const isSameCard = loadedCards[secondCardIndex].name === loadedCards[firstCardIndex].name;
    if (!isSameCard) {
        handleDifferentCards(secondCardIndex);
    } else {
        handleSameCards(secondCardIndex);
    }
}

function handleDifferentCards(secondCardIndex) {
    userCanPlay = false;
    setTimeout(() => {
        toggleCard(secondCardIndex);
        toggleCard(firstCardIndex);
        firstCardIndex = undefined;
        userCanPlay = true;
    }, 500)
}

function handleSameCards(secondCardIndex) {
    firstCardIndex = undefined;
    foundCardPairIds.push(firstCardIndex, secondCardIndex);
    const isGameWon = getIsGameWon();
    if (isGameWon) {
        handleGameWon();
    }
}

function toggleCard(cardIndex) {
    const backFaceSelector = getBackFaceSelector(cardIndex);
    const frontFaceSelector = getFrontFaceSelector(cardIndex);
    if (isCardRevealed(getBackFaceSelector(cardIndex))) {
        $(backFaceSelector).show();
        $(frontFaceSelector).hide();
    } else {
        $(backFaceSelector).hide();
        $(frontFaceSelector).show();
    }
}