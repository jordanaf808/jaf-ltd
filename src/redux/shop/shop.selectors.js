import { createSelector } from 'reselect';

const selectShop = state => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  shop => shop.collections
);

// Object.keys: gets all 'keys' from an object in an array

// Get all the keys, then map over all the keys to get the values for each key
// which will return an array of items we need
export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  collections => Object.keys(collections).map(key => collections[key])
);

// "Curried Function" a function that returns another function.

// We changed our SHOP_DATA from an array[] to an object{}. This allows us to access our data
// more efficiently. With our array.find it searches every item until
// it finds the right one. An object gives us the ability to find it more directly.
export const selectCollection = collectionUrlParam =>
  createSelector(
    [selectCollections],
    collections => collections[collectionUrlParam]
    // collections.find(
    //   collection => collection.id === COLLECTION_ID_MAP[collectionUrlParam]
    // )
  );
