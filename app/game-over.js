/**
 * Gère la fin d'une partie perdue : réinitialise chrono , fait apparaitre un toast, réinitialise la partie
 */
function handleGameLost() {
    clearInterval(g_gameTimer);
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
    g_isGameActive = false;
    g_firstCardIndex = undefined;
    g_foundCardPairIds = [];
    clearInterval(g_gameTimer);
    $('#countdown').html(`${g_maxTime}s`);
    resetProgressBar();
    createBoardGame();
}