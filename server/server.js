const express = require('express');
const mongoose = require('mongoose');

// 连接数据库
const DB_URL = 'mongodb://127.0.0.1:27017/chat';
mongoose.connect(DB_URL);
mongoose.connection.on('connected', function() {
   console.log('mongo connect success!')
});

// 创建一个表
const User = mongoose.model('user', new mongoose.Schema({
    name: {type: String, require: true},
    age: {type: Number, require: true}
}));

User.create({name: 'lxk', age: 23}, function (err, data) {
    if (!err) console.log(data)
});
User.create({name: 'fxy', age: 24}, function (err, data) {
    if (!err) console.log(data)
});

setTimeout(() => {
    User.remove({name: 'fxy'}, function (err, data) {
        if (!err) console.log(data)
    });

    User.update({name: 'lxk'}, {'$set': {age: 17}}, function (err, data) {
        if (!err) console.log(data)
    });
}, 100);

const app = express();

app.get('/', function (req, res) {
   res.send('Hello world');
});

app.get('/data', function (req, res) {
    User.find({}, function(err, doc) {
        res.json(doc)
    });
});

app.listen(3000, function() {
   console.log('listening at port 3000 ...')
});