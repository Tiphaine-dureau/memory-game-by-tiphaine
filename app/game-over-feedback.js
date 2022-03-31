function openToast(isGameWon = true) {
    let toastLiveExample = document.getElementById('liveToast');
    let toast = new bootstrap.Toast(toastLiveExample);
    changeBackgroundClass('#toastText', isGameWon ? 'bg-success' : 'bg-danger');
    $('#toastTitle').html(isGameWon ? 'Bravo !' : 'Temps écoulé !');
    $('#toastText').html(isGameWon ? `Vous avez gagné en ${g_maxTime - (g_timeTickLeft / 10).toFixed(0)}s` : 'Vous avez perdu :(');
    toast.show();
}
