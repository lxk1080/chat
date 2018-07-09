import axios from 'axios';
// qs这个库是axios里面包含的
// Qs.stringify({name: 'qwe', age: '12'}) = 'name=qwe&age=12'
// JSON.stringify({name: 'qwe', age: '12'}) = '{"name": "qwe", "age": "12"}'
// ...爬坑
import Qs from 'qs';
import * as actionTypes from './actionTypes';
import { REGISTER_ERROR_MSG } from './common';

export const registerSuccess = data => ({type: actionTypes.REGISTER_SUCCESS, payload: data});

export const register = data => {
  const { user, pwd, repeatPwd, type } = data;

  if (!user || !pwd || !repeatPwd || !type) {
    return REGISTER_ERROR_MSG('请完成所有注册信息！');
  }

  if (pwd !== repeatPwd) {
    return REGISTER_ERROR_MSG('两次输入密码不一致！');
  }

  return dispatch => {
    axios.post('/user/register', Qs.stringify({user, pwd, type})).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(registerSuccess({user, pwd, type}));
        dispatch(REGISTER_ERROR_MSG(''));
      } else {
        dispatch(REGISTER_ERROR_MSG(res.data.msg));
      }
    })
  }
};
