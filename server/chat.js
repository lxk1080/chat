const express = require('express');
const Router = express.Router();
const model = require('./model');
const Chat = model.getModel('chat');

Router.get('/getMsgList', function(req, res) {
  const user = req.cookies.userId;

  Chat.find({'$or': [{from: user}, {to: user}]}, function(err, data) {
    if (!err) {
      return res.json({
        code: 0,
        data,
      })
    }
  })
});

module.exports = Router;
