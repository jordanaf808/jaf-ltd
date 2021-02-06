import UserActionTypes from './user.types';

// export const setCurrentUser = user => ({ Not sure where this went or when
//   type: UserActionTypes.SET_CURRENT_USER,
//   payload: user,
// });

//===|      Sign-Up        |===\\
export const signUpStart = userCredentials => ({
  type: UserActionTypes.SIGN_UP_START,
  payload: userCredentials,
});

export const signUpSuccess = ({ user, additionalData }) => ({
  type: UserActionTypes.SIGN_UP_SUCCESS,
  payload: { user, additionalData },
});

export const signUpFailure = error => ({
  type: UserActionTypes.SIGN_UP_FAILURE,
  payload: error,
});

//===|      Google Sign-In        |===\\
// We don't need to include a payload, because the trigger will be in our sign in with google button??
export const googleSignInStart = () => ({
  type: UserActionTypes.GOOGLE_SIGN_IN_START,
});

//===|      Email Sign-In        |===\\

export const emailSignInStart = emailAndPassword => ({
  type: UserActionTypes.EMAIL_SIGN_IN_START,
  payload: emailAndPassword,
});

// Consolidate google and email sign-in success and failure.
export const signInSuccess = user => ({
  type: UserActionTypes.SIGN_IN_SUCCESS,
  payload: user,
});

export const signInFailure = error => ({
  type: UserActionTypes.SIGN_IN_FAILURE,
  payload: error,
});

//===|      Session Persistance        |===\\

export const checkUserSession = () => ({
  type: UserActionTypes.CHECK_USER_SESSION,
});

//===|      Sign-Out        |===\\

export const signOutStart = () => ({
  type: UserActionTypes.SIGN_OUT_START,
});

export const signOutSuccess = () => ({
  type: UserActionTypes.SIGN_OUT_SUCCESS,
});

export const signOutFailure = error => ({
  type: UserActionTypes.SIGN_OUT_FAILURE,
  payload: error,
});
