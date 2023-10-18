//Reading the DataFile which contains significant earthquakes - the past month:
var queryURL="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
// Perform a GET request to the query URL/
d3.json(queryURL).then(function (data) {
  // Sending data.features object to the createFeatures function.
  createFeatures(data.features);
});
function createFeatures(earthquakeData) {
  // Define a function that we want to run once for each feature in the features array.
  // Give each feature a popup that describes the latitue and longitude of the earthquake for each earthquake in the past 7 days:
  function onEachFeature(feature, layer) {
    layer.bindPopup(`<h3>${feature.properties.geometry.coordinates[0]}</h3><h3>${feature.properties.geometry.coordinates[1]}</h3>`);
  }

  // Create a GeoJSON layer that contains the features array on the earthquakeData object.
  // Run the onEachFeature function once for each piece of data in the array.
  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature
  });

  // Send our earthquakes layer to the createMap function/
  createMap();
}

//Create the markers by Magnitude (ASSUME COORDINATE 1) and Depth (Coordinate 3):
var MagnitudeMarkers=[] 
var DepthMarkers=[]
for (var i=0,i<eathquakes.length,i++)
{MagnitudeMarkers.push(L.circle(earthquakes[i].properties.geometry.coordinates[0], 
{stroke:false, fillOpacity: 0.75, color: "white", fillcolor: "white", radius: markerSize(earthquakes[i].properties.geometry.coordinates[0])}))};
{DepthMarkers.push(L.circle(earthquakes[i].properties.geometry.coordinates[2],
{stroke:false, fillOpacity: 0.75, color: "purple", fillColor: "purple", radius: markerSize(earthquakes[i].properties.geometry.coordinates[2])}))};

function createMap(earthquakes) {

  // Create the base layers.
  var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })

  var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });

  // Create a baseMaps object.
  var baseMaps = {
    "Street Map": street,
    "Topographic Map": topo
  };

  // Create an overlay object to hold our overlay.
  var overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load.
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [street, earthquakes]
  });

  // Create a layer control.
  // Pass it our baseMaps and overlayMaps.
  // Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

}
                                        
