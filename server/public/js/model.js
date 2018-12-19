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
    username: {type: String, require: true},
    password: {type: String, require: true},
    type: {type: String, require: true},
    // 头像
    avatar: {type: String},
    // 个人简介或职位介绍
    desc: {type: String},
    // 职位名
    title: {type: String, require: true},
    // boss
    company: {type: String},
    money: {type: String},
  },
  chat: {
    chatid: {type: String, require: true},
    from: {type: String, require: true},
    to: {type: String, require: true},
    content: {type: String, require: true, default: ''},
    read: {type: Boolean, default: false},
    create_time: {type: Number, default: new Date().getTime()},
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
