const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRouter = require('./user');
const fileRouter = require('./file');
const chatRouter = require('./chat');

const model = require('./model');
const Chat = model.getModel('chat');

const app = express();

const server = require('http').Server(app);

const io = require('socket.io')(server);

io.on('connection', function(socket) {
  socket.on('send', function(data) {
    const { from, to, content } = data;

    const chatid = [from, to].sort().join('_'); // 每一个聊天室有一个唯一的id标识
    const create_time = new Date().getTime();

    Chat.create({ chatid, from, to, content, create_time }, function (err, data) {
      if (!err) {
        io.emit('reply', data);
      }
    })
  })
});

// 处理传递过来的payload类型的数据
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/user', userRouter);
app.use('/file', fileRouter);
app.use('/chat', chatRouter);

server.listen(9093, function () {
  console.log('listening at port 9093 ...')
});
