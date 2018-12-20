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

    case actionTypes.RESET_USER_INFO:
      return {...initUserInfo};

    default:
      return state;
  }
};

export const chatUser = (state = initChatUser, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_OTHER_SIDE_LIST:
      return {...state, userList: action.payload};

    case actionTypes.RESET_OTHER_SIDE_LIST:
      return {...initChatUser};

    default:
      return state;
  }
};
