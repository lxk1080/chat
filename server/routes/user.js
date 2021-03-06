const express = require('express');
const utils = require('../public/js/utils');
const model = require('../public/js/model');
const Router = express.Router();

const user = model.getModel('user');
const _filter = {password: 0, __v: 0};

function argsFilter(doc) {
  const newDoc = {};

  for (const [key, value] of Object.entries(doc)) {
    if (!Object.keys(_filter).includes(key)) {
      newDoc[key] = value;
    }
  }

  return newDoc;
}

// 清理数据库
Router.get('/clear', function(req, res) {
  user.remove({username: req.query.username}, function() {});
  res.end('clear success!');
});

Router.get('/list', function(req, res) {
  const { type } = req.query;

  user.find({type}, function(err, data) {
    return res.json({
      code: 0,
      data,
    });
  })
});

Router.get('/check', function(req, res) {
  const { userId } = req.cookies;
  if (!userId) {
    return res.json({code: 1}); // 到login页面
  }
  user.findOne({_id: userId}, _filter, function(err, data) {
    if (!data) {
      return res.json({code: 2, msg: '服务器错误，请重新登录！'});
    }
    return res.json({code: 0, data}); // 已登录，返回用户信息
  })
});

Router.post('/login', function (req, res) {
  const {username, password} = req.body;
  // 第二个参数表示查询结果去除的字段
  user.findOne({username, password: utils.pwdMD5(password)}, _filter, function(err, data) {
    if (!data) {
      return res.json({code: 1, msg: '用户名或密码错误！'});
    }
    // 客户端和服务器交流的一个标记
    // 当然，这个标记是完全可以被窃取的
    res.cookie('userId', data._id);
    return res.json({code: 0, data});
  })
});


Router.post('/register', function (req, res) {
  const {username, password, type} = req.body;

  user.findOne({username}, function(err, data) {
    if (data) {
      return res.json({code: 1, msg: '用户名已存在！'});
    }
    user.create({username, password: utils.pwdMD5(password), type}, function(err, data) {
      if (err) {
        return res.json({code: 1, msg: '服务器错误！'});
      }

      res.cookie('userId', data._id);

      // 注意这里 data 和 data._doc 打印出来的值是一样的，都是一个对象。
      // 根据测试推测：data 是一个类，之所以打印出来的值和 data._doc 相同，
      // 是因为调用了 getter 方法，返回了 _doc 的值，_doc 才是真正的对象。
      // 所以，遍历对象，要使用 data._doc 这个值
      // console.log(111, data);
      // console.log(222, data._doc);

      return res.json({code: 0, data: argsFilter(data._doc)});
    })
  })
});

Router.post('/update', function (req, res) {
  const { userId } = req.cookies;
  const body = req.body;

  if (!userId) {
    return res.json({code: 1}); // 到login页面
  }

  // 通过id找到这条数据后修改
  user.findByIdAndUpdate(userId, body, function(err, data) {
    const result = Object.assign({}, argsFilter(data._doc), body);

    return res.json({
      data: result,
      code: 0,
    })
  })
});

module.exports = Router;
