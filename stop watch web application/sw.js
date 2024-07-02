let startTime, updatedTime, difference, tInterval;
let running = false;
let laps = [];

const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsContainer = document.getElementById('laps');

function startStopwatch() {
    startTime = new Date().getTime();
    tInterval = setInterval(updateTime, 1);
    startStopButton.innerHTML = 'Stop';
    running = true;
}

function stopStopwatch() {
    clearInterval(tInterval);
    startStopButton.innerHTML = 'Start';
    running = false;
}

function resetStopwatch() {
    clearInterval(tInterval);
    display.innerHTML = '00:00:00';
    startStopButton.innerHTML = 'Start';
    running = false;
    laps = [];
    renderLaps();
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    display.innerHTML = timeToString(difference);
}

function timeToString(time) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);

    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);

    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);

    let diffInMs = (diffInSec - ss) * 100;
    let ms = Math.floor(diffInMs);

    let formattedHH = hh.toString().padStart(2, '0');
    let formattedMM = mm.toString().padStart(2, '0');
    let formattedSS = ss.toString().padStart(2, '0');
    let formattedMS = ms.toString().padStart(2, '0');

    return `${formattedHH}:${formattedMM}:${formattedSS}`;
}

function recordLap() {
    if (running) {
        laps.push(timeToString(difference));
        renderLaps();
    }
}

function renderLaps() {
    lapsContainer.innerHTML = laps.map(lap => `<li>${lap}</li>`).join('');
}

startStopButton.addEventListener('click', () => {
    if (!running) {
        startStopwatch();
    } else {
        stopStopwatch();
    }
});

resetButton.addEventListener('click', resetStopwatch);
lapButton.addEventListener('click', recordLap);
