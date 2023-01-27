var app = require('express')();
var http = require('http').createServer(app);
var {Server} = require('socket.io');
const express = require('express');
app.use(express.json())
var io = new Server(http);

const ads = [
  {title: 'Hello, world (again)!'}
];

app.get('/list', (req, res) => {
  res.send(ads);
});

io.on('connect', (socket) => {
  io.emit('confirm');
  console.log(" user conected");

  socket.on('emittext', (msg) => {
    console.log({msg});

    io.emit('msgs', []);
  });

  socket.on('disconnect', () => {
    console.log("disconnect");
  });
});

http.listen(3000, function(){
  console.log('Servidor rodando em: http://localhost:3000');
});



