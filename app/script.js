$(document).ready(() => {
    $('#start').click(function () {
        let timerId, percent;
        // reset progress bar
        percent = 100;
        $('#start').attr('disabled', true);
        timerId = setInterval(function () {
            // increment progress bar
            percent -= 1;
            $('#load').html(percent + '%').css('width', percent + '%');

            if (percent <= 10) {
                $('.progress-bar').css('color', 'red');
            }
            if (percent === 0){
                clearInterval(timerId);
                $('#start').attr('disabled', false);
            }
        }, 1000);
})});


