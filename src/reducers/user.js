import * as actionTypes from '../actions/actionTypes';

const userMetaState = {
  isAuth: false,
  username: '',
  type: '',
  avatar: '',
};

export const userMeta = (state = userMetaState, action) => {
  switch(action.type) {
    case actionTypes.UPDATE_USER_INFO:
      return {...state, ...action.payload, isAuth: true};

    default:
      return state;
  }
};
