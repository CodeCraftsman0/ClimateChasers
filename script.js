// function searchWeather() {
//   const locationInput = document.getElementById('locationInput');
//   const location = locationInput.value.trim();

//   if (location !== '') {
    // Replace 'YOUR_API_KEY' with your actual API key
//     const apiKey = '826311399635472cc40a079d621da316';
//     const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

//     fetch(apiUrl)
//       .then(response => response.json())
//       .then(data => {
//         displayWeather(data);
//       })
//       .catch(error => {
//         console.log('Error:', error);
//       });
//   }
// }

// function displayWeather(data) {
//   const weatherElement = document.getElementById('weather');
//   weatherElement.innerHTML = '';

//   if (data.cod === '404') {
//     const errorMessage = document.createElement('p');
//     errorMessage.textContent = 'Location not found. Please try again.';
//     weatherElement.appendChild(errorMessage);
//   } else {
//     const weatherEntry = data.weather[0];

//     const weatherIcon = document.createElement('i');
//     weatherIcon.classList.add('weather-icon');
//     weatherIcon.classList.add(getWeatherIconClass(weatherEntry.icon));
//     weatherElement.appendChild(weatherIcon);

//     const weatherDescription = document.createElement('p');
//     weatherDescription.classList.add('weather-description');
//     weatherDescription.textContent = weatherEntry.description;
//     weatherElement.appendChild(weatherDescription);

//     const weatherTemperature = document.createElement('p');
//     weatherTemperature.classList.add('weather-temperature');
//     weatherTemperature.textContent = `${data.main.temp.toFixed(1)}°C`;
//     weatherElement.appendChild(weatherTemperature);

//     const weatherDetails = document.createElement('div');
//     weatherDetails.classList.add('weather-details');
//     weatherElement.appendChild(weatherDetails);

//     const humidity = document.createElement('p');
//     humidity.textContent = `Humidity: ${data.main.humidity}%`;
//     weatherDetails.appendChild(humidity);

//     const windSpeed = document.createElement('p');
//     windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
//     weatherDetails.appendChild(windSpeed);

//     const visibility = document.createElement('p');
//     visibility.textContent = `Visibility: ${data.visibility / 1000} km`;
//     weatherDetails.appendChild(visibility);
//   }
// }

// function getWeatherIconClass(iconCode) {
//   const iconMapping = {
//     '01d': 'wi-day-sunny',
//     '01n': 'wi-night-clear',
//     '02d': 'wi-day-cloudy',
//     '02n': 'wi-night-alt-cloudy',
//     '03d': 'wi-cloud',
//     '03n': 'wi-cloud',
//     '04d': 'wi-cloudy',
//     '04n': 'wi-cloudy',
//     '09d': 'wi-showers',
//     '09n': 'wi-showers',
//     '10d': 'wi-day-rain',
//     '10n': 'wi-night-rain',
//     '11d': 'wi-thunderstorm',
//     '11n': 'wi-thunderstorm',
//     '13d': 'wi-snow',
//     '13n': 'wi-snow',
//     '50d': 'wi-fog',
//     '50n': 'wi-fog',
//   };

//   return iconMapping[iconCode] || 'wi-na';
// }














let map;

function initMap() {
  // Initialize the map
  map = L.map('map').setView([0, 0], 2);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openweathermap.org/">OpenStreetMap</a> contributors',
  }).addTo(map);
}

function searchWeather() {
  const locationInput = document.getElementById('locationInput');
  const location = locationInput.value.trim();

  if (location !== '') {
    // Replace 'YOUR_API_KEY' with your actual API key
    const apiKey = '826311399635472cc40a079d621da316';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

    // Make a request to the weather API
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        // Process the weather data and display it
        displayWeather(data);

        // Update the map with the location
        const { lat, lon } = data.coord;
        map.setView([lat, lon], 10);
        L.marker([lat, lon]).addTo(map);
      })
      .catch(error => {
        console.log('Error:', error);
      });
  }
}

function displayWeather(data) {
  const weatherElement = document.getElementById('weather');
  weatherElement.innerHTML = '';

  if (data.cod === '404') {
    const errorMessage = document.createElement('p');
    errorMessage.textContent = 'Location not found. Please try again.';
    weatherElement.appendChild(errorMessage);
  } else {
    const weatherEntry = data.weather[0];

    const weatherIcon = document.createElement('i');
    weatherIcon.classList.add('weather-icon');
    weatherIcon.classList.add(getWeatherIconClass(weatherEntry.icon));
    weatherElement.appendChild(weatherIcon);

    const weatherDescription = document.createElement('p');
    weatherDescription.classList.add('weather-description');
    weatherDescription.textContent = weatherEntry.description;
    weatherElement.appendChild(weatherDescription);

    const weatherTemperature = document.createElement('p');
    weatherTemperature.classList.add('weather-temperature');
    weatherTemperature.textContent = `${data.main.temp.toFixed(1)}°C`;
    weatherElement.appendChild(weatherTemperature);

    const weatherDetails = document.createElement('div');
    weatherDetails.classList.add('weather-details');
    weatherElement.appendChild(weatherDetails);

    const humidity = document.createElement('p');
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    weatherDetails.appendChild(humidity);

    const windSpeed = document.createElement('p');
    windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
    weatherDetails.appendChild(windSpeed);

    const visibility = document.createElement('p');
    visibility.textContent = `Visibility: ${data.visibility / 1000} km`;
    weatherDetails.appendChild(visibility);
  }
}

function getWeatherIconClass(iconCode) {
  // Map the weather icon codes to appropriate icon classes
  // You can customize this mapping based on the weather API you are using
  const iconMapping = {
    '01d': 'wi-day-sunny',
    '01n': 'wi-night-clear',
    '02d': 'wi-day-cloudy',
    '02n': 'wi-night-alt-cloudy',
    '03d': 'wi-cloud',
    '03n': 'wi-cloud',
    '04d': 'wi-cloudy',
    '04n': 'wi-cloudy',
    '09d': 'wi-showers',
    '09n': 'wi-showers',
    '10d': 'wi-day-rain',
    '10n': 'wi-night-rain',
    '11d': 'wi-thunderstorm',
    '11n': 'wi-thunderstorm',
    '13d': 'wi-snow',
    '13n': 'wi-snow',
    '50d': 'wi-fog',
    '50n': 'wi-fog',
  };

  return iconMapping[iconCode] || 'wi-na';
}

// Initialize the map when the page loads
document.addEventListener('DOMContentLoaded', initMap);
