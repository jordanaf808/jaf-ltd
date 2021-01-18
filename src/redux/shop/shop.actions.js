import ShopActionTypes from './shop.types';

// import dependencies that we need for our shop collection data
import {
  firestore,
  convertCollectionsSnapshotToMap,
} from '../../firebase/firebase.utils';

// Instead of creating an action that returns an action object, we are going to write a function, that returns a function (a 'thunk'), that makes a dispatch to fire multiple actions.

// Now our logic to parse the data from our firestore is in redux instead of our shop component

export const fetchCollectionsStart = collectionsMap => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START,
});

export const fetchCollectionsSuccess = collectionsMap => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap,
});

export const fetchCollectionsFailure = errorMessage => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage,
});

// bring in our async database call and use thunks to make multiple dispatches to our shop reducer within this one asynchronous function. It is no longer dependent on our shop component.

export const fetchCollectionsStartAsync = () => {
  return dispatch => {
    const collectionRef = firestore.collection('collections');
    dispatch(fetchCollectionsStart());
    collectionRef
      .get()
      .then(snapshot => {
        const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        dispatch(fetchCollectionsSuccess(collectionsMap));
      })
      .catch(error => dispatch(fetchCollectionsFailure(error.message)));
  };
};
