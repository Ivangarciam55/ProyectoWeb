const apiKey = '3782fa8c329f6163cf1c5bce8b501cc1'; // Tu clave de API de OpenWeatherMap

function getWeather() {
    const location = document.getElementById('location').value;

    if (location) {
        // Si el usuario ha ingresado una ciudad, obtenemos el clima de esa ciudad
        console.log(`Obteniendo clima por medio de la ubicación: ${location}`); // Log para ver la ubicación ingresada
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric&lang=es`)
            .then(response => response.json())
            .then(data => displayWeather(data))
            .catch(error => console.error('Error al obtener clima por la ubicación:', error));
    } else {
        // Si no se ingresó ubicación, intenta obtenerla con geolocalización
        if (navigator.geolocation) {
            console.log("Intentando obtener la ubicación del usuario..."); // Log para ver si entra en el bloque de geolocalización
            navigator.geolocation.getCurrentPosition(position => {
                const { latitude, longitude } = position.coords;
                console.log(`Latitud: ${latitude}, Longitud: ${longitude}`); // Log para depurar la posición
                fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=es`)
                    .then(response => response.json())
                    .then(data => displayWeather(data))
                    .catch(error => console.error('Error al obtener el clima por geolocalización:', error));
            }, error => {
                console.error('Error al obtener la geolocalización:', error); // Log para ver errores de geolocalización
                alert('No se pudo obtener tu ubicación. Por favor, ingresa una ciudad manualmente.');
            });
        } else {
            alert('La geolocalización no es soportada por este navegador.');
        }
    }
}

function displayWeather(data) {
    const weatherDiv = document.getElementById('weather');

    if (data && data.weather && data.weather.length > 0) {
        // Truncar los decimales a uno y mostrar en español
        const temperatura = data.main.temp.toFixed(1); // Trunca la temperatura a un decimal
        const descripcion = data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1);

        weatherDiv.innerHTML = `
            <h2>${data.name}</h2>
            <p>Temperatura: ${temperatura} °C</p>
            <p>Clima: ${descripcion}</p>
        `;
    } else {
        weatherDiv.innerHTML = '<p>No se pudo obtener la información del clima.</p>';
    }
}

// Inicialmente obtener el clima de la ubicación del usuario al cargar la página
document.addEventListener('DOMContentLoaded', getWeather);
