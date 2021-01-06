import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.scss';

import Header from './components/header/header.component';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selector';

// We need to store the State of our user in the App. firebase {auth} needs
// to have access to the State so it can pass that information to all of our
// components that need it.

// To store state in that App we need to change it to a 'class' component:
// function App() {
//   return (
class App extends React.Component {
  unsubscribeFromAuth = null;
  // whenever the auth state changes pass in the current userAuth object
  // we pass in the userAuth object to createUserPro... in firebase.utils...
  // if user doesnt exist create one, otherwise return the current userRef
  // set that userRef to the current User in our redux state.
  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            // this.setState({
            //   currentUser: {
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      }
      // this.setState({currentUser: userAuth});

      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route
            exact
            path='/signin'
            render={() =>
              this.props.currentUser ? (
                <Redirect to='/' />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

// give us access to this.props.currentUser
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

// dispatch an action we want to change a prop on. We set the prop we want,
// which goes to a func. which gets the 'user' object. then calls dispatch().
// dispatch tells redux to pass this action object with the 'user' payload
// to the reducers.
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
});

// our app doesn't need currentUser data, only the header component needs it.
// so we pass 'null' as first argument.
// export default App;
export default connect(mapStateToProps, mapDispatchToProps)(App);
