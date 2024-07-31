let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const displayElement = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsElement = document.getElementById('laps');

function updateDisplay(time) {
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);

    displayElement.innerHTML = 
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startStop() {
    if (isRunning) {
        clearInterval(timerInterval);
        startStopBtn.innerText = 'Start';
    } else {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(function printTime() {
            elapsedTime = Date.now() - startTime;
            updateDisplay(elapsedTime);
        }, 1000);  // Update every second
        startStopBtn.innerText = 'Pause';
    }
    isRunning = !isRunning;
}

function reset() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    updateDisplay(elapsedTime);
    startStopBtn.innerText = 'Start';
    isRunning = false;
    lapsElement.innerHTML = '';
}

function recordLap() {
    if (isRunning) {
        const lapTime = document.createElement('li');
        lapTime.innerText = displayElement.innerText;
        lapsElement.appendChild(lapTime);
    }
}

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);
