import * as actionTypes from '../actions/actionTypes';

const initUserInfo = {
  isAuth: false,
  username: '',
  type: '',
  avatar: '',
};

const initChatUser = {
  userList: [],
};

export const userInfo = (state = initUserInfo, action) => {
  switch(action.type) {
    case actionTypes.UPDATE_USER_INFO:
      return {...state, ...action.payload, isAuth: true};

    case actionTypes.LOGOUT:
      return {...initUserInfo};

    default:
      return state;
  }
};

export const chatUser = (state = initChatUser, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_USER_LIST:
      return {...state, userList: action.payload};

    default:
      return state;
  }
};
