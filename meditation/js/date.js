//console.log("start program");

/** 
 *   Years are in thousands, months are zero based, 0 to 11. Days are 1 to end-of-month
 *   @param dateObject is the input
 *   @returns a string representation of the date
 */
function convertDateToString(dateObject) {
    var dateString = dateObject.getUTCFullYear() + '-' + dateObject.getUTCMonth() + '-' + dateObject.getUTCDate();
    return dateString;
}
/*
var oneDay = 1000 * 3600 * 24;
var date1 = new Date();
var date2 = new Date((new Date()).valueOf() - oneDay);
var date3 = new Date((new Date().valueOf()) + (2 * oneDay));
*/



/**
 * Takes the date string from local storage in the format of YYYY-MM-DD and the current streak as an integer and returns an Object with a date string and streak number.
 * @param {*} dateObject 
 * @param {*} currentStreak 
 * @returns [newDateObj, newStreak]
 */
function calculateStreak(dateObject, currentStreak) {
    var oneDay = 1000 * 3600 * 24;
    var todayDateObj = new Date();
    var today = convertDateToString(todayDateObj);
    var yesterday = convertDateToString(new Date((todayDateObj).valueOf() - oneDay));
    var previousDate = convertDateToString(dateObject);
    
    /* There was more than one mediation ina day, so the streak doesn't change. */
    if (previousDate === today) {
        return [todayDateObj, currentStreak];
    }
    /* This is a continuous practice */
    if (previousDate === yesterday) {
        return [todayDateObj, currentStreak + 1];
    }

    /* this is a new streak */
    return [todayDateObj, 0];
}
/*
var result = calculateStreak(date1, 5);
console.log("");
console.log("date = " + result[0]);
console.log("streak = " + result[1]);
if (result[1] === 5) {
    console.log("same day meditation result correct");
} else {
    console.log("same day meditation result incorrect. expected: 5, actual: " + result[1]);
}


result = calculateStreak(date2, 5);
console.log("");
console.log("date = " + result[0]);
console.log("streak = " + result[1]);
if (result[1] === 6) {
    console.log("next day meditation result correct");
} else {
    console.log("next day meditation result incorrect. expected: 6, actual: " + result[1]);
}

result = calculateStreak(date3, 5);
console.log("");
console.log("date = " + result[0]);
console.log("streak = " + result[1]);
if (result[1] === 0) {
    console.log("new streak meditation result correct");
} else {
    console.log("new streak meditation result incorrect. expected: 0, actual: " + result[1]);
}
*/

