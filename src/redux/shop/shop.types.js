// before we just made a simple action call. Now we will set multiple states our shop actions can be in as far as fetching async data.
// const ShopActionTypes = {
//   UPDATE_COLLECTIONS: 'UPDATE_COLLECTIONS',
// };
const ShopActionTypes = {
  FETCH_COLLECTIONS_START: 'FETCH_COLLECTIONS_START',
  FETCH_COLLECTIONS_SUCCESS: 'FETCH_COLLECTIONS_SUCCESS',
  FETCH_COLLECTIONS_FAILURE: 'FETCH_COLLECTIONS_FAILURE',
};

export default ShopActionTypes;
