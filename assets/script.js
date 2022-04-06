// Fetching html elements
const searchButton = document.querySelector('.search-button');

// Passing additional information for a more tailored response
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
        console.log(name, temp, icon, speed, humidity);
        document.querySelector('.city-name').innerText = name;
        document.querySelector('.icon').src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector('.temp').innerText = "Temp: " + temp + " ℉";
        document.querySelector('.wind').innerText = "Wind: " + speed + " MPH";
        document.querySelector('.hum').innerText = "Humidity: " + humidity + " %";
    },
    userInput: function () {
        this.fetchWeather(document.querySelector('.user-input').value);
    }
}
searchButton.addEventListener('click', function(){
    weatherSearch.userInput();
})