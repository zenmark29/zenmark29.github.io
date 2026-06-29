if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
}


document.addEventListener("DOMContentLoaded", function () {
    const formInputs = document.getElementById("inputFields");
    const nameInput = document.getElementById("timerName");
    const warmupInput = document.getElementById("warmup");
    const exerciseInput = document.getElementById("exercise");
    const restInput = document.getElementById("rest");
    const intervalsInput = document.getElementById("intervals");
    const saveBtn = document.getElementById("saveBtn");
    const startBtn = document.getElementById("startBtn");
    const settingsDisplay = document.getElementById("settingsDisplay");
    const statusDisplay = document.getElementById("status");
    const timerDisplay = document.getElementById("timerDisplay");
    const darkModeToggle = document.getElementById("darkModeToggle");
    const resetBtn = document.getElementById("resetBtn");
    const pauseBtn = document.getElementById("pauseBtn");
    const resumeBtn = document.getElementById("resumeBtn");
    const timerSelect = document.getElementById("timerSelect");
    const newTimerBtn = document.getElementById("newTimerBtn");
    const deleteBtn = document.getElementById("deleteBtn");
    let timerData = null;
    let timerStore = {};

    try {
        timerStore = JSON.parse(localStorage.getItem("intervalTimers")) || {};
    } catch (error) {
        timerStore = {};
    }

    let countdownTimer = null;
    let countdownState = null;

    function displaySettings() {
        settingsDisplay.innerHTML = `
            <h3>${timerData.name}</h3>
            <p>Warm-up: ${timerData.warmup} min</p>
            <p>Exercise: ${timerData.exercise} min</p>
            <p>Rest: ${timerData.rest} min</p>
            <p>Intervals: ${timerData.intervals}</p>
        `;
        formInputs.style.display = "none";
        saveBtn.style.display = "none";
        startBtn.style.display = "inline-block";
        resetBtn.style.display = "inline-block";
        deleteBtn.style.display = "none";
    }

    /**
     * Show the input fields and hide the settings display.
     * This function is called when the user wants to edit the timer settings.
     */
    function showInputs() {
        stopCountdown();
        countdownState = null;
        formInputs.style.display = "block";
        saveBtn.style.display = "inline-block";
        startBtn.style.display = "none";
        resetBtn.style.display = "none";
        pauseBtn.style.display = "none";
        resumeBtn.style.display = "none";
        deleteBtn.style.display = "none";
        settingsDisplay.innerHTML = "";
        timerDisplay.innerText = "";
        statusDisplay.innerText = "";
    }

    function populateTimerSelect() {
        timerSelect.innerHTML = "";

        const timerNames = Object.keys(timerStore);
        if (timerNames.length === 0) {
            const placeholder = document.createElement("option");
            placeholder.value = "";
            placeholder.textContent = "No saved timers";
            placeholder.disabled = true;
            placeholder.selected = true;
            timerSelect.appendChild(placeholder);
            return;
        }

        timerNames.forEach((key) => {
            const option = document.createElement("option");
            option.value = key;
            option.textContent = key;
            timerSelect.appendChild(option);
        });
    }

    function setFormValues(data) {
        nameInput.value = data.name;
        warmupInput.value = data.warmup;
        exerciseInput.value = data.exercise;
        restInput.value = data.rest;
        intervalsInput.value = data.intervals;
    }

    function loadTimer(name) {
        timerData = timerStore[name];
        setFormValues(timerData);
    }

    populateTimerSelect();

    timerSelect.addEventListener("change", function () {
        const selectedName = timerSelect.value;
        if (!selectedName) {
            return;
        }

        loadTimer(selectedName);
        displaySettings();
        deleteBtn.style.display = "inline-block";
    });

    newTimerBtn.addEventListener("click", function () {
        timerSelect.selectedIndex = -1;
        timerData = null;
        nameInput.value = "";
        warmupInput.value = "";
        exerciseInput.value = "";
        restInput.value = "";
        intervalsInput.value = "";
        deleteBtn.style.display = "none";
        showInputs();
        nameInput.focus && nameInput.focus();
    });

    if (timerStore && Object.keys(timerStore).length > 0) {
        const firstTimer = Object.keys(timerStore)[0];
        timerSelect.value = firstTimer;
        loadTimer(firstTimer);
        displaySettings();
    }

    // SAVE
    saveBtn.addEventListener("click", function () {
        const warmup = Number(warmupInput.value, 10);
        const exercise = Number(exerciseInput.value, 10);
        const rest = Number(restInput.value, 10);
        const intervals = parseInt(intervalsInput.value, 10);
        const name = nameInput.value.trim();

        if (!name || isNaN(warmup) || isNaN(exercise) || isNaN(rest) || isNaN(intervals) || warmup < 0 || exercise <= 0 || rest < 0 || intervals <= 0) {
            alert("Please enter valid values. Exercise must be non-zero. Intervals must be whole numbers.");
            return;
        }

        timerData = { name, warmup, exercise, rest, intervals };
        timerStore[name] = timerData;
        localStorage.setItem("intervalTimers", JSON.stringify(timerStore));
        populateTimerSelect();
        timerSelect.value = name;
        displaySettings();
        deleteBtn.style.display = "inline-block";
    });

    function stopCountdown() {
        if (countdownTimer) {
            clearInterval(countdownTimer);
            countdownTimer = null;
        }
    }

    function formatTime(totalSeconds) {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }

    function startCountdown({ label, durationSeconds, beepCount, onComplete }) {
        stopCountdown();

        countdownState = {
            label,
            remainingSeconds: durationSeconds,
            paused: false,
            onComplete,
        };

        statusDisplay.innerText = label;
        timerDisplay.innerText = formatTime(durationSeconds);
        playBeeps(beepCount);

        countdownTimer = setInterval(() => {
            if (!countdownState || countdownState.paused) {
                return;
            }

            countdownState.remainingSeconds -= 1;
            timerDisplay.innerText = formatTime(countdownState.remainingSeconds);

            if (countdownState.remainingSeconds <= 0) {
                stopCountdown();
                const complete = countdownState.onComplete;
                countdownState = null;
                complete();
            }
        }, 1000);
    }

    function pauseTimer() {
        if (!countdownState || countdownState.paused) {
            return;
        }

        countdownState.paused = true;
        stopCountdown();
        pauseBtn.style.display = "none";
        resumeBtn.style.display = "inline-block";
        resetBtn.style.display = "inline-block";
    }

    function resumeTimer() {
        if (!countdownState || !countdownState.paused) {
            return;
        }

        countdownState.paused = false;
        pauseBtn.style.display = "inline-block";
        resumeBtn.style.display = "none";
        resetBtn.style.display = "none";
        statusDisplay.innerText = countdownState.label;
        timerDisplay.innerText = formatTime(countdownState.remainingSeconds);

        countdownTimer = setInterval(() => {
            if (!countdownState || countdownState.paused) {
                return;
            }

            countdownState.remainingSeconds -= 1;
            timerDisplay.innerText = formatTime(countdownState.remainingSeconds);

            if (countdownState.remainingSeconds <= 0) {
                stopCountdown();
                const complete = countdownState.onComplete;
                countdownState = null;
                complete();
            }
        }, 1000);
    }

    // START
    startBtn.addEventListener("click", function () {
        startBtn.style.display = "none";
        saveBtn.style.display = "none";
        resetBtn.style.display = "none";
        pauseBtn.style.display = "inline-block";
        deleteBtn.style.display = "none";
        runTimer();
    });

    // PAUSE
    pauseBtn.addEventListener("click", pauseTimer);

    // RESUME
    resumeBtn.addEventListener("click", resumeTimer);

    // RESET
    resetBtn.addEventListener("click", function () {
        stopCountdown();
        countdownState = null;
        startBtn.style.display = "none";
        resetBtn.style.display = "none";
        timerDisplay.innerText = "";
        statusDisplay.innerText = "";
        showInputs();
    });

    // DELETE SAVED TIMER
    deleteBtn.addEventListener("click", function () {
        const selected = timerSelect.value;
        if (!selected) {
            return;
        }

        if (!confirm(`Delete timer "${selected}"?`)) {
            return;
        }

        delete timerStore[selected];
        localStorage.setItem("intervalTimers", JSON.stringify(timerStore));
        populateTimerSelect();

        if (Object.keys(timerStore).length > 0) {
            const nextTimer = Object.keys(timerStore)[0];
            timerSelect.value = nextTimer;
            loadTimer(nextTimer);
            displaySettings();
        } else {
            timerSelect.value = "";
            timerData = null;
            nameInput.value = "";
            warmupInput.value = "";
            exerciseInput.value = "";
            restInput.value = "";
            intervalsInput.value = "";
            showInputs();
        }
    });

    function playBeeps(count) {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        let i = 0;

        function beep() {
            if (i < count) {
                const oscillator = audioCtx.createOscillator();
                const gainNode = audioCtx.createGain();

                oscillator.type = "sine";  // Smooth beep sound
                oscillator.frequency.setValueAtTime(1000, audioCtx.currentTime); // 1kHz beep
                gainNode.gain.setValueAtTime(1, audioCtx.currentTime);

                oscillator.connect(gainNode);
                gainNode.connect(audioCtx.destination);

                oscillator.start();
                oscillator.stop(audioCtx.currentTime + 0.1); // Short beep (0.2 sec)

                i++;
                setTimeout(beep, 800); // Delay between beeps
            }
        }
        beep();
    }

    function runTimer() {
        let { warmup, exercise, rest, intervals } = timerData;

        function startSequence() {
            if (warmup > 0) {
                startCountdown({
                    label: "Warm-up",
                    durationSeconds: warmup * 60,
                    beepCount: 1,
                    onComplete: () => startExercise(0),
                });
            } else {
                startExercise(0);
            }
        }

        function startExercise(round) {
            if (round < intervals) {
                startCountdown({
                    label: `Exercise ${round + 1}/${intervals}`,
                    durationSeconds: exercise * 60,
                    beepCount: 2,
                    onComplete: () => {
                        if (round + 1 === intervals) {
                            statusDisplay.innerText = "Done!";
                            timerDisplay.innerText = "";
                            startBtn.style.display = "inline-block";
                            resetBtn.style.display = "inline-block";
                            pauseBtn.style.display = "none";
                            resumeBtn.style.display = "none";
                            deleteBtn.style.display = "inline-block";
                            playBeeps(4);
                        } else {
                            startRest(round);
                        }
                    },
                });
            }
        }

        function startRest(round) {
            startCountdown({
                label: "Rest",
                durationSeconds: rest * 60,
                beepCount: 3,
                onComplete: () => startExercise(round + 1),
            });
        }

        startSequence();
    }

    //Dark Mode Toggle
    function toggleDarkMode() {
        document.body.classList.toggle("dark-mode");
        // Update the button text based on the current mode - if this line does work, delete it.
        document.body.classList.contains("dark-mode") ? darkModeToggle.innerText = "Light Mode" : darkModeToggle.innerText = "Dark Mode";
        localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
    }

    darkModeToggle.addEventListener("click", toggleDarkMode);

    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark-mode");
    }
});
