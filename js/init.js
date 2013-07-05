(function() {
	var clouds, cloudsStatus=true, cloudsThreshold=1000;
	var skr;
	window.addEventListener("load", function() {
		skr = skrollr.init({});
		skrollr.menu.init(skr);
		clouds = new Clouds(3, -50, 350, document.getElementById("clouds"));
		clouds.start();
		cloudsStatus = true;
	});
	window.addEventListener("scroll", function() {
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
