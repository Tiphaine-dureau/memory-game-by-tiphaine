/**
 * Gestion du timer et de la barre de progression
 * A la fin du Chrono appelle un évènement de partie perdue
 */
function startCountdown() {
    const numberOfTick = g_maxTime /* secondes */ * 10;
    g_timeTickLeft = numberOfTick;
    g_gameTimer = setInterval(function () {
        g_timeTickLeft--;
        updateProgressBar(g_timeTickLeft, numberOfTick);
        $('#countdown').html(`${(g_timeTickLeft / 10).toFixed(0)}s`);
        if (g_timeTickLeft <= 0) {
            handleGameLost();
        }
    }, 100);
}

/**
 * Commence le jeu et le chrono
 * On va regarder a chaque clic d'une carte si on doit démarrer la partie
 * (puisqu'il n'y a pas de bouton jouer)
 */
function startGameIfNotActive() {
    if (!g_isGameActive) {
        startCountdown();
        g_isGameActive = true;
    }
}

/**
 * Gère le click sur une carte
 * @param cardIndex
 */
function onCardClick(cardIndex) {
    if (!g_userCanPlay || isCardRevealed(getBackFaceSelector(cardIndex))) {
        return;
    }
    startGameIfNotActive();
    toggleCard(cardIndex);
    if (g_firstCardIndex === undefined) {
        onFirstCardClick(cardIndex);
    } else {
        onSecondCardClick(cardIndex);
    }
}

function onFirstCardClick(cardIndex) {
    g_firstCardIndex = cardIndex;
}

function onSecondCardClick(secondCardIndex) {
    const isSameCard = g_loadedCards[secondCardIndex].name === g_loadedCards[g_firstCardIndex].name;
    if (!isSameCard) {
        handleDifferentCards(secondCardIndex);
    } else {
        handleSameCards(secondCardIndex);
    }
}

function handleDifferentCards(secondCardIndex) {
    g_userCanPlay = false;
    setTimeout(() => {
        toggleCard(secondCardIndex);
        toggleCard(g_firstCardIndex);
        g_firstCardIndex = undefined;
        g_userCanPlay = true;
    }, 500)
}

function handleSameCards(secondCardIndex) {
    g_firstCardIndex = undefined;
    g_foundCardPairIds.push(g_firstCardIndex, secondCardIndex);
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