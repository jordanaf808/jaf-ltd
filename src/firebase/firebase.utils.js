import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyC5QmzPVaqwho0aH7CrAcLXy1TkSBShUr0",
  authDomain: "e-commerce-e56a3.firebaseapp.com",
  databaseURL: "https://e-commerce-e56a3.firebaseio.com",
  projectId: "e-commerce-e56a3",
  storageBucket: "e-commerce-e56a3.appspot.com",
  messagingSenderId: "1040042807613",
  appId: "1:1040042807613:web:83e99c99585245975f3554",
  measurementId: "G-3TCRETJXNT"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if(!snapShot.exists){
    const {displayName, email} = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }
  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;