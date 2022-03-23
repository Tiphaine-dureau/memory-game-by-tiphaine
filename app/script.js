$(document).ready(() => {
    $('#start').click(function () {
        let timerId, percent;
        // reset progress bar
        percent = 100;
        $('#start').attr('disabled', true);
        timerId = setInterval(function () {
            // decrement progress bar
            percent -= 1;
            $('#load').html(percent + '%').css('width', percent + '%');
            if (percent <= 10) {
                $('.progress-bar').addClass('progress-bar-last-seconds').removeClass('progress-bar');
            }
            if (percent === 0) {
                clearInterval(timerId);
                $('#start').attr('disabled', false);
            }
        }, 1000);
        let timeLeft = percent;
        let downloadTimer = setInterval(function () {
            timeLeft -= 1;
            $('#countdown').html(timeLeft + ' secondes restantes');
            if (timeLeft <= 0) {
                clearInterval(downloadTimer);
                $('#countdown').html('Temps écoulé !');
            }
        }, 1000);
    })
});
