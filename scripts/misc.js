import {dateInfo, weatherInfo} from "./components.js";

document.addEventListener('DOMContentLoaded', setup);

function setup() {
    setupDate();
    setupWeather();
}

function setupDate() {
    const dateParent = document.getElementById('fun-fact-parent');

    let date = new Date();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    
    fetch(`http://numbersapi.com/${month}/${day}/date`)
        .then((response) => response.text().then((data) => {
            dateParent.appendChild(dateInfo(data))
        }));
}

function setupWeather() {
    const weatherParent = document.getElementById('weather-parent');

    function useData(object) {
        let conditions = object.weather[0];
        let tempInfo = object.main;

        let temp = tempInfo.temp;
        let feelsLike = tempInfo.feels_like;

        let weather = conditions.main;

        let imageUrl = `https://openweathermap.org/img/wn/${conditions.icon}@4x.png`

        weatherParent.appendChild(weatherInfo(temp, feelsLike, weather, imageUrl))
    }

    const city = 'Windsor';
    // i'm aware this is really dumb and unsafe but
    // there isn't really a way to not hardcode the api key
    // in a static webpage like this as far as i know
    const apiKey = '3d70074f85babeb14891b75268272ad2';

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then((response) => response.json()
            .then(useData));
}