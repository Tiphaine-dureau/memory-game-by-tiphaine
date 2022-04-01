/**
 * Gère l'apparition du toast en fonction du statut de la fin de partie
 * @param {boolean} isGameWon
 */
function openToast(isGameWon = true) {
    let toastLiveExample = document.getElementById('liveToast');
    let toast = new bootstrap.Toast(toastLiveExample);
    changeBackgroundClass('#toastText', isGameWon ? 'bg-primary' : 'bg-danger');
    $('#toastTitle').html(isGameWon ? 'Bravo 🏆 !' : 'Temps écoulé !');
    $('#toastText').html(isGameWon ? `Vous avez gagné en ${g_maxTime - getTimeLeftInSeconds()}s` : 'Vous avez perdu 😔');
    toast.show();
}
