/**
 * Gère la fin d'une partie perdue
 */
function handleGameLost() {
    clearInterval(gameTimer);
    openToast(false);
    resetGame();
}

/**
 * Gère la fin d'une partie gagnée
 */
function handleGameWon() {
    openToast();
    resetGame();
}

function resetGame() {
    isGameActive = false;
    firstCardIndex = undefined;
    foundCardPairIds = [];
    clearInterval(gameTimer);
    $('#countdown').html(`${maxTime}s`);
    resetProgressBar();
    createBoardGame();
}