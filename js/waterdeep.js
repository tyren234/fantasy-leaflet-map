document.body.style.setProperty("--accent-primary-color", "cornflowerblue");

const maxZoomLevel = 4;

var map = L.map('map', {
    crs: L.CRS.Simple,
    maxZoom: maxZoomLevel,
    doubleClickZoom: false,
});

const maxBound = 750;
const height = 7256/8;
const width = 3560/8;

const bounds = [[0, 0], [height, width]];
const image = L.imageOverlay('img/maps/waterdeep/waterdeep_map.jpg', bounds);
map.addLayer(image);
map.fitBounds(bounds);
// map.setView([height/2, width/2], 2);
map.setView([706, 300], 2);

// map.on("zoomend", function () {
    // console.log(`Zoomed current zoom level: ${map.getZoom()}`);
    // let images = [];
    // for (let i = 0; i < images.length; i++) {
    //     images[i].removeFrom(map);
    // }
    // // x is vertical
    // // y is horizontal
    // // 0,0 is in the bottom left corner
    //
    // if (map.getZoom() === 0) {
    //     const image = L.imageOverlay('img/maps/botw/tiles/0/0_0.jpg', bounds).addTo(map);
    //     images.push(image);
    // } else if (map.getZoom() <= maxZoomLevel) {
    //     addTiles(Math.pow(2, map.getZoom()), map.getZoom(), images);
    // }
    // else{
    //     L.imageOverlay('img/maps/botw/tiles/0/0_0.jpg', bounds).addTo(map);
    // }
// })

// function addTiles(numberOfTilesAcross, zoomLevel, containerList) {
//     let boundStep = maxBound / numberOfTilesAcross;
//
//     for (let column = 0; column < numberOfTilesAcross; column++) {
//         for (let row = 0; row < numberOfTilesAcross; row++) {
//             // console.log(`Adding image (${zoomLevel}/${column}_${row}.jpg) with following bounds: ${[[maxBound - boundStep * (row + 1), column * boundStep], [maxBound - row * boundStep, boundStep * (column + 1)]]}`);
//             const image = L.imageOverlay(`img/maps/botw/tiles/${zoomLevel}/${column}_${row}.jpg`, [[maxBound - boundStep * (row + 1), column * boundStep], [maxBound - row * boundStep, boundStep * (column + 1)]]).addTo(map);
//             containerList.push(image);
//         }
//     }
// }

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

geojsonsPaths = ['geojson/waterdeep/landmarks.json']
geojsonsPaths.forEach((path) => getGeojson(path));

