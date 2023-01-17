let cHeight = [];
let cWidth = [];
let outerMargin = [];
let gap = [];
let seed = [];

summer = 
    [
       '#f46f40',
      '#fbb03c', 
      '#fccf8a', 
      '#202b58', 
      '#afd5db', 
      '#3896a6',
      '#4343ae', 
      '#db7f8e',
      '#ede4cb'
    ];

features = {};

function makeFeatures() {
  
  features.numCircles = floor(random(3, 7));
  features.maxDiameter = cHeight * 3;
  
  features.y0 = [];
  features.x0 = [];

  y0_init = random(outerMargin, cHeight - outerMargin);
  y0_buffer = floor(y0_init*.25);

  for(j = 0; j < features.numCircles; j++) {
    features.y0.push(
      floor(
        random(
          y0_init - y0_buffer, 
          y0_init + y0_buffer)));

    features.x0.push(floor(random([0, cWidth])));
  }
}


function gridSetUp(width, height) {
  cHeight = floor(min(width, height));
  cWidth = cHeight;
  outerMargin = floor(cHeight * 0.05);
  gap = 0;
  
}

function setup() {
  gridSetUp(windowWidth, windowHeight);
  seed = random(0, 1)*99999;
  //seed = 14314.538958258485;
  createCanvas(cWidth, cHeight);
  noLoop();
}

function draw() {
  console.log(seed);
  randomSeed(seed);
  background('#fbf9f4');
  makeFeatures();
  
  for(j = 0; j < features.numCircles; j++) {
    stroke(random(summer));
    strokeWeight(1.5);
    
    for(i = 0; i < features.maxDiameter; i+=5) {
    
    d = 0 + i;
    noFill();
    circle(features.x0[j], features.y0[j], d);
      
    }
  }
  
  
  
  
  
  
}

function distanceFormula(x1, y1, x2, y2) {
  d = sqrt(sq(x2 - x1) + sq(y2 - y1));
  return d;
}

function keyPressed() {
  if(key == "s") {
    saveCanvas("jan23_" + seed, "png");
  }
}