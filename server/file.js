const express = require('express');
const path = require('path');
const fs = require('fs');
const Router = express.Router();

const image = path.join(__dirname, '../src/common/image');

Router.get('/image', function(req, res) {
  fs.readdir(image, function (err, data) {
    if (!err) {
      const lists = data.map(item => item.slice(0, item.length - 4)); // 去掉 '.jpg' 后缀
      res.json({
        code: 0,
        data: lists,
      })
    }
  });
});

module.exports = Router;