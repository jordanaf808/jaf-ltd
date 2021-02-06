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

// We refactored this thunk into a Saga.
// This is a thunk where we took the logic of fetching our collections out of our shop component and here in our shop.actions. This thunk allows us to make multiple action dispatches to our shop reducer to retrieve collections and update the state within this one asynchronous function.
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
