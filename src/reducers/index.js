import { combineReducers } from 'redux';
import * as user from './user';
import * as common from './common';
import * as chat from './chat';

export default combineReducers({
  userInfo: user.userInfo,
  chatUser: user.chatUser,
  msg: common.msg,
  chatMsg: chat.chatMsg,
});
