(function() {
	var clouds, cloudsStatus=true, cloudsThreshold=1000;
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

	var timeleft = function() {
		var endDate = new Date(2013, 7, 9);
		var now = new Date();
		var left = endDate - now;
		var days = Math.floor(left / (1000 * 60 * 60 * 24));
		document.getElementById("timeleft").innerHTML = "You have <strong>" + days + " days </strong> left.";
	};

	window.addEventListener("load", function() {
		// skr = skrollr.init({});
		// skrollr.menu.init(skr);
		clouds = new Clouds(3, -50, 350, document.getElementById("clouds"));
		clouds.start();
		cloudsStatus = true;

		mapinit();

		timeleft();
	});

	window.addEventListener("scroll", function() {
		if (clouds === undefined) return;

		var newPos = window.pageYOffset;
		if (newPos < cloudsThreshold && cloudsStatus === false) {
			clouds.start();
			cloudsStatus = true;
		} else if (newPos > cloudsThreshold && cloudsStatus === true) {
			clouds.stop();
			cloudsStatus = false;
		}
	});
})();
