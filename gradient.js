/*

Example gradient usage.  It is highly recommended not to continually redraw gradients.  Either put them in setup function or use noLoop();

function setup() {
	createCanvas(1000, 600);

	rectGradient(0, 0, width, 200, 'magenta', 'crimson'); // sky with sunset
	circleGradient(width / 2, 200, 150, 'orangeRed', 'yellow'); // sun
	rectGradient(0, 200, width, 400, 'green', 'black'); // foreground with shadows

	vertexGradient([15, 89, 193], [200, 87, 200], 76, 200, 'sienna', 'black'); //mountain
	curveVertexGradient([815, 815, 889, 993, 993], [200, 200, 87, 200, 200], 916, 200, 'sienna', 'black'); //hill

}

*/

// gets a color in between the startColor and endColor by scaling the values
function getColor(startColor, endColor, val, startVal, endVal) {
	if (typeof startColor === 'string') startColor = color(startColor);
	if (typeof endColor === 'string') endColor = color(endColor);

	let scaledValue = map(val, startVal, endVal, 0, 1);
	let thisColor = lerpColor(startColor, endColor, scaledValue);
	return thisColor;
}

// draws a rectangle with a horizontal gradient, going from startColor at top to endColor to bottom
// parameters:
//  x = x of upper left corner
//  y = y of upper left corner
//  w = width of rectangle
//  h = height of rectangle
//  topColor = color at top of rectangle
//  bottomColor = color at bottom of rectangle
function rectGradient(x, y, w, h, topColor, bottomColor) {
	push();
	strokeWeight(1);
	for (let thisY = int(y); thisY <= y + h; thisY += 0.5) {
		let thisColor = getColor(topColor, bottomColor, thisY, y, y + h);
		stroke(thisColor);
		line(x, thisY, x + w, thisY);
	}
	pop();
}



// draws a circle with a radial gradient, going from startColor at outside to endColor on inside
// parameters:
//   x = x of circle center
//   y = y of circle center
//   d = diameter of circle
//   outerColor = outside color of circle
//   innerColor = inside color of circle
//   innerD = diameter of inside circle (default is 0 so it goes to the center)
function circleGradient(x, y, d, outerColor, innerColor, innerD = 0) {
	push();
	noStroke();
	for (let thisD = int(d); thisD > innerD; thisD -= 0.5) {
		let thisColor = getColor(outerColor, innerColor, thisD, d, innerD);
		fill(thisColor);
		circle(x, y, thisD);
	}
	pop();
}



// draws a shape made of a list of vertices, going from startColor at outside to endColor at the centerX, centerY
// parameters:
//   x = array of x vertices in square brackets e.g. [1, 2, 3]
//   y = array of y vertices in square brackets e.g. [100, 200, 300]
//   centerX = x value of the center of the shape
//   centerY = y value of the center of the shape
//   startColor = outside color of shape
//   endColor = inside color of shape
function vertexGradient(x, y, centerX, centerY, startColor, endColor) {

	push();
	noStroke();
	for (let thisScale = 1; thisScale > 0; thisScale -= 0.01) {
		push();
		let thisColor = getColor(startColor, endColor, thisScale, 1, 0);
		fill(thisColor);

		translate(centerX, centerY);
		scale(thisScale);
		translate(-1 * centerX, -1 * centerY);
		beginShape();
		for (let i = 0; i < x.length; i++) {
			vertex(x[i], y[i]);
		}
		endShape(CLOSE);
		pop();
	}
	pop();
}

// draws a shape made of a list of curve vertices, going from startColor at outside to endColor at the centerX, centerY
// parameters:
//   x = array of x vertices in square brackets e.g. [1, 2, 3]
//   y = array of y vertices in square brackets e.g. [100, 200, 300]
//   centerX = x value of the center of the shape
//   centerY = y value of the center of the shape
//   startColor = outside color of shape
//   endColor = inside color of shape
function curveVertexGradient(x, y, centerX, centerY, startColor, endColor) {

	push();
	noStroke();

	for (let thisScale = 1; thisScale > 0; thisScale -= 0.01) {
		push();
		let thisColor = getColor(startColor, endColor, thisScale, 1, 0);
		fill(thisColor);

		translate(centerX, centerY);
		scale(thisScale);
		translate(-1 * centerX, -1 * centerY);
		beginShape();
		for (let i = 0; i < x.length; i++) {
			curveVertex(x[i], y[i]);
		}
		endShape();
		pop();
	}
	pop();
}


// /* Uncomment the following code if you want to use the vertexGradient or curveVertexGradient assistant */
// let xArray = [];
// let yArray = [];

// function mousePressed() {
// 	push();
// 	strokeWeight(5);
// 	point(mouseX, mouseY);
// 	xArray.push(int(mouseX));
// 	yArray.push(int(mouseY));
// 	printToConsole('x: [' + xArray.toString() + ']');
// 	printToConsole('y: [' + yArray.toString() + ']');
// 	pop();
// }