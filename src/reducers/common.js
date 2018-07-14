import * as actionTypes from '../actions/actionTypes';

const msgState = {
  registerErrorMsg: '',
  loginErrorMsg: '',
};

export const msg = (state = msgState, action) => {
  switch (action.type) {
    case actionTypes.SET_LOGIN_ERROR_MSG:
      return {...state, loginErrorMsg: action.payload};

    case actionTypes.SET_REGISTER_ERROR_MSG:
      return {...state, registerErrorMsg: action.payload};

    default:
      return state;
  }
};
