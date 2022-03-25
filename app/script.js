//////////////////
/// VARIABLES
//////////////////
let timer;

$(document).ready(() => {
    init();
});

function init() {
    handlePlay();
    createBoardGame();
}

/**
 * Au clic déclenche le chrono et la barre de progression.
 */
function handlePlay() {
    $('#start').click(function () {
        const maxTime = 20; // secondes
        let timeLeft = maxTime;
        $('#start').attr('disabled', true);
        timer = setInterval(function () {
            timeLeft--;
            updateProgressBar(timeLeft, maxTime);
            $('#countdown').html(`${timeLeft} secondes restantes`);
            if (timeLeft <= 0) {
                handleEndGame();
            }
        }, 1000);
    })
}

/**
 * Gère la fin d'une partie
 */
function handleEndGame() {
    clearInterval(timer);
    $('#start').attr('disabled', false);
    $('#countdown').html('Temps écoulé !');
}

/**
 * Baisse la progress bar en fonction du temps restant et change sa couleur en fonction du % restant
 * @param timeLeft
 * @param maxTime
 */
function updateProgressBar(timeLeft, maxTime) {
    const currentPercent = ((1 * timeLeft) / maxTime) * 100;
    $('#load').css('width', `${currentPercent}%`);
    if (currentPercent <= 50 && currentPercent > 10) {
        changeProgressBarColor('bg-warning');
    } else if (currentPercent <= 10) {
        changeProgressBarColor('bg-danger');
    }
}

/**
 * Change la couleur du background de la progress bar
 * @param backgroundClass (bg-success | bg-warning | bg-danger)
 */
function changeProgressBarColor(backgroundClass) {
    $('.progress-bar')
        .removeClass('bg-success')
        .removeClass('bg-warning')
        .removeClass('bg-danger')
        .addClass(backgroundClass);
}

// Déclaration du tableau de cartes

const easyBoardCards = [
    {
        id: 1,
        name: 'butterfly',
        img: 'assets/images/img-easy/butterfly.svg',
    },
    {
        id: 2,
        name: 'elephant',
        img: 'assets/images/img-easy/elephant.svg'
    },
    {
        id: 3,
        name: 'flamingo',
        img: 'assets/images/img-easy/flamingo.svg'
    },
    {
        id: 4,
        name: 'frog',
        img: 'assets/images/img-easy/frog.svg'
    },
    {
        id: 5,
        name: 'koala',
        img: 'assets/images/img-easy/koala.svg'
    },
    {
        id: 6,
        name: 'octopus',
        img: 'assets/images/img-easy/octopus.svg'
    },
    {
        id: 7,
        name: 'sperm-whale',
        img: 'assets/images/img-easy/whale.svg'
    },
    {
        id: 8,
        name: 'tortoise',
        img: 'assets/images/img-easy/tortoise.svg'
    },
    {
        id: 9,
        name: 'butterfly',
        img: 'assets/images/img-easy/butterfly.svg',
    },
    {
        id: 10,
        name: 'elephant',
        img: 'assets/images/img-easy/elephant.svg'
    },
    {
        id: 11,
        name: 'flamingo',
        img: 'assets/images/img-easy/flamingo.svg'
    },
    {
        id: 12,
        name: 'frog',
        img: 'assets/images/img-easy/frog.svg'
    },
    {
        id: 13,
        name: 'koala',
        img: 'assets/images/img-easy/koala.svg'
    },
    {
        id: 14,
        name: 'octopus',
        img: 'assets/images/img-easy/octopus.svg'
    },
    {
        id: 15,
        name: 'sperm-whale',
        img: 'assets/images/img-easy/whale.svg'
    },
    {
        id: 16,
        name: 'tortoise',
        img: 'assets/images/img-easy/tortoise.svg'
    },
]

//Prototype changement image
function switchImg() {
    $('#1').click(() => {
        $('#1 img:first-child').hide();
        $('#1 img:nth-child(2)').show();
    })
}

/**
 * Affiche dynamiquement et aléatoirement les cases du plateau de jeu
 */
function createBoardGame() {
    shuffleCards(easyBoardCards);
    const sqrtBoard = Math.sqrt(easyBoardCards.length);
    for (let i = 0; i < sqrtBoard; i++) {
        const rowElement = `<div class="row" id="${i}"></div>`
        $('#game-board').append(rowElement)
        for (let j = 0; j < sqrtBoard; j++) {
            const colElement = `<div class="col" id="${j}-${i}"></div>`
            const rowId = `#${i}`
            $(rowId).append(colElement)
            const colId = `#${j}-${i}`
            const currentCardId = (i * sqrtBoard) + j;
            const cardImgSrc = easyBoardCards[currentCardId].img;
            const imgElement = `<img src=${cardImgSrc} alt="images du jeu"/>`;
            $(colId).append(imgElement);
        }
    }
}

/**
 * Mélange les cartes en utilisant l'algo de Durstenfeld
 * @param cards
 */
function shuffleCards(cards) {
    for (let i = cards.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
}