document.addEventListener('DOMContentLoaded', function () {
    if (!window.mapToken) {
        console.error('Mapbox token is missing');
        return;
    }

    mapboxgl.accessToken = window.mapToken;

    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: window.listing.geometry.coordinates,
        zoom: 2
    });

    // Move marker creation inside this block
    new mapboxgl.Marker({ color: 'red' })
        .setLngLat(window.listing.geometry.coordinates)
        .setPopup(new mapboxgl.Popup({offset:25})
        .setHTML(`<h4>${listing.location}</h4><p>Exact Location After Booking!</p>`)) // add popup
        .addTo(map);
});
