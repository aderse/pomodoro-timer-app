let timer;
let timeLeft = 1500; // 25 minutes in seconds
let isRunning = false;

document.getElementById('toggle-dark-mode').addEventListener('click', async () => {
    const isDarkMode = await window.darkMode.toggle()
    document.getElementById('theme-source').innerHTML = isDarkMode ? 'Dark' : 'Light'
})

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const displayTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    document.getElementById('time-display').textContent = displayTime;
}

document.getElementById('start-button').addEventListener('click', () => {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
        document.getElementById('start-button').textContent = 'Start';
    } else {
        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateDisplay();
            } else {
                clearInterval(timer);
                alert('Pomodoro session finished!');
                timeLeft = 1500;
                updateDisplay();
            }
        }, 1000);
        isRunning = true;
        document.getElementById('start-button').textContent = 'Pause';
    }
});

document.getElementById('reset-button').addEventListener('click', () => {
    clearInterval(timer);
    timeLeft = 1500;
    updateDisplay();
    isRunning = false;
    document.getElementById('start-button').textContent = 'Start';
});

updateDisplay(); // Initial display update
