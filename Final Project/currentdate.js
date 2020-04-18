var d = new Date();
var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
document.getElementById("DATE").innerHTML = days[d.getDay()] + ", " + [d.getDate()] + " " + months[d.getMonth()] + " " + [d.getFullYear()];
