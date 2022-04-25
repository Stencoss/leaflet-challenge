// Set up leaflet map
// Center on CA area
var map = L.map('map', {
    center: [36, -118],
    zoom: 7
});
    // .setView([36, -118], 7);

// Add a basic map to the window
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Add earthquake data to the map
// Need to loop JSON and find data points

// import JSON data  - This pulls the data
url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson'
// d3.json(url).then(data => {
//     console.log(data)
//     console.log(data[0])
// })

// Experimnetinig with pulling data locally.
// url = 'earthquake.json'
d3.json(url).then(function(data) {

    // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    // attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    // }).addTo(map);
    // console.log(data)
    console.log(data.features[0].geometry.coordinates)  // Path to coordinates
    // console.log(data.features[0].properties.mag)        // Magnitude of earthquake
    // For loop pulling all the data out of json -
    var markers = L.markerClusterGroup();
    
    // listOfQuakes = []
    for (let i = 0; i < data.features.length; i++) {
        // console.log(data.features[i].geometry.coordinates[0] + " " + data.features[i].properties.mag)
        var location = data.features[i].geometry.coordinates
        console.log(location[0] + "  " + location[1] + "  " + location[2])

        markers.addLayer(L.marker([data.features[i].geometry.coordinates[1], data.features[i].geometry.coordinates[0]])
            .bindPopup(location[2].toString()));
        
          
    }
    map.addLayer(markers);


});


