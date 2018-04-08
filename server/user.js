const express = require('express');
const userRouter = express.Router();

userRouter.get('/info', function (req, res) {
  res.json({code: 1})
});

module.exports = userRouter;
