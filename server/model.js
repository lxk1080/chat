const mongoose = require('mongoose');

// 连接数据库
const DB_URL = 'mongodb://127.0.0.1:27017/chat';

mongoose.connect(DB_URL);

mongoose.connection.on('connected', function() {
  console.log('mongo connect success!')
});

// 建表
const models = {
  user: {
    username: {type: 'string', require: true},
    password: {type: 'string', require: true},
    type: {type: 'string', require: true},
    // 头像
    avatar: {type: 'string'},
    // 个人简介或职位介绍
    desc: {type: 'string'},
    // 职位名
    title: {type: 'string', require: true},
    // boss
    company: {type: 'string'},
    money: {type: 'string'},
  },
  chat: {

  }
};

for (let table in models) {
  mongoose.model(table, new mongoose.Schema(models[table]))
}

// 导出
module.exports = {
  getModel(name) {
    return mongoose.model(name);
  }
};
