//////////////////
/// VARIABLES
//////////////////
let g_gameTimer;
let g_isGameActive = false;
let g_isEasyMode = true;
let g_loadedCards = easyBoardCards;
let g_firstCardIndex;
let g_userCanPlay = true;
let g_foundCardPairIds = [];
let g_maxTime = 60; // en secondes
let g_timeTickLeft;

$(document).ready(() => {
    init();
});

/**
 * Réinitialise le jeu au choix de la difficulté
 */
function init() {
    addDomEvents();
    resetGame();
}