/*******************************************************************************
*Object selectedCity created.
*
* For this objected I selected Pseudoclassical Instantiation as it is the most
* efficient way to create an object. Each of the member variables take values
* from the object resulted from the XMLHTTPRequest.
* Each function is designed with the idea of providing user with a detailed
* response of the current weather based on his/her zipcode input.
*******************************************************************************/
var selectedCity = function(apiResultObject){
    this.city = apiResultObject.name;
    this.coordLat = apiResultObject.coord.lat;
    this.coordLon = apiResultObject.coord.lon;
    // This portion proved to be very difficult to crack as the JSON object
    // contained an array of objects. After some reasearch I was able to fix it
    this.currentWeather = apiResultObject.weather[0].id;
    this.weatherDescription = apiResultObject.weather[0].description;
    // API returned info in Kelvin, I converted it into Farenhait
    this.currentTemp = parseInt((apiResultObject.main.temp - 273.15)* 9/5 + 32);
    this.currentHumidity = apiResultObject.main.humidity;
    this.currentPressure = apiResultObject.main.pressure;
    // I tried two approaches to result interger results. one with ParseInt and
    // the other one setting the decimal point to zero
    this.tempMin = parseInt((apiResultObject.main.temp_min - 273.15)* 9/5 + 32);
    this.tempMax = ((apiResultObject.main.temp_max - 273.15)* 9/5 + 32).toFixed(0);
    this.windSpeed = apiResultObject.wind.speed;
    //Created for CSS Manipulation
    //this.rain = apiResultObject.precipitation.mode;
    this.cloud = apiResultObject.clouds.value; 
}

selectedCity.prototype.displayCity = function(){
    
    document.getElementById("city").innerHTML = this.city;
    
}

selectedCity.prototype.displayLocation = function(){
     
    document.getElementById("location").innerHTML = "The city of " + this.city + " is located on Longitude " + this.coordLon + " and Latitude " + this.coordLat + ".";
    
}

selectedCity.prototype.displayCurrWeather = function(){
    
    document.getElementById("currWeather").innerHTML = "The current weather conditions in " + this.city + " are: " + this.weatherDescription + ", with a current temperature of " + this.currentTemp + "ºF. The max for today is " + this.tempMax + "ºF while the min is " + this.tempMin + "ºF."; 
    
}

selectedCity.prototype.displayWindInfo = function(){
    document.getElementById("wind").innerHTML = "The wind speed is " + this.windSpeed + "mph and current humidity is " + this.currentHumidity + "%.";
    
}

selectedCity.prototype.displayWindInfo = function(){

    var n = 0;
    var temp = this.currentTemp;
    if (temp > 50)
        {
            n = 0;
        }
    else 
        {
            n = 1;
        }

changeBackground(n);
}


/*******************************************************************************
* Function GetResult()
*
* This function will be called when user clicks on Go! Button and will make
* the XMLHTTPRequest by calling an API from openwheatermap.org.
* An ID Key is validated first, then the result is parse (through JSON) into 
* an object, which is then used by the objected created above. 
*******************************************************************************/

function getResult(){
    var zipCode = document.getElementById("zipCode").value;
    var weather = new XMLHttpRequest();
    weather.open("GET", "http://api.openweathermap.org/data/2.5/weather?zip="+zipCode+"&APPID=d3242bf6c4466bc192e4bc898f3d22c9",false);
    weather.send(null);
    var currentWeather = JSON.parse(weather.response);
    var userCity = new selectedCity(currentWeather); 
    userCity.displayCity();
    userCity.displayLocation();
    userCity.displayCurrWeather();
    userCity.displayWindInfo();
    userCity.displayBackgroud();
    
}

/************************************************
* CSS Manipulation from JS
* These two variables will interact with user and
* manipulate CSS class from JS
* By default, resources will be hidden from user
*************************************************/

function showResources(){
    var elem = document.getElementById("resources");
    elem.style.display = "inline";
}

function hideResources(){
    var elem = document.getElementById("resources");
    elem.style.display = "none";
}

function changeBackground(n) {
    switch(n){
    case 0:
        document.body.style.background = "URL(http://cypresslittlefins.com/images/sunyDay.jpg)";
            
        break;
    case 1:
        document.body.style.background = "URL(http://cypresslittlefins.com/images/winter.jpg)";
        break;
    }
   
}
