/**
 * Au clic sur carte, déclenche le chrono et la barre de progression
 * Appelle un évènement de fin de chrono
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

function startGameIfNotActive() {
    if (!isGameActive) {
        startCountdown();
        isGameActive = true;
    }
}

/**
 * Au clic affiche la face ou le dos de l'image en fonction ce qui est déjà visible
 * @param colIdSelector
 */
function onImageClick(colIdSelector) {
    if (!userCanPlay) {
        return;
    }
    startGameIfNotActive();
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