/* Copyright (C) 2017 Robert Mark Mills - All Rights Reserved
 You may not use, distribute and/or modify this code without the express, 
 written consent of the owner named above. 
 For information email: robert.mark.mills@gmail.com
 */

/**
 * This function takes a numeric input value and returns a string that is an 
 * addition function for calculating the value. It creates a number of functions 
 * and then randomizes the return to improve the possibility of not repeating 
 * itself.
 * @param {type} input_value
 * @return {String}
 */
var additionFunction = function(input_value) {
    var funcArray = new Array();
    var calculatedAdditionFunction = "";
    for (var i = 0, max = input_value; i < max; i++) {
        var difference = input_value - i;
        if (difference > 0) {
            calculatedAdditionFunction = "" + difference + " + " + i + " = ";
            funcArray.push(calculatedAdditionFunction);
        }
    }
    var index = Math.floor(funcArray.length * Math.random());
    calculatedAdditionFunction = funcArray[index];
    return calculatedAdditionFunction;
};

/**
 * This function takes a numeric input value and returns a string that is an 
 * addition function for calculating the value. It creates a number of functions 
 * and then randomizes the return to improve the possibility of not repeating 
 * itself.
 * @param {type} input_value
 * @return {String}
 */
var subtractionFunction = function(input_value) {
    var funcArray = new Array();
    var calculatedSubtractionFunction = "";
    for (var i = 0, max = 20; i < max; i++) {
        var minuend = input_value + i;
        calculatedSubtractionFunction = "" + minuend + " - " + i + " = ";
        funcArray.push(calculatedSubtractionFunction);
    }
    var index = Math.floor(funcArray.length * Math.random());
    calculatedSubtractionFunction = funcArray[index];
    return calculatedSubtractionFunction;
};

/**
 * This function takes a numeric input value and returns a string that is an 
 * addition function for calculating the value. It creates a number of functions 
 * and then randomizes the return to improve the possibility of not repeating 
 * itself.
 * @param {type} input_value
 * @return {String}
 */
var divisionFunction = function(input_value) {
    var funcArray = new Array();
    var calculatedDivisionFunction = "";
    for (var i = 1, max = 20; i < max; i++) {
        var dividend = input_value * i;
        calculatedDivisionFunction = "" + dividend + " &#247; " + i + " = ";
        funcArray.push(calculatedDivisionFunction);
    }
    var index = Math.floor(funcArray.length * Math.random());
    calculatedDivisionFunction = funcArray[index];
    return calculatedDivisionFunction;
};


/**
 * This function takes a numeric input value and returns a string that is an 
 * addition function for calculating the value. It creates a number of functions 
 * and then randomizes the return to improve the possibility of not repeating 
 * itself.
 * @param {type} input_value
 * @return {String}
 */
var multiplicationFunction = function(input_value) {
    var funcArray = new Array();
    var calculatedMultiplicationFunction = "";
    for (var i = 0, max = input_value; i < max + 1; i++) {
        var remainder = input_value % i;
        if (remainder === 0) {
            var quotient = input_value / i;
            calculatedMultiplicationFunction = "" + quotient + " &#215; " + i + " = ";
            funcArray.push(calculatedMultiplicationFunction);
        }
    }
    var index = Math.floor(funcArray.length * Math.random());
    calculatedMultiplicationFunction = funcArray[index];
    return calculatedMultiplicationFunction;
};