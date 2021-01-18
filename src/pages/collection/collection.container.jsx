import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { selectIsCollectionsLoaded } from '../../redux/shop/shop.selectors';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import CollectionPage from './collection.component';

// passing in a function to our isLoading selector will memoize it.
// “ If the mapStateToProps argument supplied to connect returns a function instead of an object, it will be used to create an individual mapStateToProps function for each instance of the container.”
// https://medium.com/@pearlmcphee/selectors-react-redux-reselect-9ab984688dd4
//  https://github.com/reduxjs/reselect#accessing-react-props-in-selectors

// More info on Section 19, lecture 188
// https://www.udemy.com/course/complete-react-developer-zero-to-mastery/learn/lecture/15221888#questions/8004528
const mapStateToProps = createStructuredSelector({
  isLoading: state => !selectIsCollectionsLoaded(state),
});

const CollectionPageContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionPage);

export default CollectionPageContainer;
