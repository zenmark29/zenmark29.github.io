/*
var i = 0;

function timedCount() {
    i = i + 1;
    postMessage(i);
    setTimeout("timedCount()",1000);
}

timedCount();
*/
var message = ["hello world!", "goodbye world"];
onmessage = function(e) {
    
    postMessage(message);
  };