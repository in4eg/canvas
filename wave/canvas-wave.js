document.addEventListener('DOMContentLoaded', function(){
	// Ported from Stefan Gustavson's java implementation
	// http://staffwww.itn.liu.se/~stegu/simplexnoise/simplexnoise.pdf
	// Read Stefan's excellent paper for details on how this code works.
	//
	// Sean McCullough banksean@gmail.com

	/**
	 * You can pass in a random number generator object if you like.
	 * It is assumed to have a random() method.
	 */
	var ClassicalNoise = function(r) { // Classic Perlin noise in 3D, for comparison 
		if (r == undefined) r = Math;
		this.grad3 = [[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0], 
																	 [1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1], 
																	 [0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]];
		this.p = [];
		for (var i=0;i<256;i++) {
			this.p[i] = Math.floor(r.random()*256);
		}
		// To remove the need for index wrapping, double the permutation table length 
		this.perm = [];
		for(var i=0;i<512;i++) {
			this.perm[i]=this.p[i & 255];
		}
	};

	ClassicalNoise.prototype.dot = function(g, x, y, z) { 
			return g[0]*x + g[1]*y + g[2]*z;
	};

	ClassicalNoise.prototype.mix = function(a, b, t) { 
			return (1.0-t)*a + t*b;
	};

	ClassicalNoise.prototype.fade = function(t) { 
			return t*t*t*(t*(t*6.0-15.0)+10.0);
	};

		// Classic Perlin noise, 3D version 
	ClassicalNoise.prototype.noise = function(x, y, z) { 
		// Find unit grid cell containing point 
		var X = Math.floor(x);
		var Y = Math.floor(y);
		var Z = Math.floor(z);
		
		// Get relative xyz coordinates of point within that cell 
		x = x - X;
		y = y - Y;
		z = z - Z;
		
		// Wrap the integer cells at 255 (smaller integer period can be introduced here) 
		X = X & 255;
		Y = Y & 255;
		Z = Z & 255;
		
		// Calculate a set of eight hashed gradient indices 
		var gi000 = this.perm[X+this.perm[Y+this.perm[Z]]] % 12;
		var gi001 = this.perm[X+this.perm[Y+this.perm[Z+1]]] % 12;
		var gi010 = this.perm[X+this.perm[Y+1+this.perm[Z]]] % 12;
		var gi011 = this.perm[X+this.perm[Y+1+this.perm[Z+1]]] % 12;
		var gi100 = this.perm[X+1+this.perm[Y+this.perm[Z]]] % 12;
		var gi101 = this.perm[X+1+this.perm[Y+this.perm[Z+1]]] % 12;
		var gi110 = this.perm[X+1+this.perm[Y+1+this.perm[Z]]] % 12;
		var gi111 = this.perm[X+1+this.perm[Y+1+this.perm[Z+1]]] % 12;

		// The gradients of each corner are now: 
		// g000 = grad3[gi000];
		// g001 = grad3[gi001];
		// g010 = grad3[gi010];
		// g011 = grad3[gi011];
		// g100 = grad3[gi100];
		// g101 = grad3[gi101];
		// g110 = grad3[gi110];
		// g111 = grad3[gi111];
		// Calculate noise contributions from each of the eight corners 
		var n000= this.dot(this.grad3[gi000], x, y, z);
		var n100= this.dot(this.grad3[gi100], x-1, y, z);
		var n010= this.dot(this.grad3[gi010], x, y-1, z);
		var n110= this.dot(this.grad3[gi110], x-1, y-1, z);
		var n001= this.dot(this.grad3[gi001], x, y, z-1);
		var n101= this.dot(this.grad3[gi101], x-1, y, z-1);
		var n011= this.dot(this.grad3[gi011], x, y-1, z-1);
		var n111= this.dot(this.grad3[gi111], x-1, y-1, z-1);
		// Compute the fade curve value for each of x, y, z 
		var u = this.fade(x);
		var v = this.fade(y);
		var w = this.fade(z);
		// Interpolate along x the contributions from each of the corners 
		var nx00 = this.mix(n000, n100, u);
		var nx01 = this.mix(n001, n101, u);
		var nx10 = this.mix(n010, n110, u);
		var nx11 = this.mix(n011, n111, u);
		// Interpolate the four results along y 
		var nxy0 = this.mix(nx00, nx10, v);
		var nxy1 = this.mix(nx01, nx11, v);
		// Interpolate the two last results along z 
		var nxyz = this.mix(nxy0, nxy1, w);

		return nxyz;
	};



	class CanvasWaveAnimation {
		canvas = null;
		ctx = null;

		canvasWidth = 0;
		canvasHeight = 0;

		_destroyed = true;

		options = {
			perlin: new ClassicalNoise(),
			variation: .001,
			amp: 600,
			maxLines: 40,
			lineSpace: .03,
			variators: [],
			startY: 0,
			heightOffset: 120
		}

		constructor(host){
			if (!host) return;
			this._destroyed = false;
			this.canvas = host;
			this.ctx = this.canvas.getContext("2d");

			setTimeout(()=> {
				this.updateRects();
				this.init();
			}, 100);

			window.addEventListener('resize', this.updateRects.bind(this));
		}

		init(){
			for (var i = 0, u = 0; i < this.options.maxLines; i++, u += this.options.lineSpace) {
				this.options.variators[i] = u;
			};

			let render = ()=> {
				this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
				this.draw();
				if (!this._destroyed){
					requestAnimationFrame(render.bind(this));
				}
			}
			render();
		};

		updateRects(){
			this.canvasWidth = this.canvas.width = this.canvas.parentNode.getBoundingClientRect().width;
			this.canvasHeight = this.canvas.height = this.canvas.parentNode.getBoundingClientRect().height;

			this.options.amp = this.canvasHeight - this.options.heightOffset;
			this.options.startY = this.canvasHeight/2;
		};

		draw(){
			for (var i = 0; i <= this.options.maxLines; i++) {
				this.ctx.beginPath();
				this.ctx.moveTo(0, this.options.startY);
				for (var x = 0; x <= this.canvasWidth; x++) {
					var y = this.options.perlin.noise(x * this.options.variation + this.options.variators[i], x * this.options.variation, 0);
					this.ctx.lineTo(x, this.options.startY + this.options.amp * y);
				}
				var color = Math.floor(150 * Math.abs(y));
				var alpha = Math.min(Math.abs(y), .8) + .1;
				this.ctx.strokeStyle = "rgba(207,40,50," + alpha + ")";
				this.ctx.stroke();
				this.ctx.closePath();

				this.options.variators[i] += .002;
			};
		};
	};

	let canvasEl = document.getElementById('canvasWave');
	if (canvasEl) {
		const canvasWaveAnimation = new CanvasWaveAnimation(canvasEl);
		canvasWaveAnimation.init();
	};

});

