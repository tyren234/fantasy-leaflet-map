var map = L.map('map', {
    crs: L.CRS.Simple,
    maxZoom: 3,
}).setView([-100, 100], 3);

const maxBound = 1000;
var bounds = [[0, 0], [maxBound, maxBound]];
var image = L.imageOverlay('img/maps/botw/tiles/0/0_0.jpg', bounds);
map.addLayer(image);
map.fitBounds(bounds);

map.on("zoomend", function () {
    console.log(`Zoomed current zoom level: ${map.getZoom()}`);

    map.eachLayer(function (layer) {
        map.removeLayer(layer);
    });

    // x is vertical
    // y is horizontal
    // 0,0 is in the bottom left corner

    if (map.getZoom() === 0) {
        L.imageOverlay('img/maps/botw/tiles/0/0_0.jpg', bounds).addTo(map);
    } else if (map.getZoom() === 1) {
        addTiles(2, map.getZoom());
        // L.imageOverlay('img/maps/botw/tiles/1/0_0.jpg', [[500, 0], [1000, 500]]).addTo(map);
        // L.imageOverlay('img/maps/botw/tiles/1/0_1.jpg', [[0, 0], [500, 500]]).addTo(map);
        // L.imageOverlay('img/maps/botw/tiles/1/1_0.jpg', [[500, 500], [1000, 1000]]).addTo(map);
        // L.imageOverlay('img/maps/botw/tiles/1/1_1.jpg', [[0, 500], [500, 1000]]).addTo(map);
    } else if (map.getZoom() === 2) {
        addTiles(4, map.getZoom());
    } else if (map.getZoom() === 3) {
        addTiles(8, map.getZoom());
    } else {
        L.imageOverlay('img/maps/botw/tiles/0/0_0.jpg', bounds).addTo(map);
    }
})


function addTiles(numberOfTilesAcross, zoomLevel) {
    let boundStep = maxBound / numberOfTilesAcross;

    for (let column = 0; column < numberOfTilesAcross; column++) {
        for (let row = 0; row < numberOfTilesAcross; row++) {
            console.log(`Adding image (${zoomLevel}/${column}_${row}.jpg) with following bounds: ${[[maxBound - boundStep * (row + 1), column * boundStep], [maxBound - row * boundStep, boundStep * (column + 1)]]}`);
            L.imageOverlay(`img/maps/botw/tiles/${zoomLevel}/${column}_${row}.jpg`, [[maxBound - boundStep * (row + 1), column * boundStep], [maxBound - row * boundStep, boundStep * (column + 1)]]).addTo(map);
        }
    }
}

var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent(`This point has coordinates (${Math.round(e.latlng.lat)}, ${Math.round(e.latlng.lng)})`)
        .openOn(map);
}

map.on('click', onMapClick);
