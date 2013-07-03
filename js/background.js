var Clouds = function(n, minTop, maxTop, domParent) {

	var random = function(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	var TYPES = [
		{width: 544, height: 215, className:"cloud"},
		{width: 328, height: 129, className:"cloud2"}
	];

	this.n = n;
	this.minTop = minTop;
	this.maxTop = maxTop;

	this.clouds = [];

	this.running = false;

	this.updateDom = function(cloud) {
		cloud.dom.style.left = Math.round(cloud.left) + "px";
		cloud.dom.style.top = Math.round(cloud.top) + "px";
	}

	this.createCloud = function(type) {
		var dom = document.createElement("div");
		var cT = TYPES[type];
		
		if (cT === undefined) {
			cT = TYPES[1];
		}

		dom.className = cT.className;

		var cloud = {
			dom: dom,
			width: cT.width,
			height: cT.height,
			fixedTop: random(minTop, maxTop),
			top: 0,
			left: 0,
			direction: Math.random() < 0.5 ? 1 : -1,
			velocity: (Math.random()+1)/20,
			vibration: random(1,5)
		};

		cloud.left = cloud.direction === 1 ? -cloud.width : window.innerWidth;
		cloud.top = cloud.fixedTop;

		domParent.appendChild(dom);

		this.updateDom(cloud);

		return cloud;
	}

	this.addClouds = function(no) {
		var i;
		for (i=0; i<no; i++) {
			this.clouds.push(this.createCloud(Math.random() < 0.5 ? 0 : 1));
		}
	}

	this.outOfScreen = function(cloud) {
		return ((cloud.direction === 1 && cloud.left > window.innerWidth)
			|| (cloud.direction === -1 && cloud.left < -cloud.width));
	}

	this.update = function(delta) {
		var i, max=this.clouds.length;
		for (i=0;i<max;i++) {

			var cloud = this.clouds[i];
			cloud.left += cloud.velocity * delta * cloud.direction;

			if (this.outOfScreen(cloud) === true) {
				cloud.direction *= -1;
				cloud.velocity = (Math.random()+1)/20;
				cloud.fixedTop = random(this.minTop, this.maxTop);
				var t = TYPES[(Math.random() < 0.5 ? 0 : 1)];
				cloud.width = t.width;
				cloud.height = t.height;
				if (cloud.direction === 1 && cloud.left > -cloud.width) {
					cloud.left = -cloud.width;
				}
				cloud.dom.className = t.className;
				console.log(cloud.fixedTop);
			}

			var tmp = Math.PI * cloud.vibration * cloud.left / window.innerWidth;
			cloud.top = cloud.fixedTop + Math.sin(tmp)*((6-cloud.vibration)*10);

			this.updateDom(cloud);
		}
	}


	this.lastFrame = 0;
	this.loop = function() {
		if (this.running === false)	return;

		var that = this;

		window.requestAnimationFrame(function() { that.loop.call(that); });

		var now = Date.now();
		var delta = now - this.lastFrame;
		if (delta > 150) { delta = 1000/60; }

		this.update(delta);

		this.lastFrame = now;
	}

	this.start = function() {
		this.running = true;
		var that = this;
		window.requestAnimationFrame(function() { that.loop.call(that) });
	}

	this.stop = function() {
		this.running = false;
	}

	this.addClouds(n);
}