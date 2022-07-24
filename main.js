const API_KEY = '62138210cea32ede9ef8fe48c9076214';
const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather';
const GEO_URL = 'https://api.openweathermap.org/geo/1.0';
let info;
let containerData;
let contentId;
let dias;
let vientos;
let tempDia;
let city;

async function getCoordinates(region) {
    return new Promise((resolve, reject) => {
        axios.get(`${GEO_URL}/direct?q=${region}&appid=${API_KEY}`)
            .then((response) => {
                resolve(response);
            });
    });
}

async function getWeather(lat, lon) {
    return new Promise((resolve, reject) => {
        axios.get(`${WEATHER_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
            .then((response) => {
                resolve(response);
            });
    });
}

async function search() {
    const coordinates = await getCoordinates(city.value);
    var dataRegions = coordinates.data[0];
    const weather = await getWeather(dataRegions.lat, dataRegions.lon);
    refresHtml(weather);
}

// button buscar otros 

function searchOther() {
    containerData.style.display = "none";
    contentId.style.display = "block";
}

function main() {
    info = document.getElementById('info');
    dias = document.getElementById('dia');
    vientos = document.getElementById('viento');
    contentId = document.getElementById('contentId');
    containerData = document.getElementById('container-data');
    tempDia = document.getElementById('image-dia');
    city = document.getElementById('city');
    containerData.style.display = "none";
}

function refresHtml(weather) {
    var temperatura;
    var viento;
    var dia;

    temperatura = weather.data.main.temp;
    viento = weather.data.wind.speed;
    dia = weather.data.weather[0].main;

    console.log(temperatura, viento, dia);
    info.innerHTML = toCelsius(temperatura);
    vientos.innerHTML = viento;
    dias.innerHTML = dia;
    contentId.style.display = "none";
    containerData.style.display = "block";
    
    if (dia == 'Clouds') {
        tempDia.src = 'images/nube.png'

    } else if (dia == 'Clear') {
        tempDia.src = 'images/sol.png'
    }
    else if (dia == 'Drizzle') {
        tempDia.src = 'images/lluvia.png'
    }
    else if (dia == 'Rain') {
        tempDia.src = 'images/lluvia.png'
    }
    else if (dia == 'Snow') {
        tempDia.src = 'images/nieve.png'
    }

    else {
        dia == 'Default'
        tempDia.src = 'images/default'
    };
}

function toCelsius(kelvin) {
    return Math.round(kelvin - 273.15);
}

window.onload = () => {
    main();
}