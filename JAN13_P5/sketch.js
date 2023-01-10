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
  features.nRow = 7;
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
  d = random(summer);
  
  while(a == b) { 
    b = random(summer);
  } while(b == c) {
    c = random(summer);
  } while(c == d) {
    d = random(summer);
  }
  
  features.palette = [a, b, c, d];
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
  gap = 5;
  
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
  
  circleColor = random(features.palette);
  rectColor = random(features.palette);
  
  while(circleColor == rectColor) {
       circleColor = random(features.palette);
     }
  
   for(j = 0; j < features.yVec.length; j++) {
     
     // choose side
     side = random(["left", "right"]);
     
     // choose break points
     buffer = floor(features.rectWidth*0.10);
     breakStart = map(j, 
                      0, features.yVec.length, 
                      features.xVec[j] + buffer, 
                      features.xVec[j] + features.rectWidth - buffer);
     
     breakpoint = breakStart;
     
      if(side == "left") {
        x1 = breakpoint;
        x2 = features.xVec[j];
        y1 = features.yVec[j] + features.rectHeight/2;
        y2 = features.yVec[j] + features.rectHeight/2;
      } else if(side == "right") {
        x1 = breakpoint;
        x2 = features.xVec[j] + features.rectWidth;
        y1 = features.yVec[j] + features.rectHeight/2;
        y2 = features.yVec[j] + features.rectHeight/2;
      }
    
     // set up colors
     noStroke();
     fill(rectColor);
     rect(features.xVec[j],
         features.yVec[j],
         features.rectWidth,
         features.rectHeight);
     
     let gradient =
         drawingContext.createLinearGradient(x1, y1, x2, y2);
     
     gradient.addColorStop(0, circleColor);
     gradient.addColorStop(1, rectColor);

     drawingContext.fillStyle = gradient;
     
     if(side == "left") {
       beginShape();
       numPoints = 20;
       for(i = 0; i <= numPoints; i++) {
         tau = map(i, 0, 10, 0, PI/2);
         x = breakpoint + sin(tau) * features.rectHeight/2;
         y = (features.yVec[j] + (features.rectHeight/2)) + cos(tau) * features.rectHeight/2;
         vertex(x, y);
       }
       vertex(breakpoint, features.yVec[j]);
       vertex(features.xVec[j], features.yVec[j]);
       vertex(features.xVec[j], 
              features.yVec[j] + features.rectHeight);
       vertex(breakpoint, 
              features.yVec[j] + features.rectHeight);
       endShape();
       
     } else if(side == "right") {
       beginShape();
       numPoints = 20;
       for(i = 0; i <= numPoints; i++) {
         tau = map(i, 0, 10, PI, 3*PI/2);
         x = breakpoint + sin(tau) * features.rectHeight/2;
         y = (features.yVec[j] + (features.rectHeight/2)) + cos(tau) * features.rectHeight/2;
         vertex(x, y);
       }
       vertex(breakpoint, features.yVec[j] + features.rectHeight);
       vertex(features.xVec[j] + features.rectWidth,
              features.yVec[j] + features.rectHeight);
       vertex(features.xVec[j] + features.rectWidth, 
              features.yVec[j]);
       vertex(breakpoint, 
              features.yVec[j]);
       endShape();
     }
     
     // update colors
     rectColor = circleColor;
     circleColor = random(features.palette);
     
     while(circleColor == rectColor) {
       circleColor = random(features.palette);
     }
     
   }
  
}


function keyPressed() {
  if(key == "s") {
    saveCanvas("jan13_" + seed, "png");
  }
}