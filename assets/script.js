// Fetching html elements
const searchButton = document.querySelector('.search-button');
const weatherList = document.querySelector('.weather-list');

let weatherSearch = {
    fetchWeather: function (city) {
        fetch(
            'https://api.openweathermap.org/data/2.5/weather?q='
            + city
            + "&units=imperial&appid=a4f68e66624f545f19a69eefc5107917"
        )
            .then(response => response.json())
            .then(data => this.weather(data))
    },
    weather: function (data) {
        const { name } = data;
        // add The date
        const { icon } = data.weather[0];
        const { temp } = data.main;
        const { speed } = data.wind;
        const { humidity } = data.main;
        // console.log(name, temp, icon, speed, humidity);
        document.querySelector('.city-name').innerText = name;
        document.querySelector('.icon').src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector('.temp').innerText = "Temp: " + temp + " ℉";
        document.querySelector('.wind').innerText = "Wind: " + speed + " MPH";
        document.querySelector('.hum').innerText = "Humidity: " + humidity + " %";
    },
    userInput: function () {
        this.fetchWeather(document.querySelector('.user-input').value);
        this.fetchWeatherForecast(document.querySelector('.user-input').value);
    },
    fetchWeatherForecast: function (city) {
        fetch(
            'https://api.openweathermap.org/data/2.5/forecast?q='
            + city
            + '&units=imperial&appid=a4f68e66624f545f19a69eefc5107917'
        )
            .then(response => response.json())
            .then(data => this.weatherForecastDisplay(data))
    },
    weatherForecastDisplay: function (data) {
        console.log(data)
        let values = data.list
        let forecastHTML = "";
        for (i = 0; i < values.length; i=i+8) {
            console.log(values[i]);
            // add The date
            const { icon } = values[i].weather[0];
            const { temp } = values[i].main;
            const { speed } = values[i].wind;
            const { humidity } = values[i].main;
            forecastHTML += `<div class="card" style="width: 18rem;">
            <div class="card-body">
              <p class="card-text">Temp : ${temp}
              <img src="https://openweathermap.org/img/wn/${icon}.png" alt="...">
              </p>
              <p class="Card-text">Humiditiy: ${humidity} " %"</p>
              <p class="card-text">Wind: ${speed} " MPH"</p>
            </div>
          </div>`
            // let forecast = document.createElement('li').innerText = "Temp: "+ temp + " ℉";
            // weatherList.append(forecast);
            weatherList.innerHTML =forecastHTML;
        }
    },
}
searchButton.addEventListener('click', function () {
    weatherSearch.userInput();
    // weatherForecastSearch.userInputTwo();
})

