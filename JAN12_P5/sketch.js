// seeds 44482.6000213032
// 49000.31951926536
// 72282.15924929288
// 52448.377071872674
// 68534.18087373162
// 47570.548020315895
// 27318.883017558775
// 76334.97312127892


let cHeight = [];
let cWidth = [];
let outerMargin = [];
let gap = [];
let seed = [];
let soft = [
  "#283b5d", 
  "#497570", 
  "#a3b18a", 
  "#bc6c25", 
  "#e76f51",
  "#ddcbbf",
  "#f0e4d6",
  "#333333"
  ]

features = {};

function makeFeatures() {
  
  // setting up grid
  features.grid = 15;
  features.nCol = features.grid;
  features.nRow = features.grid;
  features.shapeSize = 
    floor(((cWidth - outerMargin*2)/features.nCol)-gap);
  
  features.yVec = [];
  features.xVec = [];
  
  for(j = 0; j < features.nRow; j++) {
    y = outerMargin + j*(features.shapeSize);
     for(i = 0; i < features.nCol; i++) {
       x = outerMargin + i*(features.shapeSize);
       features.yVec.push(y);
       features.xVec.push(x);
     }
  }
  
  // set up pattern
  orientationOpts = [1, 2, 3, 4];
  orientationPattern = [];
  for(k = 0; k < orientationOpts.length; k++){
    orientationPattern[k] = random(orientationOpts);
  }
  
  features.orientation = [];
  while(features.orientation.length < features.yVec.length){
    features.orientation.push(orientationPattern[0]);
    features.orientation.push(orientationPattern[1]);
    features.orientation.push(orientationPattern[2]);
    features.orientation.push(orientationPattern[3]);
  }  
  
  // color palette
  blockColIndex = floor(random(soft.length));
  squareColIndex = floor(random(soft.length));
  
  while(squareColIndex == blockColIndex){
    squareColIndex = floor(random(soft.length));
  }
  
  features.blockColor = soft[blockColIndex];
  features.squareColor = soft[squareColIndex];
  
}


function gridSetUp(width, height) {
  cHeight = floor(min(width, height));
  cWidth = cHeight;
  outerMargin = floor(cHeight * 0.05);
  gap = 0;
  
}

function setup() {
  gridSetUp(windowWidth, windowHeight);
  //seed = random(0, 1)*99999;
  seed = 44482.6000213032;
  createCanvas(cWidth, cHeight);
  noLoop();
}

function draw() {
  console.log(seed);
  randomSeed(seed);
  background('#fbf9f4');
  makeFeatures();
  
  for(j = 0; j < features.yVec.length; j++) {

    stroke('#fbf9f4');
    fill(features.blockColor);
    tesselationShape(features.xVec[j], 
                     features.yVec[j],  
                     features.shapeSize,
                     features.orientation[j]);
    
    stroke('#fbf9f4');
    fill(features.squareColor);
    squareShape(features.xVec[j], 
                features.yVec[j], 
                features.shapeSize,
                features.orientation[j]);
 }
}

function squareShape(x, y, shapeWidth, type) {
  incr = shapeWidth/3;
  
  if(type == 1) {
    beginShape();
    vertex(x + 2*incr, y);
    vertex(x + 2*incr, y + 1*incr);
    vertex(x + 3*incr, y + 1*incr);
    vertex(x + 3*incr, y);
    vertex(x + 2*incr, y);
    endShape();
    
  } else if(type == 2) {
    beginShape();
    vertex(x + 2*incr, y + 2*incr);
    vertex(x + 2*incr, y + 3*incr);
    vertex(x + 3*incr, y + 3*incr);
    vertex(x + 3*incr, y + 2*incr);
    vertex(x + 2*incr, y+ 2*incr);
    endShape();
    
  } else if(type == 3) {
    beginShape();
    vertex(x, y);
    vertex(x, y + 1*incr);
    vertex(x + 1*incr, y + 1*incr);
    vertex(x + 1*incr, y);
    vertex(x, y);
    endShape();
    
  } else if(type == 4) {
    beginShape();
    vertex(x, y + 2*incr);
    vertex(x, y + 3*incr);
    vertex(x + 1*incr, y + 3*incr);
    vertex(x + 1*incr, y + 2*incr);
    vertex(x, y + 2*incr);
    endShape();
    
  }
}

function tesselationShape(x, y, shapeWidth, type) {
  
  incr = shapeWidth/3;
  
  if(type == 1) {
    beginShape();
    vertex(x, y);
    vertex(x, y + 3*incr);
    vertex(x + 3*incr, y + 3*incr);
    vertex(x + 3*incr, y + 2*incr);
    vertex(x + incr, y + 2*incr);
    vertex(x + incr, y);
    vertex(x, y);
    endShape();
    
  } else if(type == 2) {
    beginShape();
    vertex(x, y);
    vertex(x, y + 3*incr);
    vertex(x + incr, y + 3*incr);
    vertex(x + incr, y + incr);
    vertex(x + 3*incr, y + incr);
    vertex(x + 3*incr, y);
    vertex(x, y);
    endShape();
    
  } else if(type == 3) {
    beginShape();
    vertex(x, y + 2*incr);
    vertex(x, y + 3*incr);
    vertex(x + 3*incr, y + 3*incr);
    vertex(x + 3*incr, y);
    vertex(x + 2*incr, y);
    vertex(x + 2*incr, y + 2*incr);
    vertex(x, y + 2*incr);
    endShape();
    
  } else if(type == 4) {
    beginShape();
    vertex(x, y);
    vertex(x, y + incr);
    vertex(x + 2*incr, y + incr);
    vertex(x + 2*incr, y + 3*incr);
    vertex(x + 3*incr, y + 3*incr);
    vertex(x + 3*incr, y);
    vertex(x, y);
    endShape();
  }
}

function keyPressed() {
  if(key == "s") {
    saveCanvas("jan12_" + seed, "png");
  }
}