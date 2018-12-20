import * as actionTypes from './actionTypes';
import * as userApi from '../apis/user';
import { setRegisterErrorMsg, setLoginErrorMsg } from './common';
import { resetChatMsg } from './chat';

export const updateUserInfo = data => ({type: actionTypes.UPDATE_USER_INFO, payload: data});

export const resetUserInfo = data => ({type: actionTypes.RESET_USER_INFO, payload: data});

export const updateOtherSideList = data => ({type: actionTypes.UPDATE_OTHER_SIDE_LIST, payload: data});

export const resetOtherSideList = data => ({type: actionTypes.RESET_OTHER_SIDE_LIST, payload: data});

export const login = data => {
  const { username, password } = data;

  if (!username || !password) {
    return setLoginErrorMsg('请完成所有登录信息！');
  }

  return (dispatch, getState) => {
    userApi.login(username, password).then(res => {
      if (res.code === 0) {
        dispatch(updateUserInfo(res.data));
        dispatch(setLoginErrorMsg(''));
      } else {
        dispatch(setLoginErrorMsg(res.msg));
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
    userApi.register(username, password, type).then(res => {
      if (res.code === 0) {
        dispatch(updateUserInfo(res.data));
        dispatch(setRegisterErrorMsg(''));
      } else {
        dispatch(setRegisterErrorMsg(res.msg));
      }
    })
  }
};

export const save = data => dispatch => {
  userApi.update(data).then(res => {
    if (res.code === 0) {
      dispatch(updateUserInfo(res.data));
    } else {
      this.props.history.push('/login');
    }
  })
};

export const logout = () => (dispatch) => {
  dispatch(resetUserInfo());
  dispatch(resetOtherSideList());
  dispatch(resetChatMsg());
};
