//var price_points ={price_points.geojson};
var myLayer = L.geoJSON();

//BaseLayers
var gmap = L.tileLayer('http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}', {
    maxZoom: 25,
    attribution: 'Google Map'
  })
var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
});

var osmHOT = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors, Tiles style by Humanitarian OpenStreetMap Team hosted by OpenStreetMap France'});

var map = L.map('map', {
    center: [9.845, 8.90633],
    zoom: 10,
    layers: [osm,myLayer]
});
//Layers Object
var baseMaps = {
    "Google Hybrid":gmap,
    "OpenStreetMap": osm,
    "OpenStreetMap.HOT": osmHOT
};

var overlayMaps = {
   "Price Points": myLayer
};

//Add to map
var layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);

// Function to handle routing
var routingControl = null;
var markers = [];

function addRoutingControl(start, end) {
    if (routingControl) {
        map.removeControl(routingControl);
    }
    routingControl = L.Routing.control({
        waypoints: [
            L.latLng(start.lat, start.lng),
            L.latLng(end.lat, end.lng)
        ],
        routeWhileDragging: true
    }).on('routesfound', function (e) {
        var routes = e.routes;
        var summary = routes[0].summary;
        var distance = summary.totalDistance / 1000; // distance in km
        var price = (distance * 100) + 500;
        var roundedPrice = Math.ceil(price / 100) * 100; // round up to nearest hundred
        document.getElementById('price-display').innerText = 'Price: ₦' + roundedPrice;
    }).addTo(map);
}

var waypoints = [];

// Function to handle map clicks
function onMapClick(e) {
    if (waypoints.length < 2) {
        var marker = L.marker(e.latlng).addTo(map);
        markers.push(marker);
        waypoints.push(e.latlng);

        if (waypoints.length === 2) {
            addRoutingControl(waypoints[0], waypoints[1]);
        }
    }
}

// Function to reset waypoints
function resetWaypoints() {
    if (routingControl) {
        map.removeControl(routingControl);
    }
    waypoints = [];
    markers.forEach(function(marker) {
        map.removeLayer(marker);
    });
    markers = [];
    document.getElementById('price-display').innerText = 'Price: ₦0';
}

// Add click event listener to the map
map.on('click', onMapClick);

// Add click event listener to the reset button
document.getElementById('reset-btn').addEventListener('click', resetWaypoints);

// Add geocoder control
L.Control.geocoder().addTo(map).on('markgeocode', function(e) {
    var latlng = e.geocode.center;
    if (waypoints.length < 2) {
        var marker = L.marker(latlng).addTo(map);
        markers.push(marker);
        waypoints.push(latlng);

        if (waypoints.length === 2) {
            addRoutingControl(waypoints[0], waypoints[1]);
        }
    }
    map.setView(latlng, 13);
});
