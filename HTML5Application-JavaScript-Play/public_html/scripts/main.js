/*
 * JavaScript playground
 */

/**
 * 
 * @param {type} description
 * @returns {Rabbit}
 */
function Rabbit(description){
    this.description = description;

    this.describeMySelf = function(){
        document.getElementById("myTarget").innerHTML+= this.description + "<br>";
        console.log(this.description);
    };
}

var rabbit1 = new Rabbit("fluffy");

rabbit1.describeMySelf();

var rabbit2 = new Rabbit("sleepy");
rabbit2.describeMySelf();

var rabbit3 = new Rabbit("happy");
rabbit3.describeMySelf();

var rabbit4 =  new Rabbit("slow");

rabbit4.describeMySelf();
