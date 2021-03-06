let currentDay = moment();
// Fetching html elements
const searchButton = document.querySelector('.search-button');
const weatherList = document.querySelector('.weather-list');
const input = document.querySelector('.user-input');

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
        const { icon } = data.weather[0];
        const { temp } = data.main;
        const { speed } = data.wind;
        const { humidity } = data.main;
        document.querySelector('.city-name').innerText = name;
        document.querySelector('.date').append(currentDay.format(' (D/M/YYYY)'));
        document.querySelector('.icon').src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector('.temp').innerText = "Temp: " + temp + " ℉";
        document.querySelector('.wind').innerText = "Wind: " + speed + " MPH";
        document.querySelector('.hum').innerText = "Humidity: " + humidity + " %";
        const lat = data.coord.lat
        const lon = data.coord.lon
        this.uvdata(lat, lon);
    },

    uvdata: function (lat, lon) {
        fetch(
            "https://api.openweathermap.org/data/2.5/onecall?lat="
            + lat
            + "&lon="
            + lon
            + "&exclude=hourly,minutely&appid=a4f68e66624f545f19a69eefc5107917"
        )
            .then(response => response.json())
            .then(data => {
                document.querySelector('.uv').innerText = "UV Index: " + data.current.uvi;
            })
    },
    userInput: function () {
        // this.fetchWeather(document.querySelector('.user-input').value);
        this.fetchWeather(input.value);
        // this.fetchWeatherForecast(document.querySelector('.user-input').value);
        this.fetchWeatherForecast(input.value);
        // let previousHistory = localStorage.getItem("weatherSearch") || []
        // previousHistory.push(document.querySelector('.user-input').value);
        // localStorage.setItem("weatherSearch", previousHistory);
        // renderSearchHistory();
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
        let values = data.list;
        let forecastHTML = "";
        // for (i = 0; i <= 5; i++) {
        //     const day = currentDay.add(1, 'days');
        //     const dt = day.format('D/M/YYYY');
        //     forecastHTML += `<p class="dt">${dt}</p>`
        // }
        for (i = 0; i < values.length; i = i + 8) {
            // Date
            const day = currentDay.add(1, 'days');
            const dt = day.format('D/M/YYYY');

            const { icon } = values[i].weather[0];
            const { temp } = values[i].main;
            const { speed } = values[i].wind;
            const { humidity } = values[i].main;
            forecastHTML += `<div class="card" style="width: 18rem;">
            <div class="card-body">
              <h4 class="dt">${dt}</h4>
              <img src="https://openweathermap.org/img/wn/${icon}.png" alt="...">
              <p class="card-text">Temp : ${temp} ℉</p>
              <p class="Card-text">Humiditiy: ${humidity} %</p>
              <p class="card-text">Wind: ${speed} MPH</p>
            </div>
          </div>`
            weatherList.innerHTML = forecastHTML;
        }
    },
}
searchButton.addEventListener('click', function () {
    weatherSearch.userInput();
    renderSearchHistory();
})

// Fetching html elements
const searchList = document.querySelector('.search-list');

function renderSearchHistory() {
    let key = input.value;
    let value = weatherSearch.value;
    

    localStorage.setItem(key, value);

    let searchHistory = localStorage.getItem(key);

    // console.log(searchHistory);

    for (let i = 0; i < localStorage.length; i++) {
        let storedValue = localStorage.key(i);

        searchList.innerHTML += `${storedValue}<br>`;
    }
}