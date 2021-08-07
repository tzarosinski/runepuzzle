//Model 
//none

//View
var startButton = document.getElementById("start-button");
var stopButton = document.getElementById("stop-button");
var elapsedTimeText = document.getElementsByClassName("elapsed-time-text")[0];

//Listeners
// none

/** Displays the start button */
function displayStartButton() {
    // Display start button
    startButton.style.display = "block";

    // Hide stop button
    stopButton.style.display = "none";
}

/** Hide the start button */
function hideStartButton() {
    // Hide start button
    startButton.style.display = "none";

    // Display stop button
    stopButton.style.display = "block";
}

//Controller

/** Stores the reference to the elapsed time interval*/
var elapsedTimeIntervalRef;

/** Stores the start time of timer */
var startTime;

/** Stores the details of elapsed time when paused */
var elapsedTimeWhenPaused;

/** Starts the stopwatch */
function startStopwatch() {
    // Set start time based on whether it's stopped or resetted
    setStartTime();

    // Every second
    elapsedTimeIntervalRef = setInterval(() => {
        // Compute the elapsed time & display
        elapsedTimeText.innerText = timeAndDateHandling.getElapsedTime(startTime); //pass the actual record start time

        // Improvement: Can Stop elapsed time and resert when a maximum elapsed time
        //              has been reached.
    }, 1000);

    // Hide the start button, which will be replace by stop
    hideStartButton();
}


/** Sets the start time value */
function setStartTime() {
    if (elapsedTimeWhenPaused) {
        startTime = new Date();
        // Subtract the elapsed hours, minutes and seconds from the current date
        // To get correct elapsed time to resume from it
        startTime.setHours(startTime.getHours() - elapsedTimeWhenPaused.hours);
        startTime.setMinutes(startTime.getMinutes() - elapsedTimeWhenPaused.minutes);
        startTime.setSeconds(startTime.getSeconds() - elapsedTimeWhenPaused.seconds);
    } else {
        startTime = new Date();
    }
}

/** Pauses stopwatch */
function stopStopwatch() {
    // Clear interval
    if (typeof elapsedTimeIntervalRef !== "undefined") {
        clearInterval(elapsedTimeIntervalRef);
        elapsedTimeIntervalRef = undefined;
    }

    // Store the elapsed time on pause
    storeElapsedTimeOnPause();

    // display the start button
    displayStartButton();
}

/** Stores the elapsed time hours, minutes and seconds details
 * on pause*/
function storeElapsedTimeOnPause() {
    // Break down elapsed time from display test
    const brokenDownElapsedTime = elapsedTimeText.innerText.split(":");

    // Convert list to numbers
    const brokenDownElapsedTimeAsNumbers = brokenDownElapsedTime.map(numberAsString => parseInt(numberAsString));

    // Store the hours minutes and seconds from that time
    elapsedTimeWhenPaused = {
        hours: brokenDownElapsedTimeAsNumbers.length === 3 ? brokenDownElapsedTimeAsNumbers[0] : 0,
        minutes: brokenDownElapsedTimeAsNumbers.length === 3 ? brokenDownElapsedTimeAsNumbers[1] : brokenDownElapsedTimeAsNumbers[0],
        seconds: brokenDownElapsedTimeAsNumbers.length === 3 ? brokenDownElapsedTimeAsNumbers[2] : brokenDownElapsedTimeAsNumbers[1]
    }
}

/** Resets stopwatch */
function resetStopwatch() {
    // Clear interval
    if (typeof elapsedTimeIntervalRef !== "undefined") {
        clearInterval(elapsedTimeIntervalRef);
        elapsedTimeIntervalRef = undefined;
    }

    // Reset elapsed time when paused object
    elapsedTimeWhenPaused = undefined

    // display the start button
    displayStartButton();

    // Reset elapsed time text
    elapsedTimeText.innerText = "00:00";
}