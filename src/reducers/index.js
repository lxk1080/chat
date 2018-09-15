import { combineReducers } from 'redux';
import * as user from './user';
import * as common from './common';

export default combineReducers({
  userInfo: user.userInfo,
  chatUser: user.chatUser,
  msg: common.msg,
});
