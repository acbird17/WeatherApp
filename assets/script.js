//var spotifyLink = localStorage.getItem("artist-id");

$("#searchBtn").click(function () {
  var searchEl = $("#searchInput").val();
  localStorage.setItem("city", searchEl);
});

GeolocationCoordinates();
getWeather();

function getCoordinates() {
  var coordUrl =
    "http://api.openweathermap.org/geo/1.0/direct?q=city name&limit={limit}&appid=aa4420eedeb1d9811827bbeefd8042fb";
  fetch(coordUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}

function getWeather() {
  var cityUrl =
    "https://api.openweathermap.org/data/2.5/onecall?lat=39.7392&lon=104.9903&appid=aa4420eedeb1d9811827bbeefd8042fb";

  fetch(cityUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}
