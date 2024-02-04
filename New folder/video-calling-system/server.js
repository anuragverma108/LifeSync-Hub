const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const connectedUsers = {};

// ...
io.on('connection', (socket) => {
    socket.on('join', (userId) => {
      connectedUsers[userId] = socket.id;
      io.emit('user-connected', userId); // Broadcast to all users
    });
  
    socket.on('offer', (data) => {
      io.to(connectedUsers[data.target]).emit('offer', {
        target: data.target,
        caller: data.caller,
        offer: data.offer,
      });
    });
  
    socket.on('answer', (data) => {
      io.to(connectedUsers[data.target]).emit('answer', {
        target: data.target,
        caller: data.caller,
        answer: data.answer,
      });
    });
  
    socket.on('ice-candidate', (data) => {
      io.to(connectedUsers[data.target]).emit('ice-candidate', {
        target: data.target,
        candidate: data.candidate,
      });
    });
  
    socket.on('disconnect', () => {
      const userId = getKeyByValue(connectedUsers, socket.id);
      if (userId) {
        delete connectedUsers[userId];
        io.emit('user-disconnected', userId); // Broadcast to all users
      }
    });
  });
  // ...
  

function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
