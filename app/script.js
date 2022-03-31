//////////////////
/// VARIABLES
//////////////////
let gameTimer;
let isGameActive = false;
let isEasyMode = true;
let loadedCards = easyBoardCards;
let firstCardIdSelector;
let userCanPlay = true;
let foundCardPairIds = [];
let maxTime = 60; // en secondes
let timeTickLeft;

$(document).ready(() => {
    init();
});

function init() {
    addDomEvents();
    resetGame();
}