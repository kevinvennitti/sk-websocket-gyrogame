socket.on('setDeviceOrientation', function (data) {
  console.log('Nouvelle orientation à mettre à jour !');
  console.log('Données reçues :');
  console.log(data);

  deviceOrientation = data.deviceOrientation;
});



let easing = 0.1;

let deviceOrientation = {
  x:0,
  y:0,
  z:0
};

let dotPosition = {
  x:0,
  y:0,
  z:0
};

let targetDotPosition = {
  x:0,
  y:0,
  z:0
};

let _targetDotPosition = {
  x:0,
  y:0,
  z:0
};



function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  newTargetDot();
}

function newTargetDot() {
  _targetDotPosition = {
    x: random(0,45),
    y: random(-35,35),
    z: random(0,360)
  };
}

function draw() {
  background(20);

  dotPosition.x += (deviceOrientation.x - dotPosition.x) * easing;
  dotPosition.y += (deviceOrientation.y - dotPosition.y) * easing;
  dotPosition.z += (deviceOrientation.z - dotPosition.z) * easing;

  targetDotPosition.x += (_targetDotPosition.x - targetDotPosition.x) * easing;
  targetDotPosition.y += (_targetDotPosition.y - targetDotPosition.y) * easing;
  targetDotPosition.z += (_targetDotPosition.z - targetDotPosition.z) * easing;



  noFill();
  stroke(200);
  strokeWeight(2);

  push();
  getTranslate(targetDotPosition);
  ellipse(-25,-25, 50, 50);
  pop();





  fill(255);
  noStroke();

  push();
  getTranslate(dotPosition);
  ellipse(-25,-25, 50, 50);
  pop();





  if (abs(round(dotPosition.x) - round(_targetDotPosition.x)) < 3
   && abs(round(dotPosition.y) - round(_targetDotPosition.y)) < 3) {
    newTargetDot();
  }

}

function showDot(pos) {
  push();
  getTranslate(pos);

  ellipse(-25,-25, 50, 50);
  pop();
}

function getTranslate(pos) {
  translate(width/2+map(pos.y,-35,35,-width/3,width/3), height/2+map(pos.x,0,45,-height/4,height/4));
}
