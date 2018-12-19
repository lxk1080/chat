import * as actionTypes from '../actions/actionTypes';

const initChatMsg = {
  msgList: [],
  unread: 0,
};

export const chatMsg = (state = initChatMsg, action) => {
  const { data, userId, otherSideId } = action.payload || {};

  switch (action.type) {
    case actionTypes.SET_MSG_LIST:
      return {
        ...state,
        msgList: data,
        unread: data.filter(msg => !msg.read && msg.to === userId).length,
      };

    case actionTypes.RECEIVE_MSG:
      return {
        ...state,
        msgList: (data.to === userId || data.from === userId) ? [...state.msgList, data] : [...state.msgList],
        unread: data.to === userId ? state.unread + 1 : state.unread,
      };

    case actionTypes.SET_MSG_READ_STATE:
      return {
        ...state,
        msgList: state.msgList.map(v => ({...v, read: v.from === otherSideId ? true : v.read})),
        unread: state.unread - data.num,
      };

    default:
      return state;
  }
};
