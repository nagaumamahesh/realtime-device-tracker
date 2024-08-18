const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
  socket.on('sendLocation', (data) => {
    console.log(data);
    io.emit('recieveLocation', {id : socket.id, ...data});
  });
  socket.on('disconnect', () => {
    console.log('Disconnected from the server');
    io.emit('userDisconnected', socket.id);
  });
  console.log('New WS Connection');
});

app.get('/', (req, res) => {
  res.render('index');
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
