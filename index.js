const locatio = 'london';
const conditionText = document.getElementById('condition');
const currentLocation = document.getElementById('current-location');
const newLocation = document.getElementById('new-location');
const newLocationBtn = document.getElementById('new-location-btn');
const toggleTempBtn = document.getElementById('toggle-temp');
const temperature = document.getElementById('temperature');
const feelslike = document.getElementById('feelslike');
const humidity = document.getElementById('humidity');
const windDir = document.getElementById('wind-dir');
const windSpeed = document.getElementById('wind-speed');
const updated = document.getElementById('updated');
const err = document.getElementById('error');
const img = document.querySelector('img');

function showWeatherByLocation(locatio) {
    fetch(`https://api.weatherapi.com/v1/current.json?key=55ed21aea8da4e5298a175558242303&q=${locatio}`, {mode: 'cors'})
    .then(function(response) {
        console.log(`${response.status}`)
        return response.json();
    })
    .then(function(response) {      
      err.textContent = ''
      currentLocation.textContent = `${response.location.name}, ${response.location.country}`.toUpperCase();
      conditionText.textContent = `${response.current.condition.text}`;
      humidity.textContent = `Humidity ${response.current.humidity} %`;
      windDir.textContent = `Wind direction ${response.current.wind_dir}`;
      windSpeed.textContent = `Wind speed ${response.current.wind_kph} km/h / ${response.current.wind_mph} mph`;
      updated.textContent = `Last updated ${response.current.last_updated}`;
      showNewImage(`${response.current.condition.text}`);
      
      if (toggleTempBtn.textContent === 'Switch to °F') {
        temperature.textContent = `${response.current.temp_c}° C`;
        feelslike.textContent = `Feels like ${response.current.feelslike_c} °C`;
      } else {
        temperature.textContent = `${response.current.temp_f}° F`;
        feelslike.textContent = `Feels like ${response.current.feelslike_f} °F`;
      }
    })
    .catch(function(error) {
        console.log('location not found')
        err.textContent = 'Location not found. Try again'
    });
}

showWeatherByLocation(locatio);

newLocationBtn.addEventListener('click', () => {
    showWeatherByLocation(newLocation.value);
})

toggleTempBtn.addEventListener('click', toggleTemp)

function toggleTemp() {
    if (toggleTempBtn.textContent === 'Switch to °F') {
        toggleTempBtn.textContent = 'Switch to °C';
        if (newLocation.value) {
            showWeatherByLocation(newLocation.value);
        } else {
            showWeatherByLocation(locatio);
        }        
    } else {
        toggleTempBtn.textContent = 'Switch to °F';
        if (newLocation.value) {
            showWeatherByLocation(newLocation.value);
        } else {
            showWeatherByLocation(locatio);
        }
    }
}

function showNewImage(item) {
    fetch(`https://api.giphy.com/v1/gifs/translate?api_key=7e8SToRs05fla1j3bV7CpziqMhJTIIif&s=${item}`, {mode: 'cors'})
    .then(function(response) {
        if (response.status === 401) {
            console.log('wrong api key')
        }
        return response.json();
    })
    .then(function(response) {
        img.src = response.data.images.original.url;
    })
    .catch(function(err) {
        console.log('error')
    });
}