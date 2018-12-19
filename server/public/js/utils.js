const utils = require('utility');

const pwdMD5 = (pwd) => {
  const salt = 'lxk_@pwd';
  return utils.md5(utils.md5(pwd+salt));
};

module.exports = {
  pwdMD5,
};