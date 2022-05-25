var pastSearches = [];
var weatherObj = {};
if (localStorage.getItem("cities") != null) {
  pastSearches = JSON.parse(localStorage.getItem("cities"));
  getCoordinates(pastSearches[0]);
}
if (localStorage.getItem("weatherObj") != null) {
  weatherObj = JSON.parse(localStorage.getItem("weatherObj"));
}

showPastSearches();

$("body").on("click", ".cityButton", function () {
  var searchCity = $(this).data("city");

  localStorage.setItem("city", searchCity);
  getCoordinates(searchCity);
});

function createSearchList() {
  $("#pastSearches").empty();
  if (pastSearches == null) return;
  pastSearches.forEach(function (city) {
    $("#pastSearches").prepend(
      $(
        "<button class='list-group-item list-group-item-action cityButton' data-city='" +
          city +
          "'>" +
          city +
          "</button>"
      )
    );
  });

  var search = [];
  $.each(pastSearches, function (i, v) {
    search.push(v.toUpperCase());
  });

  pastSearches = $.unique(search);

  localStorage.setItem("cities", JSON.stringify(pastSearches));
}

function showPastSearches() {
  var savedSearches = pastSearches;
  if (savedSearches !== null) {
    pastSearches = savedSearches;
  }
  createSearchList();

  if (pastSearches.length > 0) {
    var lastsearch = pastSearches[pastSearches.length - 1];
    getCoordinates(lastsearch);
  }
}
////////////////////////
$("#searchBtn").click(function () {
  var searchCity = $("#searchInput").val();
  pastSearches.push(searchCity.toUpperCase());
  pastSearches = $.unique(pastSearches);

  createSearchList();
  ///save your updated search list

  localStorage.setItem("city", searchCity);
  getCoordinates(searchCity);

  $("#content").show();
});
//pulls coordinates of searched city
function getCoordinates(searchCity) {
  var currentCity = searchCity;
  var coordUrl =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
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
      getWeather(searchCity, currentCityLong, currentCityLat);
    });
}

//takes coordinates and puts them into a weather search
function getWeather(city, long, lat) {
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
      weatherObj = data;
      localStorage.setItem("weatherObj", JSON.stringify(data));
      setCurrent(city);
      fiveDay();
    });
}
//sets the upper portions current weather data
function setCurrent(currentCity) {
  if (weatherObj == {}) {
    return;
  }
  var cObj = weatherObj;
  var currentDate = moment().format("llll");
  var currentIcon = cObj.current.weather[0].id;
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
    $("#currentIcon").addClass("fa-solid fa-cloud-bolt");
  } else if (currentIcon <= 531 && currentIcon >= 300) {
    $("#currentIcon").addClass("fa-solid fa-cloud-showers-heavy");
  } else if (currentIcon <= 622 && currentIcon >= 600) {
    $("#currentIcon").addClass("fa-solid fa-snowflake");
  } else if (currentIcon <= 781 && currentIcon >= 701) {
    $("#currentIcon").addClass("fa-solid fa-smog");
  } else if (currentIcon <= 804 && currentIcon >= 802) {
    $("#currentIcon").addClass("fa-solid fa-cloud");
  } else if (currentIcon <= 801 && currentIcon >= 800) {
    $("#currentIcon").addClass("fa-solid fa-sun");
  }
  if (currentUV <= 2 && currentUV >= 0) {
    $("#currentUV").addClass("low");
  } else if (currentUV <= 5 && currentUV > 2) {
    $("#currentUV").addClass("moderate");
  } else if (currentUV <= 7 && currentUV > 5) {
    $("#currentUV").addClass("high");
  } else if (currentUV <= 10 && currentUV > 7) {
    $("#currentUV").addClass("veryHigh");
  } else if (currentUV > 10) {
    $("#currentUV").addClass("extreme");
  }
}
//sets the 5 day weather forecast cards
function fiveDay() {
  var obj = weatherObj;
  for (var i = 0; i < 5; i++) {
    var unixDate = obj.daily[i].dt;
    var unix = eval(unixDate * 1000);
    var dt = new Date(unix);
    var date = dt.toLocaleDateString();
    var iconVal = obj.daily[i].weather[0].id;
    var temp = obj.daily[i].temp.max;
    var wind = obj.daily[i].wind_speed;
    var humidity = obj.daily[i].humidity;
    $("#date" + i).text(date);
    $("#temp" + i).text(temp + " F");
    $("#wind" + i).text(wind + " MPH");
    $("#humidity" + i).text(humidity + " %");
    if (iconVal <= 232 && iconVal >= 200) {
      $("#icon" + i).addClass("fa-solid fa-cloud-bolt");
    } else if (iconVal <= 531 && iconVal >= 300) {
      $("#icon" + i).addClass("fa-solid fa-cloud-showers-heavy");
    } else if (iconVal <= 622 && iconVal >= 600) {
      $("#icon" + i).addClass("fa-solid fa-snowflake");
    } else if (iconVal <= 781 && iconVal >= 701) {
      $("#icon" + i).addClass("fa-solid fa-smog");
    } else if (iconVal <= 804 && iconVal >= 802) {
      $("#icon" + i).addClass("fa-solid fa-cloud");
    } else if (iconVal <= 801 && iconVal >= 800) {
      $("#icon" + i).addClass("fa-solid fa-sun");
    }
  }
  $("#content").show();
}

//github refuses to update live code
