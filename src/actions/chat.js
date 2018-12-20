import * as actionTypes from './actionTypes';
import * as chatApi from "../apis/chat";

export const setMsgList = data => ({type: actionTypes.SET_MSG_LIST, payload: data});

export const receiveMsg = data => ({type: actionTypes.RECEIVE_MSG, payload: data});

export const setMsgReadState = data => ({type: actionTypes.SET_MSG_READ_STATE, payload: data});

export const resetChatMsg = data => ({type: actionTypes.RESET_CHAT_MSG, payload: data});

export const setMsgRead = data => (dispatch, getState) => {
  const userId = getState().userInfo._id;
  const otherSideId = data.otherSideId;

  chatApi.setMsgRead(data).then(res => {
    if (res.code === 0) {
      dispatch(setMsgReadState({ data: res.data, userId, otherSideId }));
    }
  })
}
