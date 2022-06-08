const API_KEY = `48236f81a2b502846e987a04c6661de8`;
const COORDS = `coords`;

const locationinfo = document.querySelector(`.location-timezone`);
const degreeinfo = document.querySelector(`.temperatrue-degree`);
const descriptioninfo = document.querySelector(`.temperature-description`);
const iconinfo = document.querySelector(`.description-icon`);

function init() {
  AskForCoords();
}

function AskForCoords() {
  navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
}

function handleSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };
  getWeather(latitude, longitude);
}

function handleError() {
  console.log("can't not access to location");
  getWeather(37.564214, 127.001699);
}

function getWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`
  )
    .then(function (response) {
      return response.json();
    })

    .then(function (json) {
      const Temperature = json.main.temp;
      const Location = json.name;
      const Description = json.weather[0].description;
      const weatherIcon = json.weather[0].icon;
      const weatherIconAdrs = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

      locationinfo.innerText = `${Location}`;
      degreeinfo.innerText = `${Temperature}`;
      descriptioninfo.innerText = `${Description}`;
      iconinfo.setAttribute("src", weatherIconAdrs);
    })
    .catch((error) => console.log("error", error));
}

function searchWeather(event) {
  var city = document.getElementById("city").value;

  if (window.event.keyCode == 13) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=kr`
    )
      .then(function (response) {
        return response.json();
      })

      .then(function (json) {
        const Temperature = json.main.temp;
        const Location = json.name;
        const Description = json.weather[0].description;
        const weatherIcon = json.weather[0].icon;
        const weatherIconAdrs = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

        locationinfo.innerText = `${Location}`;
        degreeinfo.innerText = `${Temperature}`;
        descriptioninfo.innerText = `${Description}`;
        iconinfo.setAttribute("src", weatherIconAdrs);
      })
      .catch((error) => console.log("error", error));
  }
}

init();
