//////////////////
/// VARIABLES GLOBALES
//////////////////
/**
 * Compte à rebours de la partie
 */
let g_gameTimer;
/**
 * La partie s'active dès que l'utilisateur clique sur une carte
 * Elle est inactive quand la partie se termine
 * @type {boolean}
 */
let g_isGameActive = false;
/**
 * Mode de difficulté (peut être modifié par l'utilisateur)
 * @type {boolean}
 */
let g_isEasyMode = true;
/**
 * Tableau de cartes en fonction du mode de difficulté
 */
let g_loadedCards = easyBoardCards;
/**
 * Stocke l'index de la 1ère carte retournée
 * @type {number}
 */
let g_firstCardIndex;
/**
 * Quand l'utilisateur retourne 2 cartes différentes, on applique un timer pendant lequel il ne peut pas jouer
 * @type {boolean}
 */
let g_userCanPlay = true;
/**
 * Stocke les index des paires de cartes trouvées
 * @type {number[]}
 */
let g_foundCardPairIndex = [];
/**
 * Le temps du compte à rebours (en secondes)
 * @type {number}
 */
let g_maxTime;
/**
 * Le compte à rebours est mis à jour toutes les 100 millisecondes
 * Pour maxTime = 60 secondes * 1000 = 60 000 millisecondes
 * Donc on aura 60 000 / 100 = 600 ticks
 * Stocke le nombre de tick restant avant la fin du compte à rebours
 * @type {number}
 */
let g_timeTickLeft;
/**
 * Taux de rafraichissement du compte à rebours (en millisecondes)
 * @type {number}
 */
let g_refreshRate = 100;

/**
 * Initialisation par jquery
 */
$(document).ready(() => {
    init();
});

/**
 * Initialise le jeu en le plaçant dans un état par défault
 * Attache des évènements aux actions DOM de l'utilisateur
 */
function init() {
    resetGame();
    addDomEvents();
}