const express = require('express'); //express모듈 불러움
const app = express(); //express를 실행하여 app변수에 담음
const http = require('http');
const server = http.createServer(app); //express가 http를 통해 실행되게 함
const path = require('path');

const socketIO = require('socket.io');
const io = socketIO(server); //socket.io에 server를 담음

app.use(express.static(path.join(__dirname, 'src'))); //__dirname : 프로젝트 디렉토리

const PORT = process.env.PORT || 3000;

io.on('connection', (socket) => {
  socket.on('chatting', (data) => {
    io.emit('chatting', data);
  });
});

server.listen(PORT, () => console.log(`server is running ${PORT}`));
