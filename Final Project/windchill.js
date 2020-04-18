var tempF = 78;
var speed = 3;
var chillFactor = 0;

s = Math.pow(speed, 0.16);

// formula: f = 35.74 + 0.6215t - 35.75s0.16 + 0.4275t s0.16
chillFactor = 35.74 + (0.6215 *     tempF) - (35.75 * s) + (0.4275 * tempF * s);
                
// 4- return the wind chill factor in Fahrenheit
document.getElementById("windChill").innerHTML = chillFactor.toFixed(2) + " F";               
