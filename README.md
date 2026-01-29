# 🚀 Space Travel Weather Station

A small, space-themed weather app that shows current conditions for any city. Type a city name, press Search (or Enter), and the app fetches live weather data and displays it in a futuristic UI with a twinkling starfield.

## What it does
- Look up a city name (geocoding) and fetch current weather for its coordinates.
- Shows: temperature, "feels like", humidity, wind speed, and a weather icon/description.
- Uses a simple space-themed layout with animated stars.

## APIs
- Geocoding + forecast: Open‑Meteo (no API key required).
  - Geocoding endpoint: geocoding-api.open-meteo.com
  - Forecast endpoint: api.open-meteo.com

## How to run locally
1. Clone or open this folder.
2. Serve the files (recommended) or open index.html in a browser:
   - Quick server (requires Python):  
     - Windows PowerShell / Command Prompt: `python -m http.server 8000`
     - Then open: `http://localhost:8000`
   - Or use the VS Code Live Server extension.
3. Type a city name in the search box and press Enter or click Search.

Note: Some browsers block fetch requests from file://; using a local server avoids CORS/network issues.

## File overview
- index.html — main page and UI
- style.css — visual styling and animations
- script.js — starfield, geocoding, weather fetch, and UI update logic
- README.md — this file

## Usage tips & troubleshooting
- If you see "City not found", try a more specific name (e.g., "Paris, FR" or include country).
- If nothing loads, open DevTools (F12) → Console / Network to view errors or failed requests.
- If the UI shows stale results after multiple searches, reload the page.

## Contributing / Git
Make changes locally, then commit and push:

```bash
cd c:\Users\Diya\OneDrive\test
git add .
git commit -m "Update README and app improvements"
git pull origin main   # pull remote changes first if required
git push origin main
```

## Ideas for improvement
- Add a 5-day forecast
- Geolocation fallback to show local weather
- Celsius/Fahrenheit toggle
- Save favorite cities

Made with plain HTML, CSS, and JavaScript — enjoy exploring the weather across the galaxy! 🌍🚀
