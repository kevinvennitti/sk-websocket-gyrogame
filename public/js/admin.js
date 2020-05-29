let score = 0;

window.onload = function(){

  function handleOrientation(event) {
    let deviceOrientation = {
      x: 0,
      y: 0,
      z: 0
    };

    deviceOrientation.x = parseInt(event.beta); // Entre [-180,180]
    deviceOrientation.y = parseInt(event.gamma); // Entre [-90,90]
    deviceOrientation.z = parseInt(event.alpha); // Entre [0,360]

    socket.emit('deviceOrientation', {
      deviceOrientation: deviceOrientation
    });
  }

  window.addEventListener('deviceorientation', handleOrientation);  
}

socket.on('hasWin', function(){
  navigator.vibrate(50);
  
  score++;
  
  $('#score').text(score);
});