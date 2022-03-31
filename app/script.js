//////////////////
/// VARIABLES
//////////////////
let gameTimer;
let isGameActive = false;
let isEasyMode = true;
let loadedCards = easyBoardCards;
let firstCardIndex;
let userCanPlay = true;
let foundCardPairIds = [];
let maxTime = 60; // en secondes
let timeTickLeft;

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