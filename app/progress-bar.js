/**
 * Baisse la progress bar en fonction du temps restant et change sa couleur en fonction du % restant
 * @param timeLeft
 * @param maxTime
 */
function updateProgressBar(timeLeft, maxTime) {
    const currentPercent = ((1 * timeLeft) / maxTime) * 100;
    setProgressBarWidth(currentPercent);
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
    changeBackgroundClass('.progress-bar', backgroundClass);
}

/**
 * Initialise la taille de remplissage de la progress barre
 * @param percent
 */
function setProgressBarWidth(percent = 100) {
    $('#load').css('width', `${percent}%`);
}

/**
 * Réinitialise la progressBar : remplissage et couleur
 */
function resetProgressBar() {
    setProgressBarWidth();
    changeProgressBarColor('bg-success');
}