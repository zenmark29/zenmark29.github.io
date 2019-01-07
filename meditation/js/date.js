
/** 
 *   Years are in thousands, months are zero based, 0 to 11. Days are 1 to end-of-month
 *   @param dateObject is the input
 *   @returns a string representation of the date
 */
function convertDateToString(dateObject) {
    var dateString = dateObject.getUTCFullYear() + '-' + dateObject.getUTCMonth() + '-' + dateObject.getUTCDate();
    return dateString;
}

/**
 * Input is a date object and the current streak.
 * @param {*} dateObject is the date from the previous meditation
 * @param {*} currentStreak is the number of days in the current streak as previously calculated.
 * @returns [todayDateObj, newStreak]
 */
function calculateStreak(dateObject, currentStreak) {
    console.log("calculating streak");
    var oneDay = 1000 * 3600 * 24;
    var todayDateObj = new Date();
    var today = convertDateToString(todayDateObj);
    console.log("today : " + today);
    var yesterday = convertDateToString(new Date((todayDateObj).valueOf() - oneDay));
    console.log('yesterday : ' + yesterday);
    var previousDate = convertDateToString(dateObject);
    console.log('input date : '+ previousDate);

     /* This is a continuous practice */
     if (previousDate === yesterday) {
        console.log('sequential day meditation');
        return [todayDateObj, Number(currentStreak) + 1];
    }
    
    /* There was more than one mediation ina day, so the streak doesn't change. */
    if (previousDate === today) {
        console.log('same day meditation');
        return [todayDateObj, currentStreak];
    }

    /* this is a new streak */
    console.log('start a new streak');
    return [todayDateObj, 1];
}
