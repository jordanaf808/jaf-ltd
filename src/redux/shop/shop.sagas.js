//  import 'Effects' from sagas to perform actions (e.g. create or listen)
//  'takeEvery' - Listens for every action of a specific type. It allows us to perform an asynchronous request without 'blocking' our app from running js code. we can perform other actions or Sagas meanwhile. We yield control of this action to the middleware. If we receive another takeEvery action type, the middleware can determine whether to cancel the previous action/other actions
import { call, takeEvery, put } from 'redux-saga/effects';

import {
  firestore,
  convertCollectionsSnapshotToMap,
} from '../../firebase/firebase.utils';

import {
  fetchCollectionsSuccess,
  fetchCollectionsFailure,
} from './shop.actions';

import ShopActionTypes from './shop.types';

// All generator functions* have to 'yield' something!
// like async/await we can put our logic in a try/catch block to catch any errors.
export function* fetchCollectionsAsync() {
  yield console.log('Hello World');
  try {
    const collectionRef = firestore.collection('collections');
    // dispatch(fetchCollectionsStart()); not dispatching from Saga, we listen for it.
    const snapshot = yield collectionRef.get(); // returns a Promise with the response set to 'snapshot'
    const collectionsMap = yield call(
      convertCollectionsSnapshotToMap,
      snapshot
    );
    yield put(fetchCollectionsSuccess(collectionsMap)); // sagas don't dispatch actions they use 'put()' we have to yield them.
  } catch (error) {
    yield put(fetchCollectionsFailure(error.message));
  }

  // collectionRef
  //   .get()
  //   .then(snapshot => {
  //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
  //     dispatch(fetchCollectionsSuccess(collectionsMap));
  //   })
  //   .catch(error => dispatch(fetchCollectionsFailure(error.message)));
}

// Our first Saga:
// This Saga will 'yield' when a specific action type comes in (1st argument)
// The 2nd argument is another generator function* that will run in response to the action type
export function* fetchCollectionsStart() {
  yield takeEvery(
    ShopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsAsync
  );
}
