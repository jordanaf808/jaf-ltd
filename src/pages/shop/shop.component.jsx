import React from 'react';
import { Route } from 'react-router-dom';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

// Our 'shop' page is nested inside of a route, Route automatically passes in 'match' 'location' and 'history'
// 'match' helps us to dynamically display the specific ShopPage in whatever route we put it.
// '/:collectionId' allows us to pass through the URL path through 'match' into our collection.component.
const ShopPage = ({ match }) => (
  <div className='shop-page'>
    <Route exact path={`${match.path}`} component={CollectionsOverview} />
    <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
  </div>
);

export default ShopPage;
