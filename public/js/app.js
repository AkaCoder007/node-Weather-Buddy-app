const fetchWeatherData = (location) => {
  fetch(`http://localhost:3000/weather?address=${location}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          weatherMessage.innerText = data.error;
          return;
        }
        let logo = document.createElement("div");

        logo.innerHTML = `<div class="weather_logo"><img src="${data.weatherIcon}" alt="weatherLogo"><div>`;
        locationInfo.insertAdjacentElement("beforebegin", logo);

        locationInfo.innerText = data.location;
        weatherMessage.innerHTML = `${data.weatherDescription}`;
      });
    }
  );
};

const searchForm = document.querySelector(".search_form form");
const inputLocation = document.querySelector(".input_location");
const locationInfo = document.querySelector(".location_info");
const weatherMessage = document.querySelector(".weather-message");
// const ;

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("check1");
  const data = fetchWeatherData(inputLocation.value);
  console.log(data);
  //   weatherMessage.innerText = `Currently the temperature is ${data.temperature}`;
});
