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

//Prototype changement image
function switchImg() {
    $('#1').click(() => {
        $('#1 img:first-child').hide();
        $('#1 img:nth-child(2)').show();
    })
}
