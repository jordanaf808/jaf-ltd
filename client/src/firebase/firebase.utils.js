//  Firestore always returns 2 objects: references and snapshots. they can either be Document or Collection versions.

// Query Reference Object: the "current" place in the database that we are querying.
//  e.g. firestore.doc('/users/userId') or firestore.collections('/users')
//  does not contain data.

// Document Reference Object: perform CRUD methods: .set(), .get(), .update(), .delete()
//  * can also add docs to a collection using: collectionRef.add({ value:prop })

//  we return a  'snapshotObject' from the 'referenceObject' by using docRef.get OR collRef.get()
//  *** a Collection snapshot object is called a 'Query Snapshot Object'

// FireStore returns a snapshot object regardless if it exists or not. We must check if it doesn't: !---.exists returns a boolean.
//  we get the data in the object by calling .data() which returns a JSON object.

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: 'e-commerce-e56a3.firebaseapp.com',
  databaseURL: 'https://e-commerce-e56a3.firebaseio.com',
  projectId: 'e-commerce-e56a3',
  storageBucket: 'e-commerce-e56a3.appspot.com',
  messagingSenderId: '1040042807613',
  appId: '1:1040042807613:web:83e99c99585245975f3554',
  measurementId: 'G-3TCRETJXNT',
};

firebase.initializeApp(config);

// Note from when we got the snapshot in our app.js component did mount...
// We need to store the State of our user in the App. firebase {auth} needs
// to have access to the State so it can pass that information to all of our
// components that need it.
// whenever the auth state changes pass in the current userAuth object
// we pass in the userAuth object to createUserPro... in firebase.utils...
// if user doesnt exist create one, otherwise return the current userRef
// set that userRef to the current User in our redux state.

// Check if userAuth contains anything, then query the database for that user document
// The snapshot will tell us if that document .exists. if not create new doc with userRef.set()

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  // set the document reference to this location using uid created by firestore.
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  // get the snapshot object using the userRef's document reference.
  const snapShot = await userRef.get();
  // FireStore returns a snapshot object regardless if it exists in our db or not. We must check if it exists with .exists. if it doesn't, we create one with our '.set()'
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }
  return userRef;
};

// Utility to add new collections or documents to Firebase.
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);
  // group requests into a 'batch' object
  // we want to know that all of our requests have been submitted to firebase. If we get one error we want to
  // stop the whole thing, so our data doesn't become unorganized.
  const batch = firestore.batch();
  // loop over each objectToAdd. forEach does not return new array.
  // get a new doc ref and ID for each object added. when .doc() is empty we tell it to create an ID,
  // alternatively we can pass in obj.title to make the ID match the title.
  // then set all objects in a batch process with the new IDs and objects
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });
  // this will fire our batch request. returns a promise and resolve a null value. we can then chain on a .then and do something after our batch or handle errors
  return await batch.commit();
};

// convert our collection data from an array into an object and add our route names
// map through each doc object and destruct. title and items from doc.data (gives us data from doc)
// return our new objects collected into one final object with all the data we need.
// we need to add a routeName: encodeURI = pass in string, returns URL readable string
export const convertCollectionsSnapshotToMap = collections => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });
  // now we need to change this to an object that our reducer can use.
  // our initial value will be an empty object. the function will take in the accumulator and each items collection data.

  // for each collection in our collections (e.g. Hats) we are going to pass it into a new object with the lower case title, 'hats' as the key and hat's collection data as it's value.
  // it will then return the accumulator value and get the next item in the array and process it.
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

//  we want to return our check current user data in a 'promise' based method, since we moved this logic into a saga from an observer pattern in our app.js
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
