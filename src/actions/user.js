import axios from 'axios';
// qs这个库是axios里面包含的
// Qs.stringify({name: 'qwe', age: '12'}) = 'name=qwe&age=12'
// JSON.stringify({name: 'qwe', age: '12'}) = '{"name": "qwe", "age": "12"}'
// ...爬坑
import Qs from 'qs';
import * as actionTypes from './actionTypes';
import { setRegisterErrorMsg, setLoginErrorMsg } from './common';

export const loadUserMeta = data => ({type: actionTypes.LOAD_USERMETA, payload: data});

export const registerSuccess = data => ({type: actionTypes.REGISTER_SUCCESS, payload: data});

export const loginSuccess = data => ({type: actionTypes.LOGIN_SUCCESS, payload: data});

export const login = data => {
  const { username, password } = data;

  if (!username || !password) {
    return setLoginErrorMsg('请完成所有登录信息！');
  }

  return dispatch => {
    axios.post('/user/login', Qs.stringify({username, password})).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        const {username, type, avatar} = res.data.data;
        dispatch(loginSuccess({username, type, avatar}));
        dispatch(setLoginErrorMsg(''));
      } else {
        dispatch(setLoginErrorMsg(res.data.msg));
      }
    })
  }
};

export const register = data => {
  const { username, password, repeatPwd, type } = data;

  if (!username || !password || !repeatPwd || !type) {
    return setRegisterErrorMsg('请完成所有注册信息！');
  }

  if (password !== repeatPwd) {
    return setRegisterErrorMsg('两次输入密码不一致！');
  }

  return dispatch => {
    axios.post('/user/register', Qs.stringify({username, password, type})).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(registerSuccess({username, type}));
        dispatch(setRegisterErrorMsg(''));
      } else {
        dispatch(setRegisterErrorMsg(res.data.msg));
      }
    })
  }
};