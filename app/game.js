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
 * @param cardIndex
 */
function onImageClick(cardIndex) {
    if (!userCanPlay) {
        return;
    }
    startGameIfNotActive();
    const backFaceSelector = getBackFaceSelector(cardIndex);
    const frontFaceSelector = getFrontFaceSelector(cardIndex);
    if ($(backFaceSelector).css('display') !== 'none') {
        $(backFaceSelector).hide();
        $(frontFaceSelector).show();
    } else {
        return;
    }
    if (firstCardIndex === undefined) {
        firstCardIndex = cardIndex;
    } else {
        const secondCardIndex = cardIndex;
        const isSameCard = loadedCards[secondCardIndex].name === loadedCards[firstCardIndex].name;
        if (!isSameCard) {
            userCanPlay = false;
            setTimeout(() => {
                // Carte qui vient d'être cliquée
                $(backFaceSelector).show();
                $(frontFaceSelector).hide();
                // Première carte déjà retournée
                $(getBackFaceSelector(firstCardIndex)).show();
                $(getFrontFaceSelector(firstCardIndex)).hide();
                firstCardIndex = undefined;
                userCanPlay = true;
            }, 500)
        } else {
            firstCardIndex = undefined;
            foundCardPairIds.push(firstCardIndex, secondCardIndex);
            const isGameWon = getIsGameWon();
            if (isGameWon) {
                handleGameWon();
            }
        }
    }
}