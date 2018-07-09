import * as actionTypes from '../actions/actionTypes';

const userMetaState = {
  isAuth: false,
  user: '',
  pwd: '',
  type: '',
};

export const userMeta = (state = userMetaState, action) => {
  switch(action.type) {
    case actionTypes.REGISTER_SUCCESS:
      return {...state, ...action.payload, isAuth: true};
    default:
      return state;
  }
};
