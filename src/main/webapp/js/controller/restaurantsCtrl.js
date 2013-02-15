const DEFAULT_LATLNG = new google.maps.LatLng(60, 105);
const DEFAULT_ZOOM = 10;
var map;
var infoWindow;
var placesService;
var listPlaces = [];
var total = 0;

function initialize() {

    // Try HTML5 geolocation
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(handleGeolocationSuccess, function() {
            handleNoGeolocation(true);
        });
    } else {
        // Browser doesn't support Geolocation
        handleNoGeolocation(false);
    }
}

function handleGeolocationSuccess(position) {
    var maPosition = new google.maps.LatLng(position.coords.latitude,
        position.coords.longitude);

    //alert ("Succès de la géolocalisation, vous êtes aux coordonnées : " + position.coords.latitude + ", " + position.coords.longitude);
    afficherMap(maPosition, DEFAULT_ZOOM);

    /* Placement d'un marker à la localisation obtenue par géolocalisation */
    var markerGeolocation = new google.maps.Marker({
        map: map,
        position: maPosition
    });
    google.maps.event.addListener(markerGeolocation, 'click', function() {
        infoWindow.setContent("Vous êtes ici.");
        infoWindow.open(map, this);
    });
    /* Fin marker geolocation */

    var request = {
        location: maPosition,
        radius: 1100,
        types: ['restaurant']
    };

    infoWindow = new google.maps.InfoWindow();

    placesService = new google.maps.places.PlacesService(map);
    placesService.nearbySearch(request, handleNearbySearchResult);
}

function handleNearbySearchResult(results, status, pagination) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        listPlaces = listPlaces.concat(results);
    }
    if (pagination.hasNextPage) { //Si il reste des résultats, on appelle la méthode "nextPage()" qui va redéclencher une pageSearch avec la mm fct de callback (handleNearbySearchResult)
        pagination.nextPage();
    } else {
        for (var i = 0; i < listPlaces.length; i++, total++) {
            createMarker(listPlaces[i]);
        }

        alert ("Nb total de places obtenues : " + total);
        total = 0;
    }

}

function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function() {
        infoWindow.setContent(place.name);
        infoWindow.open(map, this);
    });
}

function handleNoGeolocation(errorFlag) {
    if (errorFlag) {
        var content = 'Error: The Geolocation service failed.';
    } else {
        var content = 'Error: Your browser doesn\'t support geolocation.';
    }
    alert(content);

    afficherMap(DEFAULT_LATLNG, DEFAULT_ZOOM); //Si impossible de géolocaliser, localisation par défaut
}

function afficherMap(poosition, zoom) {
    map = new google.maps.Map(document.getElementById('map'), {
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: poosition,
        zoom: zoom
    });
}

google.maps.event.addDomListener(window, 'load', initialize);
