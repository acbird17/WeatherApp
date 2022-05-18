$("#searchBtn").click(function () {
  var searchCity = $("#searchInput").val();
  localStorage.setItem("city", searchCity);
  getCoordinates();
  setCurrent();
  fiveDay();
});
//pulls coordinates of searched city
function getCoordinates() {
  var currentCity = localStorage.getItem("city");
  var coordUrl =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    currentCity +
    "&appid=aa4420eedeb1d9811827bbeefd8042fb";
  fetch(coordUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var currentCityLong = data[0].lon;
      var currentCityLat = data[0].lat;
      var currentCity = data[0].name;
      localStorage.setItem("currentLong", currentCityLong);
      localStorage.setItem("currentLat", currentCityLat);
      localStorage.setItem("currentCity", currentCity);
      getWeather();
    });
}
//takes coordinates and puts them into a weather search
function getWeather() {
  var long = localStorage.getItem("currentLong");
  var lat = localStorage.getItem("currentLat");
  var cityUrl =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    "&lon=" +
    long +
    "&appid=aa4420eedeb1d9811827bbeefd8042fb&units=imperial";

  fetch(cityUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var json = JSON.stringify(data);
      localStorage.setItem("weatherObj", json);
    });
}
//sets the upper portions current weather data
function setCurrent() {
  var cObj = JSON.parse(localStorage.getItem("weatherObj"));
  console.log(cObj);
  var currentDate = moment().format("llll");
  var currentCity = localStorage.getItem("city");
  var currentIcon = cObj.current.weather[0].id;
  console.log(currentIcon);
  var currentTemp = cObj.current.temp;
  var currentWind = cObj.current.wind_speed;
  var currentHum = cObj.current.humidity;
  var currentUV = cObj.current.uvi;
  $("#currentTitle").text(currentCity.toUpperCase() + ":  " + currentDate);
  $("#currentTemp").text(currentTemp + " F");
  $("#currentWind").text(currentWind + " MPH");
  $("#currentHumidity").text(currentHum + " %");
  $("#currentUV").text(currentUV);
  if (currentIcon <= 232 && currentIcon >= 200) {
    $("#currentIcon").append('<i class="fa-solid fa-cloud-bolt"></i>');
  } else if (currentIcon <= 531 && currentIcon >= 300) {
    $("#currentIcon").append('<i class="fa-solid fa-cloud-showers-heavy"></i>');
  } else if (currentIcon <= 622 && currentIcon >= 600) {
    $("#currentIcon").append('<i class="fa-solid fa-snowflake"></i>');
  } else if (currentIcon <= 781 && currentIcon >= 701) {
    $("#currentIcon").append('<i class="fa-solid fa-smog"></i>');
  } else if (currentIcon <= 804 && currentIcon >= 802) {
    $("#currentIcon").append('<i class="fa-solid fa-cloud"></i>');
  } else if (currentIcon <= 801 && currentIcon >= 800) {
    $("#currentIcon").append('<i class="fa-solid fa-sun"></i>');
  } else {
    $("#currentIcon").append("");
  }
}
//sets the 5 day weather forecast cards
function fiveDay() {
  var obj = JSON.parse(localStorage.getItem("weatherObj"));
  for (var i = 0; i < 5; i++) {
    var date = moment().add(i, "days").calendar(); ///fix formatting
    var temp = obj.daily[i].temp.max;
    var wind = obj.daily[i].wind_speed;
    var humidity = obj.daily[i].humidity;
    $("#date" + i).text(date);
    //icon
    $("#temp" + i).text(temp + " F");
    $("#wind" + i).text(wind + " MPH");
    $("#humidity" + i).text(humidity + " %");
  }
}
