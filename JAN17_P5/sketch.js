// seeds i like
// 9505.628853728513
// 36034.5753323484
// 24586.995506466454
// 82923.5191729292
// 9964.44311202609
// 73125.78686044681

soft = 
    [
      "#577590", 
      "#606c38", 
      "#719f9f", 
      //"#c18c5d",
      "#ce796b",
      "#f6aa1c",
      "#ddcbbf",
      "#f0e4d6"
    ];

features = {};

function makeFeatures() {
  features.fill = random(soft);
  features.grid = 3;
  features.nCol = features.grid;
  features.nRow = features.grid;
  features.rectWidth = 
    floor(((cWidth - outerMargin*2)/features.nCol)-gap);
  
  // coordinates for subdivision
  features.yVec = [];
  features.xVec = [];
  features.subdivide = [];
  features.rectWidthVec = [];
  rectWidth = features.rectWidth;
  
   for(j = 0; j < features.nRow; j++) {
     for(i = 0; i < features.nCol; i++) {
       y = outerMargin + j*(rectWidth + gap);
       x = outerMargin + i*(rectWidth + gap);
       subdivideSwitch = [];
       
       if(random(0, 1) < 0.75){
         subdivideSwitch = 0;
         features.subdivide.push(0);
       } else {
         subdivideSwitch = 1;
         features.subdivide.push(1);
       }
       
       if(subdivideSwitch == 0) {    
         features.yVec.push(y);
         features.xVec.push(x);
         features.rectWidthVec.push(rectWidth);
       } else if(subdivideSwitch == 1) {
         features.yVec.push(y);
         features.yVec.push(y+(rectWidth/2));
         features.yVec.push(y+(rectWidth/2));
         features.yVec.push(y);
         
         features.xVec.push(x);
         features.xVec.push(x);
         features.xVec.push(x+(rectWidth/2));
         features.xVec.push(x+(rectWidth/2));
         
         features.rectWidthVec.push(rectWidth/2);
         features.rectWidthVec.push(rectWidth/2);
         features.rectWidthVec.push(rectWidth/2);
         features.rectWidthVec.push(rectWidth/2);
       }
     }
   }
  
  // creating pattern of orientation
  orientationOpts = [0, 1, 2, 3, 4];
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
    features.orientation.push(orientationPattern[4]);
  }  
}

let cHeight = [];
let cWidth = [];
let outerMargin = [];
let gap = [];
let seed = [];



function gridSetUp(width, height) {
  cHeight = floor(min(width, height));
  cWidth = cHeight;
  outerMargin = floor(cHeight * 0.05);
  gap = 0;
  
}
  

function setup() {
  gridSetUp(windowWidth, windowHeight);
  seed = random(0, 1)*99999;
  createCanvas(cWidth, cHeight);
  noLoop();
}

function draw() {
  background('#fbf9f4');
  randomSeed(seed);
  makeFeatures();
  console.log(features.yVec);
  console.log(features.xVec);
  console.log(features.subdivide);
  console.log(features.orientation);
  console.log(seed);
  
 for(j = 0; j < features.yVec.length; j++) {
   noStroke();
   //fill("black");
   fill(features.fill);
   createQuarterCircle(features.xVec[j], 
                       features.yVec[j], 
                       features.rectWidthVec[j],
                       features.orientation[j]);
 }
}

function createQuarterCircle(x, y, rectWidth, type) {
  if(type == 0) { 
    
  } else if(type == 1){
    arc(x, 
        y  + rectWidth, 
        rectWidth * 2, 
        rectWidth * 2, 
        3*PI/2, 2*PI,
        PIE);   
    } else if(type == 2) {
      arc(x + rectWidth, 
          y  + rectWidth, 
          rectWidth * 2, 
          rectWidth * 2, 
          PI, 3*PI/2,
          PIE);
    } else if(type == 3) {
      arc(x + rectWidth, 
                y, 
                rectWidth * 2, 
                rectWidth * 2, 
                PI/2, PI,
               PIE);
      
    } else if(type == 4) {
      arc(x, 
          y, 
          rectWidth * 2, 
          rectWidth * 2, 
          0, PI/2,
          PIE);
    }
  }


