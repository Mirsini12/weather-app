const apiKey = "apikey";

let temperature = {
  unit: true,
};

let temp1 = document.getElementById("temp");
let convertTempBtn = document.querySelector("#convert-temp");
let data;
function fetchData(city) {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&units=metric&appid=" +
      apiKey
  )
    .then((response) => response.json())
    .then((res) => {
      data = res;
      displayData();
    })
    .catch((err) => console.log(err));
}

function displayData() {
  const { name } = data;
  const { description, icon } = data.weather[0];
  const { temp, humidity, temp_min, temp_max } = data.main;
  const { speed } = data.wind;
  console.log(
    name,
    icon,
    description,
    temp_max,
    temp_min,
    temp,
    humidity,
    speed
  );
  // convertTempBtn.innerText = "Convert to fahrenheit";
  document.getElementById("city-name").innerText = "Weather in " + name;
  temp1.innerText = temp + "°C";
  document.getElementById("icon").src =
    `http://openweathermap.org/img/w/${icon}.png`;
  document.getElementById("weather-description").innerText = description;
  document.getElementById("temp-min").innerText =
    "Min temperature: " + temp_min + "°C";
  document.getElementById("temp-max").innerText =
    "Max temperature: " + temp_max + "°C";
  document.getElementById("wind").innerText = "Wind-speed: " + speed + "km/h";
  document.getElementById("humidity").innerText = "Humidity: " + humidity + "%";
  document.querySelector(".cell").classList.remove("loading-status");

  document.body.style.backgroundImage =
    "url('https://source.unsplash.com/1600x900/?" + name + "')";
  convertTempBtn.innerText = "Convert to fahrenheit";
}

convertTempBtn.addEventListener("click", function () {
    console.log("clicked");
    if (temperature.unit ) {
      let fahrenheit = celsiusToFahrenheit(data.main.temp);
      temp1.innerText = fahrenheit + "°F";
      convertTempBtn.innerText = "Convert to celsius";
      temperature.unit = !temperature.unit;
    } else {
      temp1.innerText = data.main.temp + "°C";
      convertTempBtn.innerText = "Convert to fahrenheit";
      temperature.unit = !temperature.unit;
    }
  });

  function celsiusToFahrenheit(temperature) {
    return (temperature * 9) / 5 + 32;
  }
  
  function search() {
    fetchData(document.querySelector(".search").value);
  }
  
  document.querySelector("#btn-scr").addEventListener("click", search);
  
  document.querySelector(".search").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      search();
    }
  });
  
  fetchData("newcastle");