import * as actionTypes from '../actions/actionTypes';

const initChatMsg = {
  msgList: [],
  unread: 0,
};

export const chatMsg = (state = initChatMsg, action) => {
  const { data, userId } = action.payload || {};

  switch (action.type) {
    case actionTypes.SET_MSG_LIST:
      return {...state, msgList: data, unread: data.filter(msg => !msg.read && msg.to === userId).length};

    case actionTypes.RECEIVE_MSG:
      return {...state, msgList: [...state.msgList, data], unread: data.to === userId ? state.unread + 1 : state.unread};

    case actionTypes.SET_MSG_READ_STATE:

    default:
      return state;
  }
};
