// 93500.40283406523
// 97101.1391286894
// 66283.44284084982
// 1171.6529323647046
// 14314.538958258485
// 18540.40944359131
// 53346.8416928027


let cHeight = [];
let cWidth = [];
let outerMargin = [];
let gap = [];
let seed = [];
let x0 = [];
let y0 = [];

features = {};

function makeFeatures() {
  
  // create grid
  features.shapeSize = 5;
  features.nCol = (cHeight - (outerMargin*2))/features.shapeSize;
  features.nRow = (cWidth - (outerMargin*2))/features.shapeSize;
  
  // circle params
  features.numCircles = floor(random(7, 15));
  maxRadius = cHeight / 1.25;
  radiusIncr = floor(maxRadius / features.numCircles);
  
  features.hatchOrder = [];
  for(i = 0; i < features.numCircles; i++) {
    features.hatchOrder.push(random([1, 2, 3, 4, 5, 6]));
  }
  
  features.incrVec = [];
  for(i = 0; i < features.numCircles; i++) {
    if(i == 0) {
      features.incrVec[i] = 0;
    } else {
      features.incrVec[i] = radiusIncr + features.incrVec[i-1];
    }
  }
  
  
}


function gridSetUp(width, height) {
  cHeight = floor(min(width, height));
  cWidth = cHeight;
  outerMargin = floor(cHeight * 0.05);
  gap = 0;
  x0 = (cWidth - outerMargin)/2;
  y0 = (cHeight - outerMargin)/2;
  
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
  
   for(j = 0; j < features.nRow; j++) {
     
     for(i = 0; i < features.nCol; i++) {
       y = outerMargin + j*(features.shapeSize);
       x = outerMargin + i*(features.shapeSize);
       
       
       
       selHatchType = selectHatchMark(x, y, 
                                      x0, y0, 
                                      features.incrVec);
       hatchType = features.hatchOrder[selHatchType];
       
       strokeWeight(1);
       strokeCap(ROUND);
       stroke("#333333");
       hatchMarks(x, y, features.shapeSize, hatchType);
     }
  }
}

function distanceFormula(x1, y1, x2, y2) {
  d = sqrt(sq(x2 - x1) + sq(y2 - y1));
  return d;
}

function selectHatchMark(x1, y1, x0, y0, incrVec) {
  d = distanceFormula(x0, y0, x1, y1);
  hatchOpt = [];
  
  if(d < incrVec[0]){
    hatchOpt = 0;
  } else if(d >= incrVec[0] & d < incrVec[1]) {
    hatchOpt = 1;
  } else if(d >= incrVec[1] & d < incrVec[2]) {
    hatchOpt = 2;
  } else if(d >= incrVec[2] & d < incrVec[3]) {
    hatchOpt = 3;
  } else if(d >= incrVec[3] & d < incrVec[4]) {
    hatchOpt = 4;
  } else if(d >= incrVec[4] & d < incrVec[5]) {
    hatchOpt = 5;
  } else if(d >= incrVec[5] & d < incrVec[6]) {
    hatchOpt = 6;
  } else if(d >= incrVec[6] & d < incrVec[7]) {
    hatchOpt = 7;
  } else if(d >= incrVec[7] & d < incrVec[8]) {
    hatchOpt = 8;
  } else if(d >= incrVec[8] & d < incrVec[9]) {
    hatchOpt = 9;
  } else if(d >= incrVec[9] & d < incrVec[10]) {
    hatchOpt = 10;
  } else if(d >= incrVec[10] & d < incrVec[11]) {
    hatchOpt = 11;
  } else if(d >= incrVec[11] & d < incrVec[12]) {
    hatchOpt = 12;
  } else if(d >= incrVec[12] & d < incrVec[13]) {
    hatchOpt = 13;
  } else if(d >= incrVec[13] & d < incrVec[14]) {
    hatchOpt = 14;
  } else if(d >= incrVec[14] & d < incrVec[15]) {
    hatchOpt = 15;
  } else if(d >= incrVec[15] & d < incrVec[16]) {
    hatchOpt = 16;
  }
  
  return hatchOpt;
  
}

function hatchMarks(x, y, width, type){
  midpoint = width/2;
  if(type == 1) {
    //vertical line left
    line(x, y, x, y + width);
  } else if(type == 2) {
    //vertical line right
    line(x + width, y, x + width, y + width);
  } else if(type == 3) {
    // horizontal line top
    line(x, y, x + width, y);
  } else if(type == 4) {
    // horizontal line top
    line(x, y + width, x + width, y + width);
  } else if(type == 5) {
    // diagnol 1
    line(x, y + width, x + width, y);
  }  else if(type == 6) {
    // diagnol 1
    line(x, y, x + width, y + width);
  }
}

function keyPressed() {
  if(key == "s") {
    saveCanvas("jan04_" + seed, "png");
  }
}