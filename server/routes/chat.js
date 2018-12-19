const express = require('express');
const Router = express.Router();
const model = require('../public/js/model');
const chat = model.getModel('chat');

Router.get('/clear', function(req, res) {
  chat.remove({}, function() {});
  res.end('clear success!');
});

Router.get('/list', function(req, res) {
  chat.find({}, function(err, data) {
    if (!err) {
      return res.json({
        code: 0,
        data,
      })
    }
  })
});

Router.get('/getMsgList', function(req, res) {
  const user = req.cookies.userId;

  chat.find({'$or': [{from: user}, {to: user}]}, function(err, data) {
    if (!err) {
      return res.json({
        code: 0,
        data,
      })
    }
  })
});

Router.post('/readmsg', function(req, res) {
  const { userId } = req.cookies;
  const { otherSideId } = req.body;

  chat.update({ from: otherSideId, to: userId }, {'$set': { read: true }}, { multi: true }, function(err, data) {
    // 打印出来的 data 为 { n: 1, nModified: 1, ok: 1 }
    // n: 找到的总的数据量
    // nModified: 修改的数据量
    // ok: 状态 1 表示修改成功
    if (!err) {
      return res.json({ code: 0, data: { num: data.nModified }});
    }
    return res.json({ code: 1, msg: '数据更新错误' });
  })
});

module.exports = Router;
