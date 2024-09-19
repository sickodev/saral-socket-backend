const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

app.use(express.static('public'));

let messages = [];

io.on('connection', (socket) => {
  console.log('a new client connected');

  // Send existing messages to the new client
  socket.emit('messages', messages);

  // Handle new message
  socket.on('send_message', (messageData) => {
    messages.push(messageData);
    io.emit('receive_message', messageData);
  });

  socket.on('disconnect', () => {
    console.log('a client disconnected');
  });
});

server.listen(8080, () => {
  console.log('listening on *:8080');
});