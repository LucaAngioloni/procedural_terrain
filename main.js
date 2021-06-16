var cols, rows;
var scl = 20;
const w = window.innerWidth;
const h = window.innerHeight - 50;

const w_key = 87;
const a_key = 65;
const s_key = 83;
const d_key = 68;

const shift_key = 16;

var flying_x = 0;
var flying_y = 0;

var terrain = [];

let myFont;
function preload() {
  myFont = loadFont("FiraSans-Regular.otf");
}

function setup() {
  createCanvas(w, h, WEBGL);

  cols = (w / scl) * 1.4;
  rows = h / scl;

  for (var x = 0; x < cols; x++) {
    terrain[x] = [];
    for (var y = 0; y < rows; y++) {
      terrain[x][y] = 0; //specify a default value for now
    }
  }
}

function draw() {
  // Keys
  var speed = 0.1;
  if (keyIsDown(shift_key)) {
    speed = 0.3;
  }

  if (keyIsDown(a_key)) {
    flying_x -= speed;
  }

  if (keyIsDown(d_key)) {
    flying_x += speed;
  }

  if (keyIsDown(w_key)) {
    flying_y -= speed;
  }

  if (keyIsDown(s_key)) {
    flying_y += speed;
  }

  // flying -= 0.1;
  var yoff = flying_y;
  for (var y = 0; y < rows; y++) {
    var xoff = flying_x;
    for (var x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -120, 120);
      xoff += 0.15;
    }
    yoff += 0.15;
  }

  background(50);
  translate(0, 50);
  rotateX(PI / 3);
  fill(220, 220, 220, 40);
  stroke(230);
  translate(-(cols * scl) / 2, -h / 2);
  for (var y = 0; y < rows - 1; y++) {
    beginShape(TRIANGLE_STRIP);
    for (var x = 0; x < cols; x++) {
      vertex(x * scl, y * scl, terrain[x][y]);
      vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
    }
    endShape();
  }

  rotateX(-PI / 3);
  translate(0, -h / 2);
  fill(255);
  stroke(0);
  textFont(myFont);
  textSize(40);
  //Print instructions
  text("Use W,A,S,D to move,", w - 200, 40);
  text("shift to move faster.", w - 200, 90);

  // Print FPS
  let fps = frameRate();
  text("FPS: " + fps.toFixed(2), 20, 40);
}
