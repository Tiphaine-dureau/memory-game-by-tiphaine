/**
 * Baisse la progress bar en fonction du temps restant et change sa couleur en fonction du % restant
 * @param {number} timeTickMax
 */
function updateProgressBar(timeTickMax) {
    const currentPercent = (g_timeTickLeft / timeTickMax) * 100;
    setProgressBarWidth(currentPercent);
    if (currentPercent <= 50 && currentPercent > 10) {
        changeProgressBarColor('bg-warning');
    } else if (currentPercent <= 10) {
        changeProgressBarColor('bg-danger');
    }
}

/**
 * Change la couleur du background de la progress bar
 * @param {string} backgroundClass (bg-success | bg-warning | bg-danger)
 */
function changeProgressBarColor(backgroundClass) {
    changeBackgroundClass('.progress-bar', backgroundClass);
}

/**
 * Positionne le remplissage de la progress bar
 * @param {number} percent
 */
function setProgressBarWidth(percent) {
    $('#load').css('width', `${percent}%`);
}

/**
 * Réinitialise la progressBar : remplissage et couleur
 */
function resetProgressBar() {
    setProgressBarWidth(100);
    changeProgressBarColor('bg-success');
}