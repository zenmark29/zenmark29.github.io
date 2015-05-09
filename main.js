function startTimer(duration, display) {
    var start = Date.now(),
        diff,
        days, 
        hours,
        minutes,
        seconds;
    function timer() {
        // get the number of seconds that have elapsed since 
        // startTimer() was called
        diff = duration - (((Date.now() - start) / 1000) | 0);

        // does the same job as parseInt truncates the float
        
        days  = Math.floor(diff / 86400) | 0;
       
        hours = Math.floor((diff % 86400)/3600) | 0;
        
        
        minutes = Math.floor((diff % 3600)/60) | 0;
        seconds = (diff % 60) | 0;

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent =  days + " days " + hours + " hours, " + minutes + " minutes, and " + seconds + " seconds until freedom!"; 

        if (diff <= 0) {
            // add one second so that the count down starts at the full duration
            // example 05:00 not 04:59
            start = Date.now() + 1000;
        }
    }
    // we don't want to wait a full second before the timer starts
    timer();
    setInterval(timer, 1000);
}

window.onload = function () {
    var today = new Date();
    var lastDay = new Date(2015, 5, 4, 15, 30, 0);
    var lastDayString = lastDay.toDateString();
    var duration = (lastDay - today)/(1000);
    
    display = document.getElementById("time_remaining");
    startTimer(duration, display);
};