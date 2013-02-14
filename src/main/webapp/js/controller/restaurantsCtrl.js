const DEFAULT_LATLNG = new google.maps.LatLng(60, 105);
const DEFAULT_ZOOM = 15;
var map;
var infowindow;

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
        infowindow.setContent("Vous êtes ici.");
        infowindow.open(map, this);
    });
    /* Fin marker geolocation */

    var request = {
        location: maPosition,
        radius: 1000,
        types: ['restaurant']
    };

    infowindow = new google.maps.InfoWindow();

    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, handleNearbySearchResult);
}

function handleNearbySearchResult(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
        }
    }
}

function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
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
