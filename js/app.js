var map = L.map('map', {
    crs: L.CRS.Simple,
    maxZoom: 3,
    doubleClickZoom: false,
});

const maxBound = 750;

const bounds = [[0, 0], [maxBound, maxBound]];
const image = L.imageOverlay('img/maps/botw/tiles/0/0_0.jpg', bounds);
map.addLayer(image);
map.fitBounds(bounds);
map.setView([maxBound/2, maxBound/2], 1);
map.on("zoomend", function () {
    // console.log(`Zoomed current zoom level: ${map.getZoom()}`);
    let images = [];
    for (let i = 0; i < images.length; i++) {
        images[i].removeFrom(map);
    }
    // x is vertical
    // y is horizontal
    // 0,0 is in the bottom left corner

    if (map.getZoom() === 0) {
        const image = L.imageOverlay('img/maps/botw/tiles/0/0_0.jpg', bounds).addTo(map);
        images.push(image);
    } else if (map.getZoom() === 1) {
        addTiles(2, map.getZoom(), images);
        // L.imageOverlay('img/maps/botw/tiles/1/0_0.jpg', [[500, 0], [1000, 500]]).addTo(map);
        // L.imageOverlay('img/maps/botw/tiles/1/0_1.jpg', [[0, 0], [500, 500]]).addTo(map);
        // L.imageOverlay('img/maps/botw/tiles/1/1_0.jpg', [[500, 500], [1000, 1000]]).addTo(map);
        // L.imageOverlay('img/maps/botw/tiles/1/1_1.jpg', [[0, 500], [500, 1000]]).addTo(map);
    } else if (map.getZoom() === 2) {
        addTiles(4, map.getZoom(), images);
    } else if (map.getZoom() === 3) {
        addTiles(8, map.getZoom(), images);
    } else {
        L.imageOverlay('img/maps/botw/tiles/0/0_0.jpg', bounds).addTo(map);
    }
})


function addTiles(numberOfTilesAcross, zoomLevel, containerList) {
    let boundStep = maxBound / numberOfTilesAcross;

    for (let column = 0; column < numberOfTilesAcross; column++) {
        for (let row = 0; row < numberOfTilesAcross; row++) {
            // console.log(`Adding image (${zoomLevel}/${column}_${row}.jpg) with following bounds: ${[[maxBound - boundStep * (row + 1), column * boundStep], [maxBound - row * boundStep, boundStep * (column + 1)]]}`);
            const image = L.imageOverlay(`img/maps/botw/tiles/${zoomLevel}/${column}_${row}.jpg`, [[maxBound - boundStep * (row + 1), column * boundStep], [maxBound - row * boundStep, boundStep * (column + 1)]]).addTo(map);
            containerList.push(image);
        }
    }
}

var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent(`Współrzędne: (${Math.round(e.latlng.lng)}, ${Math.round(e.latlng.lat)})`)
        .openOn(map);
}

map.on('click', onMapClick);

async function getGeojson(geojsonPath) {
    let featureCollection;

    await $.getJSON(geojsonPath, function (data) {
        featureCollection = data;
    }).fail(function (e) {
        console.log(`Failed getting geojson ${geojsonPath}`);
        console.log(e);
    });

    L.geoJSON(featureCollection, {
        onEachFeature: function (feature, layer) {

            if (feature.properties && feature.properties.name && feature.properties.type ) {
                layer.bindPopup("<div class='popup'><h1 class='popup'>" + feature.properties.name + "</h1><p class='popup'>" + feature.properties.description + "</p></div>");
                if (layer instanceof L.Marker) {
                    if (feature.properties.type in iconsMap){
                        layer.setIcon(iconsMap[feature.properties.type]);
                    }
                    else{
                        layer.setIcon(defaultIcon);
                    }
                }
            }
        }
    }).addTo(map);

}

geojsonsPaths = ['geojson/neverland/landmarks.json']
geojsonsPaths.forEach((path) => getGeojson(path));

