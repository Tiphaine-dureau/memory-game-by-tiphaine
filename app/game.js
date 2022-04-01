/**
 * Gestion du timer et de la barre de progression
 * A la fin du timer appelle  l'évènement de partie perdue
 */
function startCountdown() {
    const timeTickMax = (g_maxTime * 1000) / g_refreshRate;
    g_timeTickLeft = timeTickMax;
    $('#countdown-bar').addClass('progress-bar-animated');
    g_gameTimer = setInterval(function () {
        g_timeTickLeft--;
        updateProgressBar(timeTickMax);
        $('#countdown').html(`${getTimeLeftInSeconds()}s`);
        if (g_timeTickLeft <= 0) {
            handleGameLost();
        }
    }, g_refreshRate);
}

/**
 * Commence le jeu et le timer si la partie n'est pas active
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
 * Gère le clic sur une carte :
 * - Ne fait rien si l'utilisateur ne peut pas jouer ou si la carte est déjà révélée
 * - Si la partie n'est pas active elle le devient
 * @param {number} cardIndex
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
 * Stocke l'index de la première carte cliquée
 * @param {number} cardIndex
 */
function onFirstCardClick(cardIndex) {
    g_firstCardIndex = cardIndex;
}

/**
 * Au click sur la seconde image, traite les deux cartes retournées par l'utilisateur
 * @param {number} secondCardIndex
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
 * @param {number} secondCardIndex
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
 * S'il y a paire : stocke les deux index des cartes dans un tableau
 * Vérifie si le tableau est complet et si c'est le cas gère l'évènement de partie gagnante
 * @param {number} secondCardIndex
 */
function handleSameCards(secondCardIndex) {
    g_firstCardIndex = undefined;
    g_foundCardPairIndex.push(g_firstCardIndex, secondCardIndex);
    const isGameWon = getIsGameWon();
    if (isGameWon) {
        handleGameWon();
    }
}

/**
 * Révèle une carte masquée ou masque une carte révélée
 * @param {number} cardIndex
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