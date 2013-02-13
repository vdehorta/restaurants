var map;

var service;

var infowindow = new google.maps.InfoWindow();

function initialize() {
    var mapOptions = {
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

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
    var pos = new google.maps.LatLng(position.coords.latitude,
    position.coords.longitude);

    var infowindow = new google.maps.InfoWindow({
        map: map,
        position: pos,
        content: 'Location found using HTML5.'
    });

    map.setCenter(pos);

    //launchNearbySearch(pos);
}

function handleNoGeolocation(errorFlag) {
    if (errorFlag) {
        var content = 'Error: The Geolocation service failed.';
    } else {
        var content = 'Error: Your browser doesn\'t support geolocation.';
    }

    var options = {
        map: map,
        position: new google.maps.LatLng(60, 105),
        content: content
    };

    var infowindow = new google.maps.InfoWindow(options);
    map.setCenter(options.position);
}

function launchNearbySearch(posLatLng) {

    service = new google.maps.places.PlacesService(document.getElementById('map_canvas'));
    var request = {
        location: posLatLng,
        radius: 1000,
        types: ['restaurant']
    };

    alert("Avant nearbySearch");
    service.nearbySearch(request, function(results, status) {

        alert("nearbySearch effectuée avec succès ou pas");

        if (status == google.maps.places.PlacesServiceStatus.OK) {
            alert("Nearby search success number = " + results.length);
            displayNearbyRestaurants(results);
        } else {
            alert("Erreur pdt la Search request !");
        }
    });
}

function displayNearbyRestaurants(results) {

	alert("displayNearbyRestaurants()");

	for (var i = 0; i < results.length; i++) {
		createMarker(results[i]);
	}
}

function createMarker(place) {

	alert("createMarker() pour la place de nom " + place.name + " et de lieu " + place.vicinity);

	var placeLoc = place.geometry.location;
	var marker = new google.maps.Marker({
		map: map,
		position: place.geometry.location});

	google.maps.event.addListener(marker, 'click', function() {
		infowindow.setContent(place.name);
		infowindow.open(map, this);});
}

google.maps.event.addDomListener(window, 'load', initialize);