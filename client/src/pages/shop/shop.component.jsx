import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
import CollectionPageContainer from '../collection/collection.container';
import { fetchCollectionsStart } from '../../redux/shop/shop.actions';

// Our 'shop' page is nested inside of a route, Route automatically passes in 'match' 'location' and 'history'
// 'match' helps us to dynamically display the specific ShopPage in whatever route we put it.
// '/:collectionId' allows us to pass through the URL path through 'match' into our collection.component.

// To access state we need to switch this to a class component. access {match} through props.
// now write componentDidMount method where we subscribe and unsub. from our reference when we unmount.
// fetch snapshot from our collection array in firestore in componentDidMount using firestore utils.
// get data using .onSnapshot fetching data whenever it mounts or re-renders. it will return snapshot object
// transform data into shape we need and add values we don't have like route name. do this in a function in firebase.utils
// pass in the snapshot to our new convert... util and we'll get our data with all the properties we want like routename.

// class ShopPage extends React.Component {
const ShopPage = ({ fetchCollectionsStart, match }) => {
  // componentDidMount() {
  //   const { fetchCollectionsStart } = this.props;
  //   fetchCollectionsStart();
  // }
  useEffect(() => {
    fetchCollectionsStart();
  }, [fetchCollectionsStart]);

  // const { match } = this.props;
  return (
    <div className='shop-page'>
      <Route
        exact
        path={`${match.path}`}
        component={CollectionsOverviewContainer}
        // deleted for container
        // render={props => (
        //   <CollectionsOverviewWithSpinner
        //     isLoading={isCollectionFetching}
        //     {...props}
        //   />
        // )}
      />
      <Route
        path={`${match.path}/:collectionId`}
        component={CollectionPageContainer}
        // render={props => (
        //   <CollectionPageWithSpinner
        //     isLoading={!areCollectionsLoaded}
        //     {...props}
        //   />
        // )}
      />
    </div>
  );
};

// When we refresh a shop collection page, the app will break because when our collection component is loading it expects our collection data to be loaded already. However because React renders our components before calling the 'ComponentDidMount' lifecycle the collection has not been returned yet. Our isLoading value is initially set to false, which in turn renders a missing collection object.
//  To remedy: instead of checking whether collection is fetching, we need to check whether our collection has loaded, by making another selector which checks whether our collection is !!falsey: e.g.null or not.
// Now if 'isLoading' is true it will render the spinner, if false it will render the wrapped component. If our collection Has loaded our new areCollectionsLoaded selector returns true, it will trigger our loading spinner instead of loading the collection page, so we must switch the return value with '!'

// const mapStateToProps = createStructuredSelector({
//   areCollectionsLoaded: selectIsCollectionsLoaded,
// }); * Moved to Collection Containers

// const mapDispatchToProps = dispatch => ({
//   updateCollections: collectionsMap =>
//     dispatch(updateCollections(collectionsMap)),
// });
const mapDispatchToProps = dispatch => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
});

export default connect(null, mapDispatchToProps)(ShopPage);
