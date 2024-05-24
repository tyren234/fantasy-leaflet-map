var map = L.map('map', {
    crs: L.CRS.Simple,
    maxZoom: 3,
    doubleClickZoom: false,
}).setView([-100, 100], 3);

const maxBound = 750;

const bounds = [[0, 0], [maxBound, maxBound]];
const image = L.imageOverlay('img/maps/botw/tiles/0/0_0.jpg', bounds);
map.addLayer(image);
map.fitBounds(bounds);

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
        .setContent(`Współrzędne: (${Math.round(e.latlng.lat)}, ${Math.round(e.latlng.lng)})`)
        .openOn(map);
}

map.on('click', onMapClick);

const villageIcon = L.icon({iconUrl: "img/maps/botw/icons/village.png", iconSize: [20, 20], iconAnchor: [10, 10]});
const statueIcon = L.icon({iconUrl: "img/maps/botw/icons/statue.png", iconSize: [20, 20], iconAnchor: [10, 10]});
const towerIcon = L.icon({iconUrl: "img/maps/botw/icons/tower.png", iconSize: [20, 20], iconAnchor: [10, 10]});
const sidequestIcon = L.icon({iconUrl: "img/maps/botw/icons/sidequest.png", iconSize: [20, 20], iconAnchor: [10, 10]});
const storeIcon = L.icon({iconUrl: "img/maps/botw/icons/store.png", iconSize: [20, 20], iconAnchor: [10, 10]});
const lynelIcon = L.icon({iconUrl: "img/maps/botw/icons/lynel.png", iconSize: [20, 20], iconAnchor: [10, 10]});
const raftIcon = L.icon({iconUrl: "img/maps/botw/icons/raft.png", iconSize: [20, 20], iconAnchor: [10, 10]});
const hinoxIcon = L.icon({iconUrl: "img/maps/botw/icons/hinox.png", iconSize: [20, 20], iconAnchor: [10, 10]});
const treasureIcon = L.icon({iconUrl: "img/maps/botw/icons/treasure.png", iconSize: [20, 20], iconAnchor: [10, 10]});
const stableIcon = L.icon({iconUrl: "img/maps/botw/icons/stable.png", iconSize: [20, 20], iconAnchor: [10, 10]});
const jewelryIcon = L.icon({iconUrl: "img/maps/botw/icons/jewelry.png", iconSize: [20, 20], iconAnchor: [10, 10]});
const potIcon = L.icon({iconUrl: "img/maps/botw/icons/pot.png", iconSize: [20, 20], iconAnchor: [10, 10]});
const memoryIcon = L.icon({iconUrl: "img/maps/botw/icons/memory.png", iconSize: [20, 20], iconAnchor: [10, 10]});
const fountainIcon = L.icon({iconUrl: "img/maps/botw/icons/fountain.png", iconSize: [20, 20], iconAnchor: [10, 10]});
const armorIcon = L.icon({iconUrl: "img/maps/botw/icons/armor.png", iconSize: [20, 20], iconAnchor: [10, 10]});
const talusIcon = L.icon({iconUrl: "img/maps/botw/icons/talus.png", iconSize: [20, 20], iconAnchor: [10, 10]});
const labIcon = L.icon({iconUrl: "img/maps/botw/icons/lab.png", iconSize: [20, 20], iconAnchor: [10, 10]});
const objectiveIcon = L.icon({iconUrl: "img/maps/botw/icons/objective.png", iconSize: [20, 20], iconAnchor: [10, 10]});
const seedIcon = L.icon({iconUrl: "img/maps/botw/icons/seed.png", iconSize: [20, 20], iconAnchor: [10, 10]});
const guardianIcon = L.icon({iconUrl: "img/maps/botw/icons/guardian.png", iconSize: [20, 20], iconAnchor: [10, 10]});
const moldugaIcon = L.icon({iconUrl: "img/maps/botw/icons/molduga.png", iconSize: [20, 20], iconAnchor: [10, 10]});
const shrineIcon = L.icon({iconUrl: "img/maps/botw/icons/shrine.png", iconSize: [20, 20], iconAnchor: [10, 10]});
const settlementIcon = L.icon({
    iconUrl: "img/maps/botw/icons/settlement.png",
    iconSize: [20, 20],
    iconAnchor: [10, 10]
});
const mainquestIcon = L.icon({iconUrl: "img/maps/botw/icons/mainquest.png", iconSize: [20, 20], iconAnchor: [10, 10]});
const dyeIcon = L.icon({iconUrl: "img/maps/botw/icons/dye.png", iconSize: [20, 20], iconAnchor: [10, 10]});
const shrinequestIcon = L.icon({
    iconUrl: "img/maps/botw/icons/shrinequest.png",
    iconSize: [20, 20],
    iconAnchor: [10, 10]
});
const innIcon = L.icon({iconUrl: "img/maps/botw/icons/inn.png", iconSize: [20, 20], iconAnchor: [10, 10]});
const defaultIcon = L.icon({iconUrl: 'img/maps/botw/icons/objective.png', iconSize: [20, 20], iconAnchor: [10, 10]});

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

            if (feature.properties && feature.properties.name && feature.properties.type && feature.properties.description) {
                layer.bindPopup("<div class='popup'><h1 class='popup'>" + feature.properties.name + "</h1><p class='popup'>" + feature.properties.description + "</p></div>");
                if (layer instanceof L.Marker) {
                    switch (feature.properties.type) {
                        case "capital":
                            layer.setIcon(villageIcon);
                            break;
                        case "village":
                            layer.setIcon(villageIcon);
                            break;
                        case "statue":
                            layer.setIcon(statueIcon);
                            break;
                        case "tower":
                            layer.setIcon(towerIcon);
                            break;
                        case "sidequest":
                            layer.setIcon(sidequestIcon);
                            break;
                        case "store":
                            layer.setIcon(storeIcon);
                            break;
                        case "lynel":
                            layer.setIcon(lynelIcon);
                            break;
                        case "raft":
                            layer.setIcon(raftIcon);
                            break;
                        case "hinox":
                            layer.setIcon(hinoxIcon);
                            break;
                        case "treasure":
                            layer.setIcon(treasureIcon);
                            break;
                        case "stable":
                            layer.setIcon(stableIcon);
                            break;
                        case "jewelry":
                            layer.setIcon(jewelryIcon);
                            break;
                        case "pot":
                            layer.setIcon(potIcon);
                            break;
                        case "memory":
                            layer.setIcon(memoryIcon);
                            break;
                        case "fountain":
                            layer.setIcon(fountainIcon);
                            break;
                        case "armor":
                            layer.setIcon(armorIcon);
                            break;
                        case "talus":
                            layer.setIcon(talusIcon);
                            break;
                        case "lab":
                            layer.setIcon(labIcon);
                            break;
                        case "objective":
                            layer.setIcon(objectiveIcon);
                            break;
                        case "seed":
                            layer.setIcon(seedIcon);
                            break;
                        case "guardian":
                            layer.setIcon(guardianIcon);
                            break;
                        case "molduga":
                            layer.setIcon(moldugaIcon);
                            break;
                        case "shrine":
                            layer.setIcon(shrineIcon);
                            break;
                        case "settlement":
                            layer.setIcon(settlementIcon);
                            break;
                        case "mainquest":
                            layer.setIcon(mainquestIcon);
                            break;
                        case "dye":
                            layer.setIcon(dyeIcon);
                            break;
                        case "shrinequest":
                            layer.setIcon(shrinequestIcon);
                            break;
                        case "inn":
                            layer.setIcon(innIcon);
                            break;
                        default:
                            layer.setIcon(defaultIcon);
                            break;
                    }
                }
            }
        }
    }).addTo(map);

}

geojsonsPaths = ['geojson/neverland/landmarks.geojson']
geojsonsPaths.forEach((path) => getGeojson(path));

