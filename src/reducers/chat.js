import * as actionTypes from '../actions/actionTypes';

const initChatMsg = {
  msgList: [],
  unread: 0,
};

export const chatMsg = (state = initChatMsg, action) => {
  switch (action.type) {
    case actionTypes.SET_MSG_LIST:
      return {...state, msgList: action.payload, unread: action.payload.filter(msg => !msg.read).length};

    case actionTypes.RECEIVE_MSG:
      return {...state, msgList: [...state.msgList, action.payload], unread: state.unread + 1};

    case actionTypes.SET_MSG_READ_STATE:

    default:
      return state;
  }
};