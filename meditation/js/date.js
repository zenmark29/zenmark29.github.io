console.log("start program");

/** 
 *   Years are in thousands, months are zero based, 0 to 11. Days are 1 to end-of-month
 *   @param dateObject is the input
 *   @returns a string representation of the date
 */
function convertDateToString(dateObject) {
    var dateString = dateObject.getUTCFullYear() + '-' + dateObject.getUTCMonth() + '-' + dateObject.getUTCDate();
    return dateString;
}
var oneDay = 1000 * 3600 * 24;
var date1 = new Date();
var date2 = new Date((new Date()).valueOf() - oneDay);
var date3 = new Date((new Date().valueOf()) + (2 * oneDay));


console.log("date1 = " + convertDateToString(date1));
console.log("date2 = " + convertDateToString(date2));
console.log("date3 = " + convertDateToString(date3));
console.log("end program");

if (date3 > date2) {
    console.log("date3 is greater than date2, so this might work");
}

/**
 * Takes the date string from local storage in the format of YYYY-MM-DD and the current streak as an integer and returns an Object with a date string and streak number.
 * @param {*} dateObject 
 * @param {*} currentStreak 
 * @returns [newDateString, newStreak]
 */
function calculateStreak(dateObject, currentStreak) {
    var today = convertDateToString(new Date());
    console.log("today = " + today);
    /* There was more than one mediation ina day, so the streak doesn't change. */
    if (dateString === today){
        return [dateString, currentStreak];
    }

    return [dateString, 1];
}

var result = calculateStreak(convertDateToString(date1), 5);
console.log("date = " + result[0]);
console.log("streak = " + result[1]);

var tomorrow = new Date((new Date()).valueOf() + oneDay);
result = calculateStreak(convertDateToString(date1), 5);
console.log("date = " + result[0]);
console.log("streak = " + result[1]);
/**
 * This method is intended to run when a meditation is finished. 
 * It reads local storage using the LAST_PRACTICED key. 
 * If there is no value there, set the STREAK value to 1,
 * set the LAST_PRACTICED to the string for today. 
 * If LAST_PRACTICED is there, check to see if it is the next day.
 * If it is the next day, then increase the STREAK value by 1. 
 * If it is the same day, leave the STREAK value untouched
 * If it is more than a one day gap, then set the STREAK value to 1. 
 * 
 */

/*
pass in stored-date as a string and the streak as a string.


If the stored YYYY-MM-DD === current YYYY-MM-DD
return streak unchanged, return current date unchanged.
over-write the values with the same values.

If the stored YYYY-MM-DD +1 === current YYYY-MM-DD
return streak =+1;
store streak;
return current date
store current date;


If the stored YYYY-MM-DD +1 < current YYYY-MM-DD
return streak = 0;
store streak
return current date
store current date;


*/