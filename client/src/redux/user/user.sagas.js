import { takeLatest, put, all, call } from 'redux-saga/effects';

import UserActionTypes from './user.types';

import {
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  signUpSuccess,
  signUpFailure,
} from './user.actions';

// import logic from firebase
import {
  auth,
  googleProvider,
  createUserProfileDocument,
  getCurrentUser,
} from '../../firebase/firebase.utils';

// transfer code inside of our sign-in component to trigger googleSignIn, which triggers a Firebase.utils and put it here.

// Note from when we got the snapshot in our app.js component did mount...
// We need to store the State of our user in the App. firebase {auth} needs
// to have access to the State so it can pass that information to all of our
// components that need it.
// whenever the auth state changes pass in the current userAuth object
// we pass in the userAuth object to createUserPro... in firebase.utils...
// if user doesnt exist create one, otherwise return the current userRef
// set that userRef to the current User in our redux state.

// refactor snapshot request outside of singInWithGoogle and ...Email so we don't rewrite our code too much.
export function* getSnapshotFromUserAuth(userAuth, additionalData) {
  try {
    const userRef = yield call(
      createUserProfileDocument,
      userAuth,
      additionalData
    ); // get reference object
    const userSnapshot = yield userRef.get(); // get snapshot
    // just like our previous observer method we 'put()' the googleSignInSuccess action into the reducer with the snapshot.id and .data()
    yield put(
      signInSuccess({
        id: userSnapshot.id,
        ...userSnapshot.data(),
      })
    );
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signUp({ payload: { email, password, displayName } }) {
  try {
    // 'auth.create...' is a Firebase method that returns a 'userAuth' object which we access by destructuring.
    // create user with email and password from this.state above.
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    yield put(signUpSuccess({ user, additionalData: { displayName } }));
    // // We successfully created a new user document with the above function and received a 'userAuth' object from Firebase in return. We send that to this function and the displayName as an object as the second argument, so we can save this new user in our database.
    // await createUserProfileDocument(user, { displayName });
    // // clear form after sending:
    // this.setState({
    //   displayName: '',
    //   email: '',
    //   password: '',
    //   confirmPassword: '',
    // });
  } catch (error) {
    yield put(signUpFailure(error));
  }
}

export function* signInAfterSignUp({ payload: { user, additionalData } }) {
  yield getSnapshotFromUserAuth(user, additionalData);
}

export function* signInWithGoogle() {
  try {
    // We got a userAuth object just like we did before in our app.js, only we call it 'user' here.
    // Destructure it off the auth.signIn...
    const { user } = yield auth.signInWithPopup(googleProvider);
    // and retrieve the SnapShot.
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

// destructure the payload from the EMAIL action, then destructure email and password from the payload.
export function* signInWithEmail({ payload: { email, password } }) {
  try {
    // destruct from auth
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    put(signInFailure(error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    // if null, return out of this function
    if (!userAuth) return;
    // if isnt null (!null) get the snapshot just like we did above
    yield getSnapshotFromUserAuth(userAuth);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* onSignUpStart() {
  yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
  yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}

// Listen for sign-in start and trigger saga with the right action type and triggered by the sign in component button.
export function* onGoogleSignInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

// takeLatest receives this EMAIL_... action, then triggers signInWithEmail()* and passes in the action's payload
export function* onEmailSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

// Listen for the checkUserSession action dispatched from our componentDidMount in App.js
export function* onCheckUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

// note: Our components are purely action generators, any of the logic related to the sign out now happens in the sagas.

// Listen for signOutStart from header.component
export function* onSignOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* signOut() {
  try {
    yield auth.signOut();
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure(error));
  }
}

// export the trigger (onGoogleSignInStart) to our Root Saga
export function* userSagas() {
  yield all([
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignOutStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
  ]);
}
