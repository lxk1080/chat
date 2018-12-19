import axios from 'axios';
// qs这个库是axios里面包含的
// Qs.stringify({name: 'qwe', age: '12'}) = 'name=qwe&age=12'
// JSON.stringify({name: 'qwe', age: '12'}) = '{"name": "qwe", "age": "12"}'
// ...爬坑
import Qs from 'qs';

// 检查是否登录
export function check() {
  const url = '/user/check';

  return axios.get(url).then((res) => {
    if (res.status === 200) {
      return Promise.resolve(res.data);
    }
  })
}

// 注册接口
export function register(username, password, type) {
  const url = '/user/register';

  return axios.post(url, Qs.stringify({username, password, type})).then(res => {
    return Promise.resolve(res.data);
  })
}

// 登录接口
export function login(username, password) {
  const url = '/user/login';

  return axios.post(url, Qs.stringify({username, password})).then(res => {
    return Promise.resolve(res.data);
  })
}

// 更新用户信息
export function update(data) {
  const url = '/user/update';

  return axios.post(url, Qs.stringify(data)).then(res => {
    return Promise.resolve(res.data);
  })
}

// 根据用户类型获取用户列表
export function getUserList(type) {
  const url = `/user/list?type=${type}`;

  return axios.get(url).then(res => {
    return Promise.resolve(res.data);
  });
}
