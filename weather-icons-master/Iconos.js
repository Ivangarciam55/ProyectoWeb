const apiKey = "TU_API_KEY"; // Reemplaza con tu API Key de OpenWeatherMap
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

async function getWeather() {
    const location = document.getElementById("location").value;
    if (!location) {
        alert("Por favor ingresa una ubicación.");
        return;
    }

    try {
        const response = await fetch(`${apiUrl}?q=${location}&appid=${apiKey}&units=metric&lang=es`);
        if (!response.ok) throw new Error("Ciudad no encontrada.");
        const data = await response.json();
        updateWeatherUI(data);
    } catch (error) {
        alert(error.message);
    }
}

function updateWeatherUI(data) {
    const weatherElement = document.getElementById("weather");
    const weatherIcon = data.weather[0].icon; // Icono de OpenWeatherMap
    const weatherDescription = data.weather[0].description; // Descripción del clima
    const temp = data.main.temp; // Temperatura

    // Actualizar contenido
    weatherElement.innerHTML = `
        <i class="wi wi-owm-${data.weather[0].id}"></i>
        <p>${weatherDescription} | ${temp}°C</p>
    `;

    // Cambiar fondo según el clima
    const weatherApp = document.querySelector(".weather-app");
    if (data.weather[0].main === "Clear") {
        weatherApp.style.backgroundColor = "#FFD700"; // Día soleado
        document.body.style.backgroundImage = "linear-gradient(to bottom, #FFEE88, #FFD700)";
    } else if (data.weather[0].main === "Clouds") {
        weatherApp.style.backgroundColor = "#B0C4DE"; // Nublado
        document.body.style.backgroundImage = "linear-gradient(to bottom, #D3D3D3, #B0C4DE)";
    } else if (data.weather[0].main === "Rain") {
        weatherApp.style.backgroundColor = "#1F2937"; // Lluvioso
        document.body.style.backgroundImage = "linear-gradient(to bottom, #667780, #1F2937)";
    } else {
        weatherApp.style.backgroundColor = "#708090"; // Otro clima
        document.body.style.backgroundImage = "linear-gradient(to bottom, #A9A9A9, #708090)";
    }
}
