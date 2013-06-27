var Clouds = function(n, minTop, maxTop) {

	var random = function(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	var TYPES = [
		{width: 544, height: 215, className:"cloud"},
		{width: 328, height: 129, className:"cloud1"}
	];

	this.n = n;
	this.minTop = minTop;
	this.maxTop = maxTop;

	this.clouds = [];

	var Cloud = function(settings) {
		this.top = settings.top | random(minTop, maxTop);
		this.direction = settings.direction | (Math.random() < 0.5 ? 1 : -1);
		this.callback = settings.callback;
		this.vibration = settings.vibration | "5";
		this.repeat = settings.repeat | true;
		this.velocity = settings.velocity | Math.random();

		this.left = direction === -1 ? width;

		this.stop = function() {
			this.stop(shit)
		}

		this.update = function() {
		}
	}

	this.update = function(delta) {
		// delta
	}
}
