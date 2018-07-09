const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./user');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use('/user', userRouter);

app.listen(9093, function () {
  console.log('listening at port 9093 ...')
});
