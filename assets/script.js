$("#searchBtn").click(function () {
  var searchCity = $("#searchInput").val();
  localStorage.setItem("city", searchCity);
  getCoordinates();
  setCurrent();
});

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

function setCurrent() {
  var cObj = JSON.parse(localStorage.getItem("weatherObj"));
  console.log(cObj);
  var currentDate = moment().format("llll");
  var currentCity = localStorage.getItem("city");
  var currentTemp = cObj.current.temp;
  var currentWind = cObj.current.wind;
  var currentHum = cObj.current.humidity;
  var currentUV = cObj.current.uvi;
  // $("#details").append(
  // $("<div></div>")
  //   .attr("id", "currentTitle")
  //   .addClass("text-dark")
  $("#currentTitle").text(currentCity.toUpperCase() + ":  " + currentDate);
  $("#currentTemp").text(currentTemp + " F");
  $("#currentWind").text(currentWind + " MPH");
  $("#currentHumidity").text(currentHum + " %");
  $("#currentUV").text(currentUV);
}

function fiveDay() {
  var obj = JSON.parse(localStorage).getItem;
}
//temp, wind, humidity, uv index in current icon for current conditions
