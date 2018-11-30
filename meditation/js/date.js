console.log("start program");

function convertDateToString(dateObject){
    var dateString = dateObject.getUTCFullYear() + '-' + dateObject.getUTCMonth() + '-' + dateObject.getUTCDate();
    return dateString;
}

var date1 = new Date();
var date2 = new Date((new Date()).valueOf() + 1000*3600*24);


console.log("date1 = " + convertDateToString(date1));
console.log("date2 = " + convertDateToString(date2));
console.log("end program");

