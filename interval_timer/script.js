document.addEventListener("DOMContentLoaded", function() {
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

    let timerData = JSON.parse(localStorage.getItem("intervalTimer")) || null;

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
    }

    function showInputs() {
        formInputs.style.display = "block"; 
        saveBtn.style.display = "inline-block"; 
        startBtn.style.display = "none"; 
        settingsDisplay.innerHTML = ""; 
    }

    if (timerData) {
        nameInput.value = timerData.name;
        warmupInput.value = timerData.warmup;
        exerciseInput.value = timerData.exercise;
        restInput.value = timerData.rest;
        intervalsInput.value = timerData.intervals;
        showInputs(); 
    }

    saveBtn.addEventListener("click", function() {
        const warmup = parseInt(warmupInput.value, 10);
        const exercise = parseInt(exerciseInput.value, 10);
        const rest = parseInt(restInput.value, 10);
        const intervals = parseInt(intervalsInput.value, 10);
        const name = nameInput.value.trim();

        if (!name || isNaN(warmup) || isNaN(exercise) || isNaN(rest) || isNaN(intervals) || warmup < 0 || exercise <= 0 || rest < 0 || intervals <= 0) {
            alert("Please enter valid values. Exercise & intervals must be at least 1.");
            return;
        }

        timerData = { name, warmup, exercise, rest, intervals };
        localStorage.setItem("intervalTimer", JSON.stringify(timerData));
        displaySettings();
    });

    startBtn.addEventListener("click", function() {
        startBtn.style.display = "none";
        saveBtn.style.display = "none";
        runTimer();
    });

    function runTimer() {
        let { warmup, exercise, rest, intervals } = timerData;

        function countdown(label, duration, callback) {
            statusDisplay.innerText = label;
            let timeLeft = duration * 60; 

            function updateDisplay() {
                let minutes = Math.floor(timeLeft / 60);
                let seconds = timeLeft % 60;
                timerDisplay.innerText = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
                
                if (timeLeft > 0) {
                    timeLeft--;
                    setTimeout(updateDisplay, 1000);
                } else {
                    callback();
                }
            }
            updateDisplay();
        }

        function startSequence() {
            if (warmup > 0) {
                countdown("Warm-up", warmup, () => startExercise(0));
            } else {
                startExercise(0);
            }
        }

        function startExercise(round) {
            if (round < intervals) {
                countdown(`Exercise ${round + 1}/${intervals}`, exercise, () => {
                    if (round + 1 === intervals) {
                        statusDisplay.innerText = "Done!";
                        timerDisplay.innerText = "";
                    } else {
                        startRest(round);
                    }
                });
            }
        }

        function startRest(round) {
            countdown("Rest", rest, () => startExercise(round + 1));
        }

        startSequence();
    }

    // 🌙 Dark Mode Toggle
    function toggleDarkMode() {
        document.body.classList.toggle("dark-mode");
        localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
    }

    darkModeToggle.addEventListener("click", toggleDarkMode);

    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark-mode");
    }
});