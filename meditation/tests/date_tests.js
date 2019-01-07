var datework = require('../js/date.js');


var oneDay = 1000 * 3600 * 24;
var date1 = new Date();
var date2 = new Date((new Date()).valueOf() - oneDay);
var date3 = new Date((new Date().valueOf()) + (2 * oneDay));


var result = datework.calculateStreak(date1, 5);
console.log("");
console.log("date = " + result[0]);
console.log("streak = " + result[1]);
if (result[1] === 5) {
    console.log("same day meditation result correct");
} else {
    console.log("same day meditation result incorrect. expected: 5, actual: " + result[1]);
}


result = datework.calculateStreak(date2, 5);
console.log("");
console.log("date = " + result[0]);
console.log("streak = " + result[1]);
if (result[1] === 6) {
    console.log("next day meditation result correct");
} else {
    console.log("next day meditation result incorrect. expected: 6, actual: " + result[1]);
}

result = datework.calculateStreak(date3, 5);
console.log("");
console.log("date = " + result[0]);
console.log("streak = " + result[1]);
if (result[1] === 0) {
    console.log("new streak meditation result correct");
} else {
    console.log("new streak meditation result incorrect. expected: 0, actual: " + result[1]);
}



