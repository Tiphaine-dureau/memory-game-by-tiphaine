//////////////////
/// VARIABLES
//////////////////
let timer;

$(document).ready(() => {
    init();
});

function init() {
    handlePlay();
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

let easyBoardCards = [
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
        name: 'pig',
        img: 'assets/images/img-easy/pig.svg'
    },
    {
        id: 8,
        name: 'polar-bear',
        img: 'assets/images/img-easy/polar-bear.svg'
    },
    {
        id: 9,
        name: 'rabbit',
        img: 'assets/images/img-easy/rabbit.svg'
    },
    {
        id: 10,
        name: 'sheep',
        img: 'assets/images/img-easy/sheep.svg'
    },
    {
        id: 11,
        name: 'sperm-whale',
        img: 'assets/images/img-easy/whale.svg'
    },
    {
        id: 12,
        name: 'tortoise',
        img: 'assets/images/img-easy/tortoise.svg'
    }
]
