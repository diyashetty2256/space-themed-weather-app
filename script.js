// Generate Random Stars
function createStarfield() {
    const starfield = document.getElementById('starfield');
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        starfield.appendChild(star);
    }
}

// Fetch Weather Data
async function fetchWeather(city) {
    // First, get city coordinates
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`;
    
    try {
        const geoResponse = await fetch(geoUrl);
        const geoData = await geoResponse.json();
        
        if (!geoData.results || geoData.results.length === 0) {
            throw new Error('City not found');
        }
        
        const location = geoData.results[0];
        const { latitude, longitude, name, country } = location;
        
        // Get weather data using coordinates
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&temperature_unit=celsius`;
        
        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();
        
        displayWeather(weatherData, name, country);
        clearError();
    } catch (error) {
        showError(error.message);
    }
}

// Display Weather Data
function displayWeather(data, name, country) {
    const weatherDisplay = document.getElementById('weatherDisplay');
    const current = data.current;
    const temp = Math.round(current.temperature_2m);
    const weatherDescription = getWeatherDescription(current.weather_code);
    const icon = getWeatherIcon(current.weather_code);

    document.getElementById('location').textContent = `${name}, ${country}`;
    document.getElementById('temperature').textContent = `${temp}°C`;
    document.getElementById('description').textContent = weatherDescription;
    document.getElementById('icon').textContent = icon;
    document.getElementById('feelsLike').textContent = `${temp}°C`;
    document.getElementById('humidity').textContent = `${current.relative_humidity_2m}%`;
    document.getElementById('windSpeed').textContent = `${current.wind_speed_10m} m/s`;
    document.getElementById('pressure').textContent = `--`;

    weatherDisplay.classList.add('active');
}

// Weather Icon Mapping
function getWeatherIcon(code) {
    if (code === 0) return '☀️';      // Clear
    if (code === 1 || code === 2) return '⛅';  // Partly cloudy
    if (code === 3) return '☁️';      // Cloudy
    if (code === 45 || code === 48) return '🌫️'; // Foggy
    if (code === 51 || code === 53 || code === 55) return '🌦️'; // Drizzle
    if (code === 61 || code === 63 || code === 65) return '🌧️'; // Rain
    if (code === 71 || code === 73 || code === 75) return '❄️'; // Snow
    if (code === 77) return '❄️';    // Snow grains
    if (code === 80 || code === 81 || code === 82) return '🌧️'; // Showers
    if (code === 85 || code === 86) return '❄️'; // Snow showers
    if (code === 80 || code === 81 || code === 82) return '🌧️'; // Rain showers
    if (code === 95 || code === 96 || code === 99) return '⛈️'; // Thunderstorm
    return '🌍';
}

// Get Weather Description from code
function getWeatherDescription(code) {
    if (code === 0) return 'Clear Sky';
    if (code === 1 || code === 2) return 'Partly Cloudy';
    if (code === 3) return 'Cloudy';
    if (code === 45 || code === 48) return 'Foggy';
    if (code === 51 || code === 53 || code === 55) return 'Drizzle';
    if (code === 61 || code === 63 || code === 65) return 'Rain';
    if (code === 71 || code === 73 || code === 75) return 'Snow';
    if (code === 77) return 'Snow Grains';
    if (code === 80 || code === 81 || code === 82) return 'Rain Showers';
    if (code === 85 || code === 86) return 'Snow Showers';
    if (code === 95 || code === 96 || code === 99) return 'Thunderstorm';
    return 'Unknown';
}

// Search Function
function searchWeather() {
    const searchInput = document.getElementById('searchInput');
    const city = searchInput.value.trim();
    if (city) {
        fetchWeather(city);
    }
}

// Error Handling
function showError(message) {
    const errorDiv = document.getElementById('error');
    errorDiv.textContent = `Error: ${message}`;
    errorDiv.classList.add('active');
}

function clearError() {
    const errorDiv = document.getElementById('error');
    errorDiv.classList.remove('active');
}

// Allow Enter Key to Search
document.getElementById('searchInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchWeather();
    }
});

// Initialize
createStarfield();
fetchWeather('London'); // Default city
