import { combineReducers } from 'redux';
import * as user from './user';
import * as common from './common';

export default combineReducers({
  userMeta: user.userMeta,
  msg: common.msg,
});
