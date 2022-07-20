const API_KEY = '62138210cea32ede9ef8fe48c9076214';
const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather';
const GEO_URL = 'http://api.openweathermap.org/geo/1.0';
let info;
let containerData;
let contentId;
let dias;
let vientos;
const countriesData = {
  chile: ['santiago', 'valdivia', 'puerto montt'],
  colombia: ['cali', 'bogota', 'medellin'],
}

function populateCountries(countrySelect) {
  let keys = Object.keys(countriesData);

  for (let i = 0; i < keys.length; i++) {
    const element = keys[i];
    let option = document.createElement('option');
    option.value = element;
    option.innerHTML = element;
    countrySelect.appendChild(option);
  }
}

async function getWeather(lat, lon) {
  return new Promise((resolve, reject) => {
    axios.get(`${WEATHER_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
      .then((response) => {
        console.log(response);
        resolve(response);
        var temperatura;
        var viento;
        var dia;
        temperatura = response.data.main.temp;
        console.log(temperatura);//
        viento = response.data.wind.speed;
        console.log(viento); //
        dia = response.data.weather[0].main;
        console.log(dia); //
        refresHtml(temperatura,viento,dia);
      });
  });
}

function removeOptions(select) {
  select.options.length = 0;
}

function populateRegions(regionSelect, regions) {
  let option = document.createElement('option');
  option.value = '';
  option.innerHTML = 'Escoge tu región';
  regionSelect.appendChild(option);

  for (let i = 0; i < regions.length; i++) {
    const element = regions[i];
    option = document.createElement('option');
    option.value = element;
    option.innerHTML = element;
    regionSelect.appendChild(option);
  }
}

function changeRegions(countrySelected) {
  console.log('countrySelected: ' + countrySelected);

  const regionSelect = document.getElementById('regionsId');
  const regionsData = countriesData[countrySelected];
  console.log('regionData: ' + regionsData);

  removeOptions(regionSelect);
  populateRegions(regionSelect, regionsData);
}

function search() {
  const regionSelect = document.getElementById('regionsId');
  const selectedIndex = regionSelect.options.selectedIndex;
  const regionSelected = regionSelect.options[selectedIndex].value;
  console.log(regionSelected);
  // llamar api para obtener coordenadas F
 getCoordinates(regionSelected);
}

// button buscar otros 

function searchOther() {
  containerData.style.display="none";
  contentId.style.display="block";
}

async function getCoordinates(region) {
  return new Promise((resolve, reject) => {
    axios.get(`${GEO_URL}/direct?q=${region}&appid=${API_KEY}`)
      .then((response) => {
        console.log(response);
        resolve(response);
        var dataRegions = response.data[0];
        console.log(dataRegions); // borrar despues
        getWeather(dataRegions.lat, dataRegions.lon);
      });
  });
}

function main() {
  info = document.getElementById('info');
  dias = document.getElementById('dia');
  vientos = document.getElementById('viento');
  contentId = document.getElementById('contentId');
  containerData = document.getElementById('container-data');
  containerData.style.display="none";
  // populamos countries
  const countrySelect = document.getElementById('countriesId');
  populateCountries(countrySelect);
  //agregamos event en el form
  countrySelect.addEventListener('change', (event) => {
    changeRegions(event.target.value);
  });
  // agregamos evento al buscar
}

function refresHtml(temperatura,viento,dia) {
  console.log(temperatura,viento,dia);
  info.innerHTML = toCelsius(temperatura);
  vientos.innerHTML = viento;
  dias.innerHTML = dia;
  console.log(dia); //
  console.log(viento);//
  console.log(info);
  contentId.style.display="none";
  containerData.style.display="block";
}

function toCelsius(kelvin) {
  return Math.round(kelvin - 273.15);
}


window.onload = () => {
  main();
}