let px = [],
  py = [];

let useCurves = false; // change to true for curves

let consoleIsOn = false;

function createConsole() {
  printToConsole("Click to add vertex. Press any key to switch between lines and curves.")
  consoleIsOn = true;
}

function drawMouseLines(thisColor = "black") {
  push();
  stroke(thisColor);
  strokeWeight(1);
  noFill();
  beginShape();
  if (px.length > 0) {
    let i = 0;
    if (useCurves) curveVertex(px[i], py[i]); // control point for curves
    for (i = 0; i < px.length; i++) {
      if (useCurves) curveVertex(px[i], py[i]);
      else vertex(px[i], py[i]);
    }
    if (useCurves) {
      curveVertex(mouseX, mouseY);
      curveVertex(mouseX, mouseY); // control point for curves
    } else vertex(mouseX, mouseY);
  }
  endShape();
  pop();
}

function mousePressed() {
  if (mouseIsOffCanvas() || mouseButton != LEFT) return;
  if (!consoleIsOn) return;

  px.push(int(mouseX));
  py.push(int(mouseY));

  updateConsole();
}

function keyPressed() {
  if (mouseIsOffCanvas()) return;
  if (!consoleIsOn) return;

  if (keyCode === BACKSPACE || keyCode === DELETE) {
      px.pop();
      py.pop();
  }

  else {

    useCurves = !useCurves; // change useCurves from true to false or false to true
  }
  updateConsole();
}

function mouseIsOffCanvas() {
  return mouseY > height;
}

function updateConsole() {
  document.getElementById("console").innerHTML = "";

  printToConsole("Now using " + (useCurves ? "curves." : "lines.") + "  Press any key to switch, or Delete/Backspace to erase last point.");

  if (px.length > 0) {
    let i = 0;
    if (useCurves) printToConsole("</br>When using curveVertex, the first and last points are control points that do not show in the output shape.");
    printToConsole("</br>function drawShape() {")
    printToConsole("beginShape();", "indent");
    if (useCurves) printToConsole("curveVertex(" + px[0] + ", " + py[0] + ");  // control point", "indent");

    for (i = 0; i < px.length; i++) {
      printToConsole((useCurves ? "curveVertex(" : "vertex(") + px[i] + ", " + py[i] + ");", "indent");
    }
    if (useCurves && i > 0) printToConsole("curveVertex(" + px[i - 1] + ", " + py[i - 1] + "); // control point", "indent");
    printToConsole("endShape();", "indent");
    printToConsole("}")
  }
}

function printToConsole(string, indented = false) {
  if (indented) document.getElementById("console").innerHTML += "&nbsp;&nbsp;";
  document.getElementById("console").innerHTML += string + "</br>";
}