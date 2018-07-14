import * as actionTypes from './actionTypes';

export const setRegisterErrorMsg = data => ({type: actionTypes.SET_REGISTER_ERROR_MSG, payload: data});

export const setLoginErrorMsg = data => ({type: actionTypes.SET_LOGIN_ERROR_MSG, payload: data});