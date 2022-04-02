// Fetching html elements
const currentWeather = document.getElementsByClassName('present-day-weather');

fetch('https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=a4f68e66624f545f19a69eefc5107917')
    .then(response => response.json())
    .then(data => console.log(data))
