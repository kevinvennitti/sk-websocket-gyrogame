var express = require('express');
var app = express();
var path = require('path');
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3000);
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function (req, res) {
  res.render('index');
});

app.get('/admin', function (req, res) {
  res.render('admin');
});


io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });

  socket.on('deviceOrientation', function (data) {
    console.log('Le serveur a reçu l\'orientation du téléphone !');
    console.log('Données reçues :');
    console.log(data);

    console.log('On transmet ces données à toutes les pages connectées');
    io.sockets.emit('setDeviceOrientation', {
      deviceOrientation: data.deviceOrientation
    })
  });
});
