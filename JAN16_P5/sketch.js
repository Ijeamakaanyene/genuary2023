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
  features.nRow = 25;
  features.rectWidth = floor(cWidth - outerMargin*2);
  features.rectHeight = floor(((cHeight-outerMargin*2)/features.nRow)-gap);
  
  features.yVec = [];
  features.xVec = [];
  
   for(j = 0; j < features.nRow; j++) {
     y = outerMargin + j*(features.rectHeight + gap);
     x = outerMargin;
     
     features.yVec.push(y);
     features.xVec.push(x);
   }

  a = random(summer);
  b = random(summer);
  c = random(summer);
  
  while(a == b) { 
    b = random(summer);
  } while(b == c) {
    c = random(summer);
  }
  
  features.palette = [a, b, a];
}

let cHeight = [];
let cWidth = [];
let outerMargin = [];
let gap = [];
let seed = [];

function gridSetUp(width, height) {
  cHeight = floor(min(width, height));
  cWidth = (5/7)*cHeight;
  outerMargin = floor(cHeight * 0.05);
  gap = 2;
  
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
  console.log(seed);
  makeFeatures();
  
  colorA = hexToRgb(features.palette[0]);
  colorB = hexToRgb(features.palette[1]);
  colorC = hexToRgb(features.palette[2]);
  
  //sqIncr = random([2, 4, 6, 8]);
  sqIncr = 2;
  
   for(j = 0; j < features.yVec.length; j++) {
     
     numSq = (j*sqIncr) + 3;
     middleSq = ceil(numSq/2);
     initSqWidth = features.rectWidth/numSq;
     
     for(i = 0; i < numSq; i++) {
       colorMode(RGB);
       xNew = features.xVec[j] + i*initSqWidth;
       lerpA = color(colorA[0], 
                      colorA[1], 
                      colorA[2]);
       lerpB = color(colorB[0], 
                    colorB[1], 
                    colorB[2]);
       lerpC = color(colorC[0], 
                    colorC[1], 
                    colorC[2]);
       
       if(i < middleSq) { 
         
         lerpFrac = 1/middleSq;
         
         sqColor = lerpColor(lerpA, 
                           lerpB, 
                           lerpFrac*i);
       } else {
         lerpFrac = 1/middleSq;
         
         sqColor = lerpColor(lerpB, 
                             lerpC, 
                             lerpFrac*(i-middleSq));
       }
       
       
       sqWidth = initSqWidth;
    
       stroke(sqColor);
       fill(sqColor);
       rect(xNew,
            features.yVec[j],
            sqWidth,
            features.rectHeight);
       
     }
     
   }
  
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16)
  ] : null;
}


function keyPressed() {
  if(key == "s") {
    saveCanvas("jan16_" + seed, "png");
  }
}