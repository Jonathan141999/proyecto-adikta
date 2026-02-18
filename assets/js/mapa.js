document.addEventListener('DOMContentLoaded', () => {
    const mapElement = document.getElementById('map');
    if (!mapElement) return;

    // 1. Obtener idioma actual
    const lang = document.documentElement.lang || 'es';

    // 2. Definir coordenadas y textos por idioma
    const data = {
        es: {
            lat: -2.900128,
            lng: -79.005896,
            zoom: 15,
            popup: "<b>Oficina Central</b><br>Adikt@ PC - Ecuador"
        },
        en: {
            lat: 25.792200,
            lng: -80.250600, // Coordenadas aprox. de la dirección en Miami
            zoom: 15,
            popup: "<b>USA Office</b><br>Adikt@ PC - Miami"
        }
    };

    const currentData = data[lang] || data['es'];

    // 3. Inicializar Mapa
    // Asegurarnos de limpiar si ya existe (por si acaso usamos turbolinks o similar en futuro)
    if (window.myLeafletMap) {
        window.myLeafletMap.remove();
    }

    const map = L.map('map').setView([currentData.lat, currentData.lng], currentData.zoom);
    window.myLeafletMap = map; // Guardar referencia global simple

    // 4. Capa de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // 5. Marcador
    L.marker([currentData.lat, currentData.lng]).addTo(map)
        .bindPopup(currentData.popup)
        .openPopup();
});
