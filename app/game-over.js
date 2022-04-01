/**
 * Gère la fin d'une partie perdue :
 * - réinitialise le chrono
 * - fait apparaitre un toast
 * - réinitialise la partie
 */
function handleGameLost() {
    clearInterval(g_gameTimer);
    openToast(false);
    resetGame();
}

/**
 * Gère la fin d'une partie gagnée :
 * - fait apparaitre un feedback (toast bootstrap)
 * - puis réinitialise la partie
 */
function handleGameWon() {
    openToast();
    resetGame();
}

/**
 * Réintialise l'état du jeu
 */
function resetGame() {
    g_maxTime = g_isEasyMode ? 60 : 45;
    g_isGameActive = false;
    g_firstCardIndex = undefined;
    g_foundCardPairIndex = [];
    clearInterval(g_gameTimer);
    $('#countdown').html(`${g_maxTime}s`);
    resetProgressBar();
    createBoardGame();
}