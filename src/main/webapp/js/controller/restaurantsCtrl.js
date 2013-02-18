const DEFAULT_LATLNG = new google.maps.LatLng(48.886766,2.257390);
const DEFAULT_ZOOM = 15;
var divMap;
var map;
var infoWindow = new google.maps.InfoWindow();
var placesService;
var listPlaces = [];
var errorMsg = "";

function initialize() {

    divMap = document.getElementById('map');

    // Try HTML5 geolocation
    /*if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(function(position) {
     afficherMapRestaurants(new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
     }, function() {
     handleNoGeolocation(true);
     });
     } else {
     // Browser doesn't support Geolocation
     handleNoGeolocation(false);
     }*/
    afficherMapRestaurants(DEFAULT_LATLNG);
}

function afficherMapRestaurants(maPosition) {

    //alert ("Succès de la géolocalisation, vous êtes aux coordonnées : " + maPosition.lat() + ", " + maPosition.lng());
    createMap(maPosition, DEFAULT_ZOOM, false);

    /* Placement d'un marker à la localisation obtenue par géolocalisation */
    createMarker(maPosition, "Vous &ecirc;tes ici.");

    var request = {
        location: maPosition,
        radius: 1000,
        types: ['restaurant']
    };

    placesService = new google.maps.places.PlacesService(map);
    placesService.nearbySearch(request, handleNearbySearchResult);
}

function handleNearbySearchResult(results, status, pagination) {

    if (status == google.maps.places.PlacesServiceStatus.OK) {
        listPlaces = listPlaces.concat(results);
    }

    if (pagination.hasNextPage) { //Si il reste des résultats, on appelle la méthode "nextPage()" qui va redéclencher une pageSearch avec la mm fct de callback (handleNearbySearchResult)
        pagination.nextPage();
    } else { //Affichage des markers pour les places récupérées

        for (var i = 0; i < listPlaces.length; i++) {
            createMarker(listPlaces[i].geometry.location, listPlaces[i].name);
        }

        setMapVisibility(true);

        //alert ("Nb total de places obtenues : " + listPlaces.length);
    }
}

function createMarker(latLng, content) {
    var marker = new google.maps.Marker({
        map: map,
        position: latLng
    });

    google.maps.event.addListener(marker, 'click', function() {
        /*content += ("Name : " + place.name + "\n");
         content += ("types : ");
         for (var i = 0; i < place.types.length; i++) {
         content += (place.types[i] + ";");
         }
         content += "\n";
         content +=("formatted_address : " + place.formatted_address + "\n");
         content +=("formatted_phone_number : " + place.formatted_phone_number + "\n");
         content +=("international_phone_number : " + place.international_phone_number + "\n");
         content +=("icon : " + place.icon + "\n");
         content +=("permanently_closed : " + place.permanently_closed + "\n");
         content +=("price_level : " + place.price_level + "\n");
         content +=("rating : " + place.rating + "\n");
         content +=("reference : " + place.reference + "\n");
         content +=("review_summary : " + place.review_summary + "\n");
         content +=("url : " + place.url + "\n");
         content +=("vicinity : " + place.vicinity + "\n");*/
        infoWindow.setContent(content);
        infoWindow.open(map, this);
    });
}

function handleNoGeolocation(error) {
    switch(error.code) {
        case error.TIMEOUT:
            errorMsg = "Timeout !";
            break;
        case error.PERMISSION_DENIED:
            errorMsg = "Vous n’avez pas donné la permission";
            break;
        case error.POSITION_UNAVAILABLE:
            errorMsg = "La position n’a pu être déterminée";
            break;
        case error.UNKNOWN_ERROR:
            errorMsg = "Erreur inconnue";
            break;
    }
    alert(errorMsg);

    createMap(DEFAULT_LATLNG, DEFAULT_ZOOM); //Si impossible de géolocaliser, localisation par défaut
}

function createMap(poosition, zoom, visibleFlag) {
    if (visibleFlag == false) {
        divMap.style.visibility = "hidden";
    }

    map = new google.maps.Map(divMap, {
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: poosition,
        zoom: zoom
    });
}

function setMapVisibility(visibleFlag) {
    if (visibleFlag == false) {
        divMap.style.visibility = "hidden";
    } else {
        divMap.style.visibility = "visible";
    }
}

google.maps.event.addDomListener(window, 'load', initialize);
