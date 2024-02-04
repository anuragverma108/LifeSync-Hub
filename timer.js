// timer.js

function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function startCountdown(duration) {
    let timer = duration;
    const countdownElement = document.getElementById('countdown');

    setInterval(function () {
        countdownElement.textContent = formatTime(timer);
        if (--timer < 0) {
            clearInterval(countdownTimer);
            alert("Time's up!");
        }
    }, 1000);
}
