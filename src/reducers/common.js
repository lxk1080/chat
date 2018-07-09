import * as actionTypes from '../actions/actionTypes';

const msgState = {
  registerErrorMsg: '',
};

export const msg = (state = msgState, action) => {
  switch (action.type) {
    case actionTypes.REGISTER_ERROR_MSG:
      return {...state, registerErrorMsg: action.payload};
    default:
      return state;
  }
};
