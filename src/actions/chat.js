import * as actionTypes from './actionTypes';

export const setMsgList = data => ({type: actionTypes.SET_MSG_LIST, payload: data});

export const receiveMsg = data => ({type: actionTypes.RECEIVE_MSG, payload: data});

export const setMsgReadState = data => ({type: actionTypes.SET_MSG_READ_STATE, payload: data});