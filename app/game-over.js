/**
 * Gère la fin d'une partie perdue : réinitialise chrono , fait apparaitre un toast, réinitialise la partie
 */
function handleGameLost() {
    clearInterval(gameTimer);
    openToast(false);
    resetGame();
}

/**
 * Gère la fin d'une partie gagnée : fait apparaitre un toast, réintialise la partie
 */
function handleGameWon() {
    openToast();
    resetGame();
}

/**
 * Réintialise la partie
 */
function resetGame() {
    isGameActive = false;
    firstCardIndex = undefined;
    foundCardPairIds = [];
    clearInterval(gameTimer);
    $('#countdown').html(`${maxTime}s`);
    resetProgressBar();
    createBoardGame();
}