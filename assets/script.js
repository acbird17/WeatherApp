$("#searchBtn").click(function () {
  var searchCity = $("#searchInput").val();
  localStorage.setItem("city", searchCity);
  getCoordinates();
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
      console.log(data);
      var currentCityLong = data[0].lon;
      var currentCityLat = data[0].lat;
      localStorage.setItem("currentLong", currentCityLong);
      localStorage.setItem("currentLat", currentCityLat);
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
      console.log(data);
    });
}
