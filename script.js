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
    const apiKey = 'b6fd43b81b56c8800ccc89b5e898cedc'; // Free API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        displayWeather(data);
        clearError();
    } catch (error) {
        showError(error.message);
    }
}

// Display Weather Data
function displayWeather(data) {
    const weatherDisplay = document.getElementById('weatherDisplay');
    const temp = Math.round(data.main.temp);
    const feelsLike = Math.round(data.main.feels_like);
    const icon = getWeatherIcon(data.weather[0].main);

    document.getElementById('location').textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById('temperature').textContent = `${temp}°C`;
    document.getElementById('description').textContent = data.weather[0].main;
    document.getElementById('icon').textContent = icon;
    document.getElementById('feelsLike').textContent = `${feelsLike}°C`;
    document.getElementById('humidity').textContent = `${data.main.humidity}%`;
    document.getElementById('windSpeed').textContent = `${data.wind.speed} m/s`;
    document.getElementById('pressure').textContent = `${data.main.pressure} hPa`;

    weatherDisplay.classList.add('active');
}

// Weather Icon Mapping
function getWeatherIcon(weather) {
    const icons = {
        'Clear': '☀️',
        'Clouds': '☁️',
        'Rain': '🌧️',
        'Drizzle': '🌦️',
        'Thunderstorm': '⛈️',
        'Snow': '❄️',
        'Mist': '🌫️'
    };
    return icons[weather] || '🌍';
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
