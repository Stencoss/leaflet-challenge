// Set up leaflet map
// Center on CA area
var map = L.map('map', {
    center: [36, -118],
    zoom: 7
});


// Add a basic map to the window
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Add earthquake data to the map
// Need to loop JSON and find data points
// import JSON data  - This pulls the data
// url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson'

// Experimnetinig with pulling data locally.
url = 'earthquake.json'
d3.json(url).then(function(data) {

    // console.log(data.features[0])  // Path to coordinates
    // console.log(data.features[0].properties.mag)        // Magnitude of earthquake
    // For loop pulling all the data out of json -
    var markers = L.markerClusterGroup();
    
    // listOfQuakes = []
    for (let i = 0; i < data.features.length; i++) {
        // console.log(data.features[i].geometry.coordinates[0] + " " + data.features[i].properties.mag)
        var location = data.features[i].geometry.coordinates
        var magitude = data.features[i].properties.mag  // Size
        var depth = location[2]                         // Color
        var color_depth = 'FFFFFF'
        // console.log(location[0] + "  " + location[1] + "  " + location[2])

        // Make Circles pretty  neon green, lime green, light orange, dark orange,  orange red, red
        // Depth is the color and size  is mag
        if (depth < 10) {
            color_depth = '#ABEA64';
        } else if (depth < 30) {
            color_depth = '#78AE3C'
        } else if (depth < 50) {
            color_depth = '#FFC300'
        } else if (depth < 70) {
            color_depth = '#DE942F'
        } else if (depth < 90) {
            color_depth = "#FF5733"
        } else {
            color_depth = '#C70039 '
        }




        // Need Circles
        L.circle([location[1], location[0]], {
            color: color_depth,
            radius: magitude * 8000,
            fillOpacity: .5
        }).bindPopup("<b>Place:</b> " + data.features[i].properties.place + 
        "<br><b>Depth:</b> " +  location[2] + 
        "<br><b>Magitude:</b> " + data.features[i].properties.mag).addTo(map);
    


        // markers.addLayer(L.marker([data.features[i].geometry.coordinates[1], data.features[i].geometry.coordinates[0]])
            // .bindPopup("<b>Place:</b> " + data.features[i].properties.place + 
            // "<br><b>Depth:</b> " +  location[2] + 
            // "<br><b>Magitude:</b> " + data.features[i].properties.mag));
        
          
    }
    map.addLayer(markers);


});


