(function() {
	var skr;

	var map;
	var mapinit = function() {
		var startuphub = new google.maps.LatLng(45.757139, 21.221099);
		var mapOptions = {
			zoom: 15,
			center: startuphub,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

		new google.maps.Marker({
			position: startuphub,
			map: map,
			title: "StartupHub 700"
		});
	}


	window.addEventListener("load", function() {
		// skr = skrollr.init({});
		// skrollr.menu.init(skr);

		mapinit();

		// timeleft();
	});
})();
