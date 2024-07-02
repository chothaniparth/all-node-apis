const express = require('express');
const bodyParser = require('body-parser');
const { connectToDatabase } = require('./ConnectSQL');
const router = require('./router/router');
const cors = require('cors');
const http = require('http');
const socketIO = require('socket.io');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/', router);

app.use('/', express.static('./public/ProfileImage'));

const startServer = async () => {
  try {
    await connectToDatabase();
    console.log('Connected to the database successfully');

    const server = http.createServer(app);
    const io = socketIO(server);

    io.on('connection', (socket) => {
      console.log('A user connected');
      console.log('socket :', socket.msg);
      socket.on('disconnect', () => {
        console.log('A user disconnected');
      });

      socket.on('message', (msg) => {
        console.log('Message received:', msg);
        io.emit('message', msg); // Broadcast the message to all connected clients
      });
    });

    server.listen(9000, () => console.log('Server running at http://localhost:9000'));
  } catch (error) {
    console.error('Error connecting to SQL Server:', error);
  }
};

startServer();
