import UserActionTypes from './user.types';

// we need to create an initial state when the app is started for the
// first time. Redux doesn't know the state when it first initializes,
// so when an action gets fired we need to set an initial state
// we have to set one. Just like we do in our Class component earlier.

const INITIAL_STATE = {
  currentUser: null,
  error: null,
};

// 'Default Parameter Value' ES6 feature allows you to set a default value.
// In the first argument, if 'state' is not set it will fall back to
// INITIAL_STATE. (remember that 'null' is still a value).

const userReducer = (state = INITIAL_STATE, action) => {
  // if case of action type matches what we want, do something, otherwise do 'default:'.
  // * each Reducer gets every action passed through it, if it doesn't match just
  // return state by default.
  switch (action.type) {
    // change our action type to our new promise based auth methods.
    // *** We can stack Cases with the same return ( state, and payload) ***
    // clear the error if our action succeeds
    case UserActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        error: null,
      };
    case UserActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        error: null,
      };
    case UserActionTypes.SIGN_IN_FAILURE:
    case UserActionTypes.SIGN_OUT_FAILURE:
    case UserActionTypes.SIGN_UP_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
