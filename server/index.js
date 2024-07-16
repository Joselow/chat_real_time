import express from 'express'
import logger from 'morgan'
import path from 'node:path';
import { createServer } from 'node:http';
import { Server } from 'socket.io';

const port = process.env.PORT ?? 3000


const app = express();
const server = createServer(app)

const io = new Server(server)

io.on('connection', (socket) => {
  console.log('the user has connection');

  socket.on('disconnect', () => {
    console.log('the user has disconnected');
  })

  socket.on('chat-message', (msg) => {
    console.log('the user has sent', msg);

    io.emit('chat-message', msg)
  })
})

app.use(logger('dev'))
app.use(express.static(path.join(process.cwd(), 'client')));

app.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'client', 'index.html'));
})

server.listen(port, () => {
  console.log('server running on port http://localhost:'+port);
})

