/* Lumina Weather Application Controller
   Coordinates global API sync, local storage pinning, weather sandbox mock triggers,
   and deterministic simulation generators. */

class AppController {
    constructor() {
        this.currentWeather = null;
        this.pins = [];
        this.apiKey = localStorage.getItem('lumina_api_key') || '';
        
        this.initElements();
        this.setupEventListeners();
        this.loadAPIKey();
        this.loadPins();
        
        // Load default city on startup
        this.performSearch('London');
    }

    initElements() {
        // Form & Search Elements
        this.searchForm = document.getElementById('search-form');
        this.searchInput = document.getElementById('search-input');
        
        // Sidebar Control Elements
        this.sandboxButtons = document.querySelectorAll('.sandbox-btn');
        this.apiKeyInput = document.getElementById('api-key-input');
        this.apiStatusText = document.getElementById('api-status-text');
        this.apiStatusDot = document.querySelector('.status-dot');
        this.pinsList = document.getElementById('pins-list');
        this.pinCityBtn = document.getElementById('pin-city-btn');
        
        // Display Output Elements
        this.weatherCity = document.getElementById('weather-city');
        this.weatherCountry = document.getElementById('weather-country');
        this.weatherTemp = document.getElementById('weather-temp');
        this.weatherIconLarge = document.getElementById('weather-icon-large');
        this.weatherDescText = document.getElementById('weather-desc-text');
        this.weatherHumidity = document.getElementById('weather-humidity');
        this.weatherWind = document.getElementById('weather-wind');
        this.weatherFeels = document.getElementById('weather-feels');
        this.weatherPressure = document.getElementById('weather-pressure');
        this.forecastStrip = document.getElementById('forecast-strip');
        
        // Visual Alerts Box
        this.toastContainer = document.getElementById('toast-container');
    }

    setupEventListeners() {
        // Search trigger
        this.searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const city = this.searchInput.value.trim();
            if (city) {
                this.performSearch(city);
                this.searchInput.value = '';
            }
        });

        // Sandbox Mode Toggles
        this.sandboxButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const weatherState = btn.dataset.weather;
                this.activateSandboxWeather(weatherState);
                
                // Toggle active state in UI
                this.sandboxButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });

        // Live API settings input listener
        this.apiKeyInput.addEventListener('input', () => {
            this.apiKey = this.apiKeyInput.value.trim();
            localStorage.setItem('lumina_api_key', this.apiKey);
            this.updateAPIStatus();
        });

        // Pin current city listener
        this.pinCityBtn.addEventListener('click', () => {
            this.togglePinCurrentCity();
        });
    }

    loadAPIKey() {
        if (this.apiKey) {
            this.apiKeyInput.value = this.apiKey;
        }
        this.updateAPIStatus();
    }

    updateAPIStatus() {
        if (this.apiKey) {
            this.apiStatusText.textContent = 'Live Synced Mode Active';
            this.apiStatusDot.className = 'status-dot live';
        } else {
            this.apiStatusText.textContent = 'Simulated Mode Active';
            this.apiStatusDot.className = 'status-dot simulated';
        }
    }

    // Displays dynamic toast banners for beautiful micro-feedback
    showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const emoji = type === 'success' ? '⚡' : '⚠️';
        toast.innerHTML = `<span>${emoji}</span><span>${message}</span>`;
        
        this.toastContainer.appendChild(toast);
        
        // Remove toast automatically after 3 seconds
        setTimeout(() => {
            toast.style.animation = 'fadeOut 0.3s forwards';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // Handles searches dynamically (API live call or clean local simulation fallback)
    async performSearch(city) {
        if (this.apiKey) {
            // Live Search Query
            this.showToast(`Connecting live network for "${city}"...`);
            try {
                const data = await this.fetchLiveWeather(city);
                this.currentWeather = this.formatLiveWeather(data);
                this.renderWeather();
                this.showToast(`Found live data for ${this.currentWeather.name}`, 'success');
            } catch (err) {
                console.error(err);
                this.showToast(`Failed fetching live data: ${err.message}. Switched to local mode.`, 'error');
                this.performSimulatedSearch(city);
            }
        } else {
            // High fidelity simulation lookup
            this.performSimulatedSearch(city);
        }
    }

    async fetchLiveWeather(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${this.apiKey}&units=metric`;
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(res.status === 401 ? 'Invalid API Key' : 'City not found');
        }
        return await res.json();
    }

    formatLiveWeather(data) {
        const conditionMap = {
            'Clear': 'clear',
            'Clouds': 'clouds',
            'Drizzle': 'rain',
            'Rain': 'rain',
            'Thunderstorm': 'storm',
            'Snow': 'snow',
            'Mist': 'clouds',
            'Smoke': 'clouds',
            'Haze': 'clouds',
            'Dust': 'clouds',
            'Fog': 'clouds',
            'Sand': 'clouds',
            'Ash': 'clouds',
            'Squall': 'storm',
            'Tornado': 'storm'
        };

        const emojis = {
            'clear': '☀️',
            'clouds': '☁️',
            'rain': '🌧️',
            'storm': '⛈️',
            'snow': '❄️'
        };

        const cond = conditionMap[data.weather[0].main] || 'clear';
        const temp = Math.round(data.main.temp);

        return {
            name: data.name,
            country: data.sys.country,
            temp: temp,
            condition: cond,
            desc: data.weather[0].description,
            emoji: emojis[cond],
            humidity: `${data.main.humidity}%`,
            wind: `${Math.round(data.wind.speed * 3.6)} km/h`, // convert m/s to km/h
            feels: `${Math.round(data.main.feels_like)}°C`,
            pressure: `${data.main.pressure} hPa`,
            forecast: this.generateMockForecast(temp, cond, data.id || 101)
        };
    }

    performSimulatedSearch(city) {
        // Generate deterministic, fully realistic mock weather statistics
        let seed = 0;
        const normalizedCity = city.trim().toLowerCase();
        for (let i = 0; i < normalizedCity.length; i++) {
            seed += normalizedCity.charCodeAt(i);
        }

        const conditions = ['clear', 'clouds', 'rain', 'storm', 'snow'];
        const selectedCondition = conditions[seed % conditions.length];
        
        let baseTemp = 12 + (seed % 16); // 12°C to 28°C
        if (selectedCondition === 'snow') baseTemp = -6 + (seed % 8); // -6°C to +2°C
        if (selectedCondition === 'storm') baseTemp = 18 + (seed % 10);
        
        const descriptions = {
            'clear': ['clear sky', '☀️'],
            'clouds': ['broken clouds', '☁️'],
            'rain': ['moderate drizzle', '🌧️'],
            'storm': ['thunderstorm warning', '⛈️'],
            'snow': ['blowing fresh snow', '❄️']
        };

        const countries = ['FR', 'UK', 'US', 'JP', 'DE', 'CA', 'AU', 'IT', 'CH'];
        const desc = descriptions[selectedCondition];

        this.currentWeather = {
            name: city.charAt(0).toUpperCase() + city.slice(1),
            country: countries[seed % countries.length],
            temp: Math.round(baseTemp),
            condition: selectedCondition,
            desc: desc[0],
            emoji: desc[1],
            humidity: `${45 + (seed % 40)}%`,
            wind: `${8 + (seed % 28)} km/h`,
            feels: `${Math.round(baseTemp + (selectedCondition === 'clear' ? 2 : -2))}°C`,
            pressure: `${1005 + (seed % 18)} hPa`,
            forecast: this.generateMockForecast(baseTemp, selectedCondition, seed)
        };

        this.renderWeather();
        this.showToast(`Loaded simulated profile for ${this.currentWeather.name}`);
        
        // Sync sandbox buttons active highlight state
        this.sandboxButtons.forEach(btn => {
            if (btn.dataset.weather === selectedCondition) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    generateMockForecast(baseTemp, condition, seed) {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const currentDayIndex = new Date().getDay();
        const forecast = [];
        
        const emojis = {
            'clear': '☀️',
            'clouds': '☁️',
            'rain': '🌧️',
            'storm': '⛈️',
            'snow': '❄️'
        };

        for (let i = 1; i <= 5; i++) {
            const nextDayIndex = (currentDayIndex + i) % 7;
            // Generate minor temperature trends oscillating deterministic-randomly
            const tempOffset = Math.sin(seed + i) * 3.5;
            const maxTemp = Math.round(baseTemp + tempOffset + 2);
            const minTemp = Math.round(baseTemp + tempOffset - 4);
            
            // Randomly shift forecast conditions occasionally for variety
            const fCondition = (seed + i) % 5 === 0 ? 'clouds' : condition;

            forecast.push({
                day: days[nextDayIndex],
                emoji: emojis[fCondition] || '☀️',
                max: maxTemp,
                min: minTemp
            });
        }
        return forecast;
    }

    // Activates sandbox overrides (Instant UI and particle transitions)
    activateSandboxWeather(state) {
        if (!this.currentWeather) return;
        
        const descriptions = {
            'clear': ['simulated clear sky', '☀️', 26, '40%', '8 km/h', '1016 hPa'],
            'clouds': ['simulated overcast clouds', '☁️', 16, '68%', '12 km/h', '1012 hPa'],
            'rain': ['simulated rainfall', '🌧️', 12, '88%', '22 km/h', '1006 hPa'],
            'storm': ['simulated thunderstorm', '⛈️', 20, '92%', '38 km/h', '998 hPa'],
            'snow': ['simulated snow shower', '❄️', -2, '78%', '16 km/h', '1002 hPa']
        };

        const desc = descriptions[state];
        
        // Update weather data object values
        this.currentWeather.condition = state;
        this.currentWeather.desc = desc[0];
        this.currentWeather.emoji = desc[1];
        this.currentWeather.temp = desc[2];
        this.currentWeather.humidity = desc[3];
        this.currentWeather.wind = desc[4];
        this.currentWeather.feels = `${desc[2] + (state === 'clear' ? 2 : -2)}°C`;
        this.currentWeather.pressure = desc[5];
        this.currentWeather.forecast = this.generateMockForecast(desc[2], state, 88);

        this.renderWeather();
        this.showToast(`Sandbox Mode: Simulating ${desc[0].toUpperCase()}`, 'success');
    }

    // Dynamic UI card renderer
    renderWeather() {
        if (!this.currentWeather) return;

        // Transition background canvas particle engines smoothly
        if (window.weatherCanvas) {
            window.weatherCanvas.transitionTo(this.currentWeather.condition);
        }

        // Apply visual glows representing active weather conditions
        const root = document.documentElement;
        
        // Write details inside core card containers
        this.weatherCity.textContent = this.currentWeather.name;
        this.weatherCountry.textContent = this.currentWeather.country;
        this.weatherTemp.textContent = this.currentWeather.temp;
        this.weatherIconLarge.textContent = this.currentWeather.emoji;
        this.weatherDescText.textContent = this.currentWeather.desc;
        
        this.weatherHumidity.textContent = this.currentWeather.humidity;
        this.weatherWind.textContent = this.currentWeather.wind;
        this.weatherFeels.textContent = this.currentWeather.feels;
        this.weatherPressure.textContent = this.currentWeather.pressure;

        // Re-check pinned status
        this.updatePinButtonState();

        // Render 5-day Trend Cards
        this.forecastStrip.innerHTML = '';
        this.currentWeather.forecast.forEach(item => {
            const card = document.createElement('div');
            card.className = 'forecast-card';
            card.innerHTML = `
                <span class="forecast-day">${item.day}</span>
                <span class="forecast-icon">${item.emoji}</span>
                <div class="forecast-temp">
                    <span class="forecast-max">${item.max}°</span>
                    <span class="forecast-min">${item.min}°</span>
                </div>
            `;
            this.forecastStrip.appendChild(card);
        });
    }

    // Pin Location Engine - Core persistence handlers
    loadPins() {
        const saved = localStorage.getItem('lumina_pins');
        if (saved) {
            this.pins = JSON.parse(saved);
        }
        this.renderPins();
    }

    savePins() {
        localStorage.setItem('lumina_pins', JSON.stringify(this.pins));
        this.renderPins();
    }

    updatePinButtonState() {
        if (!this.currentWeather) return;
        const isPinned = this.pins.some(p => p.name.toLowerCase() === this.currentWeather.name.toLowerCase());
        if (isPinned) {
            this.pinCityBtn.classList.add('active');
            this.pinCityBtn.title = 'Remove Pin';
        } else {
            this.pinCityBtn.classList.remove('active');
            this.pinCityBtn.title = 'Pin City';
        }
    }

    togglePinCurrentCity() {
        if (!this.currentWeather) return;
        
        const idx = this.pins.findIndex(p => p.name.toLowerCase() === this.currentWeather.name.toLowerCase());
        if (idx > -1) {
            // Remove pin
            this.pins.splice(idx, 1);
            this.showToast(`Removed pin for ${this.currentWeather.name}`);
        } else {
            // Add pin
            this.pins.push({
                name: this.currentWeather.name,
                country: this.currentWeather.country,
                temp: this.currentWeather.temp,
                emoji: this.currentWeather.emoji
            });
            this.showToast(`Pinned ${this.currentWeather.name} to persistent history!`, 'success');
        }
        
        this.savePins();
        this.updatePinButtonState();
    }

    renderPins() {
        if (this.pins.length === 0) {
            this.pinsList.innerHTML = '<div class="empty-state">No pinned cities yet. Pin a city to save it locally.</div>';
            return;
        }

        this.pinsList.innerHTML = '';
        this.pins.forEach(pin => {
            const item = document.createElement('div');
            item.className = 'pin-item';
            item.innerHTML = `
                <span class="pin-city-name">${pin.name}, ${pin.country}</span>
                <div class="pin-details">
                    <span class="pin-temp">${pin.emoji} ${pin.temp}°C</span>
                    <button class="btn-remove-pin" title="Remove">
                        <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2.5" fill="none">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
            `;
            
            // Clicking card searches city
            item.addEventListener('click', (e) => {
                if (e.target.closest('.btn-remove-pin')) return;
                this.performSearch(pin.name);
            });

            // Clicking remove button clears pin
            item.querySelector('.btn-remove-pin').addEventListener('click', () => {
                this.pins = this.pins.filter(p => p.name.toLowerCase() !== pin.name.toLowerCase());
                this.showToast(`Unpinned ${pin.name}`);
                this.savePins();
                this.updatePinButtonState();
            });

            this.pinsList.appendChild(item);
        });
    }
}

// Spin up application on DOM load
document.addEventListener('DOMContentLoaded', () => {
    window.appController = new AppController();
});
