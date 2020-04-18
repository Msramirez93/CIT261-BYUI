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
    // This portion proved to be very difficult to crack as the JSON object
    // contained an array of objects. After some reasearch I was able to fix it
    this.currentWeather = apiResultObject.weather[0].id;
    this.weatherDescription = apiResultObject.weather[0].description;
    // API returned info in Kelvin, I converted it into Farenhait
    this.currentTemp = parseInt((apiResultObject.main.temp - 273.15)* 9/5 + 32);
    // I tried two approaches to result interger results. one with ParseInt and
    // the other one setting the decimal point to zero
    this.tempMin = parseInt((apiResultObject.main.temp_min - 273.15)* 9/5 + 32);
    this.tempMax = ((apiResultObject.main.temp_max - 273.15)* 9/5 + 32).toFixed(0);
    //
    this.currentIcon = apiResultObject.weather[0].icon;
}

selectedCity.prototype.displayCity = function(){ 
    document.getElementById("cityName").innerHTML = this.city;    
}

selectedCity.prototype.displayWeatherDescription = function(){
    document.getElementById("skyCondition").innerHTML = this.weatherDescription.charAt(0).toUpperCase() + this.weatherDescription.slice(1); 
}

selectedCity.prototype.displayCurrWeather = function(){  
    document.getElementById("currWeather").innerHTML = this.currentTemp + "º F"; 
}




selectedCity.prototype.displayCurrentImage = function(){
    var idValue = this.currentIcon;     
    displayImages("current",idValue);
    
}
/*******************************************************************************
* Second Object created
*
* For this objected I selected Pseudoclassical Instantiation as it is the most
* efficient way to create an object. Each of the member variables take values
* from the object resulted from the XMLHTTPRequest.
* Each function is designed with the idea of providing user with a detailed
* response of the current weather based on his/her zipcode input.
*******************************************************************************/
var cityForecast = function(apiResultObject){
     this.weatherTonigh = parseInt((apiResultObject.list[0].main.temp_max - 273.15)* 9/5 + 32);
     this.dayOne = parseInt((apiResultObject.list[4].main.temp_max - 273.15)* 9/5 + 32);
     this.dayTwo = parseInt((apiResultObject.list[12].main.temp_max - 273.15)* 9/5 + 32);
     this.dayThree = parseInt((apiResultObject.list[20].main.temp_max - 273.15)* 9/5 + 32);
     this.dayFour = parseInt((apiResultObject.list[28].main.temp_max - 273.15)* 9/5 + 32);
     this.dayFive = parseInt((apiResultObject.list[36].main.temp_max - 273.15)* 9/5 + 32);
       
     this.tomorrowSky = apiResultObject.list[4].weather[0].description;
     
     this.todayIcon = apiResultObject.list[0].weather[0].icon;
     
    
     this.weatherDescriptionMain = apiResultObject.list[0].weather[0].description;
    
     this.tomorrowIcon = apiResultObject.list[12].weather[0].icon;
    
    

}

cityForecast.prototype.displayForecast = function(){    
    document.getElementById("tday1").innerHTML = this.dayOne + "º F";
    document.getElementById("tday2").innerHTML = this.dayTwo + "º F";
    document.getElementById("tday3").innerHTML = this.dayThree + "º F";
    document.getElementById("tday4").innerHTML = this.dayFour + "º F";
    document.getElementById("tday5").innerHTML = this.dayFive + "º F";

    document.getElementById("tomorrowTemp").innerHTML = this.dayOne + "º F";
}

cityForecast.prototype.displayTomorrowCondition = function(){
    document.getElementById("tomorrowCondition").innerHTML = this.tomorrowSky.charAt(0).toUpperCase() + this.tomorrowSky.slice(1);   
}


cityForecast.prototype.displayTodayImage = function(){
     var idValue = this.todayIcon; 
    displayImages("today", idValue);
 
}

cityForecast.prototype.displayTodayMain = function(){
    document.getElementById("todayMain").innerHTML = this.weatherDescriptionMain.charAt(0).toUpperCase() +this.weatherDescriptionMain .slice(1); 
}

cityForecast.prototype.displayTomorrowImage = function(){
      var idValue = this.tomorrowIcon;
       displayImages("tomorrow", idValue);
}

cityForecast.prototype.displayHighTemp = function(){    
    document.getElementById("todayTemp").innerHTML = this.weatherTonigh + "º F"; 
}


function getResult(){
    var zipCode = document.getElementById("zipCode").value;
    var weather = new XMLHttpRequest();
    weather.open("GET", "http://api.openweathermap.org/data/2.5/weather?zip="+zipCode+"&APPID=d3242bf6c4466bc192e4bc898f3d22c9",false);
    weather.send(null);
    var currentWeather = JSON.parse(weather.response);   
    
    var forecast = new XMLHttpRequest();
    forecast.open("GET", "http://api.openweathermap.org/data/2.5/forecast?zip="+zipCode+"&APPID=d3242bf6c4466bc192e4bc898f3d22c9",false);
    forecast.send(null);
    var forecastWeather = JSON.parse(forecast.response);
    
     displayData(currentWeather, forecastWeather);  
    
    autoSaveState(zipCode, currentWeather, forecastWeather);
    


}

function saveResult(){
    var key = 'savedCurrentWeather';
    var key2 = 'savedForecastWeather';
    var savedZipCode = localStorage.getItem("ZipCode");
    let APIobject = JSON.parse(localStorage.getItem('currentWeather'));
    let APIobject2 = JSON.parse(localStorage.getItem('forecastWeather'));
    localStorage.setItem("SavedZipCode", savedZipCode);
    localStorage.setItem(key, JSON.stringify(APIobject));
    localStorage.setItem(key2, JSON.stringify(APIobject2));
  }

function loadLastSaved(){
    
    document.getElementById("zipCode").value = localStorage.getItem("SavedZipCode");
    let currentWeather = JSON.parse(localStorage.getItem('savedCurrentWeather'));
    let forecastWeather = JSON.parse(localStorage.getItem('savedForecastWeather'));
    displayData(currentWeather, forecastWeather);    
}

function loadResult(){
    
    document.getElementById("zipCode").value = localStorage.getItem("ZipCode");
    let currentWeather = JSON.parse(localStorage.getItem('currentWeather'));
    let forecastWeather = JSON.parse(localStorage.getItem('forecastWeather'));
    displayData(currentWeather, forecastWeather);    
}


function displayData(object1, Object2){
    
    var userCity = new selectedCity(object1); 
    userCity.displayCity();
    
    userCity.displayCurrWeather();
    userCity.displayWeatherDescription();
    userCity.displayCurrentImage();
   
    var userCityForecast = new cityForecast(Object2);   
    userCityForecast.displayForecast();
    userCityForecast.displayTomorrowCondition();
    userCityForecast.displayTodayImage();
    userCityForecast.displayTomorrowImage();
    userCityForecast.displayTodayMain();
    userCityForecast.displayHighTemp();
    
    showPanel();
    
    hideDayHeader();
    hideNightHeader();

}

function onloadEvents(){
    displayDate(); 
    hidePanel();
}
 

 
/************************************************
* CSS Manipulation from JS
* These two variables will interact with user and
* manipulate CSS class from JS
* By default, resources will be hidden from user
*************************************************/
function hidePanel(){
    var elem = document.getElementById("forecastPanel");
    elem.style.display = "none";
}

function showPanel(){
    var elem = document.getElementById("forecastPanel");
    elem.style.display = "inline";
}

 
/************************************************
* CSS Manipulation from JS
* These two variables will interact with user and
* manipulate CSS class from JS
* By default, resources will be hidden from user
*************************************************/
function hideDayHeader(){
    var elem = document.getElementById("dayHeader");
    elem.style.display = "none";
}

function showDayHeader(){
    var elem = document.getElementById("dayHeader");
    elem.style.display = "inline";
    document.body.style.backgroundColor = "#e6eeff";
    hideNightHeader();
}

function hideNightHeader(){
    var elem = document.getElementById("nightHeader");
    elem.style.display = "none";
}

function showNightHeader(){
    var elem = document.getElementById("nightHeader");
    elem.style.display = "inline";
    document.body.style.backgroundColor = "#616268";
    hideDayHeader();
}

/*******************************************************************************
* Function displayDates()
*
* This function will be called when user clicks on Go! Button and will make
* the XMLHTTPRequest by calling an API from openwheatermap.org.
* An ID Key is validated first, then the result is parse (through JSON) into 
* an object, which is then used by the objected created above. 
*******************************************************************************/
function displayDate(){
    var days = [];
    var today = new Date();    
    for (var i = 0; i < 10; i++){
        days[i] = new Date();
        days[i].setDate(today.getDate()+(i+1));    
    }
    var monthNames = [
    "JAN", "FEB", "MAR",
    "APR", "MAY", "JUN", "JUL",
    "AUG", "SEP", "OCT",
    "NOV", "DEC"
    ];
    
    document.getElementById("today").innerHTML = monthNames[today.getMonth()] + " " + today.getDate();
   
    document.getElementById("day1").innerHTML = monthNames[days[0].getMonth()] + " " + days[0].getDate();
    document.getElementById("tomorrow").innerHTML = monthNames[days[0].getMonth()] + " " + days[0].getDate();

    document.getElementById("day2").innerHTML = monthNames[days[1].getMonth()] + " " + days[1].getDate();
    document.getElementById("day3").innerHTML = monthNames[days[2].getMonth()] + " " + days[2].getDate();
    document.getElementById("day4").innerHTML = monthNames[days[3].getMonth()] + " " + days[3].getDate();
    document.getElementById("day5").innerHTML = monthNames[days[4].getMonth()] + " " + days[4].getDate();
    
    var hour = today.getHours();
    if (hour < 6 || hour > 18)
        {
            showNightHeader();
            hideDayHeader();
        }
    else {
        showDayHeader();
        hideNightHeader();
    }
}


/*******************************************************************************
* Function displayImages()
*
* This function will be called when user clicks on Go! Button and will make
* the XMLHTTPRequest by calling an API from openwheatermap.org.
* An ID Key is validated first, then the result is parse (through JSON) into 
* an object, which is then used by the objected created above. 
*******************************************************************************/

function displayImages(displayTime, idValue){
    
    if (displayTime == "current"){
    
        switch(idValue) {
            //Sun
            case "01d":
                document.getElementById("currentImage").src='images/sun2.png';
                break;
            //Moon  
            case "01n":
                document.getElementById("currentImage").src='images/moon.png';
                break;
            //Sun and Clouds
            case "02d":
          document.getElementById("currentImage").src='images/cloudsun.png';
                break;
            //Moon and Clouds
            case "02n":
                document.getElementById("currentImage").src='images/moonclouds.png';
                break;
            //Just Clouds
            case "03d":
            case "04d":
            case "03n":
            case "04n":
                document.getElementById("currentImage").src='images/could.png';
                break;
            //Rain
            case "09d":
            case "10d":
            case "09n":
            case "10n":
                document.getElementById("currentImage").src='images/rain.png';
                break;
            //Thunderstorm
            case "11d":
            case "11n":
            document.getElementById("currentImage").src='images/thunderstorm.png';
                break;
            //Snow
            case "13d":
            case "13n":
                document.getElementById("currentImage").src='images/snow.png';
                break;
            //Mist
            case "50d":
            case "50n":
                document.getElementById("currentImage").src='images/mist.svg';
        }
    }
    
    else if (displayTime == "today"){
         switch(idValue) {
            //Sun
            case "01d":
                document.getElementById("todayImage").src='images/sun2.png';
                break;
            //Moon  
            case "01n":
                document.getElementById("todayImage").src='images/moon.png';
                break;
            //Sun and Clouds
            case "02d":
                document.getElementById("todayImage").src='images/cloudsun.png';
                break;
            //Moon and Clouds
            case "02n":
                document.getElementById("todayImage").src='images/moonclouds.png';
                break;
            //Just Clouds
            case "03d":
            case "04d":
            case "03n":
            case "04n":
                document.getElementById("todayImage").src='images/could.png';
                break;
            //Rain
            case "09d":
            case "10d":
            case "09n":
            case "10n":
                document.getElementById("todayImage").src='images/rain.png';
                break;
            //Thunderstorm
            case "11d":
            case "11n":
            document.getElementById("todayImage").src='images/thunderstorm.png';
                break;
            //Snow
            case "13d":
            case "13n":
                document.getElementById("todayImage").src='images/snow.png';
                break;
            //Mist
            case "50d":
            case "50n":
                document.getElementById("todayImage").src='images/mist.svg';
        }
        
    }
    
    else {
            switch(idValue) {
            //Sun
            case "01d":
                document.getElementById("tomorrowImage").src='images/sun2.png';
                break;
            //Moon  
            case "01n":
                document.getElementById("tomorrowImage").src='images/moon.png';
                break;
            //Sun and Clouds
            case "02d":
                document.getElementById("tomorrowImage").src='images/cloudsun.png';
                break;
            //Moon and Clouds
            case "02n":
                document.getElementById("tomorrowImage").src='images/moonclouds.png';
                break;
            //Just Clouds
            case "03d":
            case "04d":
            case "03n":
            case "04n":
                document.getElementById("tomorrowImage").src='images/could.png';
                break;
            //Rain
            case "09d":
            case "10d":
            case "09n":
            case "10n":
                document.getElementById("tomorrowImage").src='images/rain.png';
                break;
            //Thunderstorm
            case "11d":
            case "11n":
            document.getElementById("tomorrowImage").src='images/thunderstorm.png';
                break;
            //Snow
            case "13d":
            case "13n":
                document.getElementById("tomorrowImage").src='images/snow.png';
                break;
            //Mist
            case "50d":
            case "50n":
                document.getElementById("tomorrowImage").src='images/mist.svg';
        }
        
    }
    
}


/************************************************************************ 
* Function: autoSaveState()
* This function will be executed when user clicks on Calculate button
* and will "automatically" saved the current input into local storage
*************************************************************************/
function autoSaveState(zipCode, APIobject, APIobject2){
    var key = 'currentWeather';
    var key2 = 'forecastWeather';
    //check if local storage is available
    if (typeof(Storage)!=="Undefined"){
        localStorage.setItem("ZipCode", zipCode);
        localStorage.setItem(key, JSON.stringify(APIobject));
        localStorage.setItem(key2, JSON.stringify(APIobject2));
    //Displays message if not available
    }else {    
         alert('Please update your browser!');
    }  
}


