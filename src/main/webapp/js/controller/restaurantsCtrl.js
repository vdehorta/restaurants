const DEFAULT_LATLNG = new google.maps.LatLng(60, 105);
const DEFAULT_ZOOM = 15;
var map;
var infoWindow;
var placesService;
var listPlaces = [];
var total = 0;
var errorMsg;

function initialize() {

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
	afficherMapRestaurants(new google.maps.LatLng(48.886766,2.257390));
}

function afficherMapRestaurants(maPosition) {

    //alert ("Succès de la géolocalisation, vous êtes aux coordonnées : " + maPosition.lat() + ", " + maPosition.lng());
    createMap(maPosition, DEFAULT_ZOOM);

    /* Placement d'un marker à la localisation obtenue par géolocalisation */
    var markerGeolocation = new google.maps.Marker({
        map: map,
        position: maPosition
    });
    google.maps.event.addListener(markerGeolocation, 'click', function() {
        infoWindow.setContent("Vous &ecirc;tes ici.");
        infoWindow.open(map, this);
    });
    /* Fin marker geolocation */

    var request = {
        location: maPosition,
        radius: 1000,
        types: ['restaurant']
    };

    infoWindow = new google.maps.InfoWindow();

    placesService = new google.maps.places.PlacesService(map);
    //placesService.nearbySearch(request, handleNearbySearchResult);
	placesService.radarSearch(request, handleRadarSearchResult);
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

function handleRadarSearchResult(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        alert("Nb de places récupérées avec radar : " + results.length);
    }
	//Affichage des details de places récupérées
	for (var i = 0; i < results.length; i++) {
		//getDetailPlace(results[i].reference);
		createMarker(results[i]);
	}
}

function getDetailPlace(reference) {
	var detailRequest = {
		reference: reference
	};
	placesService.getDetails(detailRequest, displayDetailledPlace);
}

function displayDetailledPlace(place, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    createMarker(place);
  } else {
	switch(status) {
        case google.maps.places.PlacesServiceStatus.INVALID_REQUEST:
        	errorMsg = "INVALID_REQUEST !";
        break;
        case google.maps.places.PlacesServiceStatus.OVER_QUERY_LIMIT:
        	errorMsg = "OVER_QUERY_LIMIT !";
        break;
		case google.maps.places.PlacesServiceStatus.REQUEST_DENIED:
        	errorMsg = "REQUEST_DENIED !";
        break;
		case google.maps.places.PlacesServiceStatus.UNKNOWN_ERROR:
        	errorMsg = "UNKNOWN_ERROR !";
        break;
		case google.maps.places.PlacesServiceStatus.ZERO_RESULTS:
        	errorMsg = "ZERO_RESULTS !";
        break;
    }
    alert(errorMsg);
  }
}

function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function() {
		var content = "";
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
        content +=("Name : " + place.name);
		infoWindow.setContent(content);
        infoWindow.open(map, this);
    });
}

function createMarker(place) {
	var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });
	google.maps.event.addListener(marker, 'click', function() {
		var content = "";
        content +=("Lat : " + place.geometry.location.lat() + ", Lng : " + place.geometry.location.lng());
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

function createMap(poosition, zoom) {
    map = new google.maps.Map(document.getElementById('map'), {
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: poosition,
        zoom: zoom
    });
}

google.maps.event.addDomListener(window, 'load', initialize);
