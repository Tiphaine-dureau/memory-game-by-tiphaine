/**
 * Gestion du timer et de la barre de progression
 * A la fin du timer appelle  l'évènement de partie perdue
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
 * Commence le jeu et le timer
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
 * Au clic sur la première carte commence le jeu, switch l'image et récupère son index
 * Au click sur la seconde carte : switch l'image, récupère l'index de la carte et compare les cartes
 * @param cardIndex
 */
function onCardClick(cardIndex) {
    if (!g_userCanPlay || isCardRevealed(cardIndex)) {
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

/**
 * Garde l'index de la première carte cliquée
 * @param cardIndex
 */
function onFirstCardClick(cardIndex) {
    g_firstCardIndex = cardIndex;
}

/**
 * Au click sur la seconde image vérifie si les cartes sont identiques et agit en conséquence
 * @param secondCardIndex
 */
function onSecondCardClick(secondCardIndex) {
    const isSameCard = g_loadedCards[secondCardIndex].name === g_loadedCards[g_firstCardIndex].name;
    if (!isSameCard) {
        handleDifferentCards(secondCardIndex);
    } else {
        handleSameCards(secondCardIndex);
    }
}

/**
 * Si les cartes sont différentes : retourne les deux cartes après un certain temps
 * @param secondCardIndex
 */
function handleDifferentCards(secondCardIndex) {
    g_userCanPlay = false;
    setTimeout(() => {
        toggleCard(secondCardIndex);
        toggleCard(g_firstCardIndex);
        g_firstCardIndex = undefined;
        g_userCanPlay = true;
    }, 500)
}

/**
 * Si il y a paire : mets les deux index de carte dans un tableau
 * Vérifie si le tableau est complet et si c'est le cas gère l'évènement de partie gagante
 * @param secondCardIndex
 */
function handleSameCards(secondCardIndex) {
    g_firstCardIndex = undefined;
    g_foundCardPairIds.push(g_firstCardIndex, secondCardIndex);
    const isGameWon = getIsGameWon();
    if (isGameWon) {
        handleGameWon();
    }
}

/**
 * Gère le switch des cartes
 * @param cardIndex
 */
function toggleCard(cardIndex) {
    const backFaceSelector = getBackFaceSelector(cardIndex);
    const frontFaceSelector = getFrontFaceSelector(cardIndex);
    if (isCardRevealed(cardIndex)) {
        $(backFaceSelector).show();
        $(frontFaceSelector).hide();
    } else {
        $(backFaceSelector).hide();
        $(frontFaceSelector).show();
    }
}