const express = require('express');

const userRouter = express.Router();

userRouter.get('/info', function (req, res) {
  res.json({code: 1})
});

userRouter.post('/register', function (req, res) {
  if (req.body.user === 'lxk') {
    res.json({code: 0})
  } else {
    res.json({code: 1, msg: '用户名已注册！'})
  }
});

module.exports = userRouter;
