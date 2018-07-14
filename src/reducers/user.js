import * as actionTypes from '../actions/actionTypes';

const userMetaState = {
  isAuth: false,
  username: '',
  type: '',
  avatar: '',
};

export const userMeta = (state = userMetaState, action) => {
  switch(action.type) {
    case actionTypes.LOAD_USERMETA:
      return {...state, ...action.payload, isAuth: true};

    case actionTypes.LOGIN_SUCCESS:
      return {...state, ...action.payload, isAuth: true};

    case actionTypes.REGISTER_SUCCESS:
      return {...state, ...action.payload, isAuth: true};

    default:
      return state;
  }
};
