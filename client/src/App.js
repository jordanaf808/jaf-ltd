import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.scss';

import Header from './components/header/header.component';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

// import { auth, createUserProfileDocument } from './firebase/firebase.utils'; Removed for User Saga

// import { setCurrentUser } from './redux/user/user.actions'; Removed for User Saga
import { selectCurrentUser } from './redux/user/user.selector';
import { checkUserSession } from './redux/user/user.actions';

// convert our App to a function component with hooks.
// destructure checkUserSession

// class App extends React.Component {
const App = ({ checkUserSession, currentUser }) => {
  // unsubscribeFromAuth = null; from way earlier, i think. don't think i need this
  // componentDidMount() {
  // const { checkUserSession } = this.props;
  //   checkUserSession();
  // }

  //  To activate our checkUserSession only on mount (not every time currentUser updates), we pass in an empty array to simulate the componentDidMount lifecycle. BUT this could cause errors, causing this component or it's parent to rerender too much.
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  // componentWillUnmount() { from before sagas i believe.
  //   this.unsubscribeFromAuth();
  // }

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
            // this.props.currentUser ? (
            currentUser ? <Redirect to='/' /> : <SignInAndSignUpPage />
          }
        />
      </Switch>
    </div>
  );
};

// give us access to this.props.currentUser
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession()),
});

// dispatch an action we want to change a prop on. We set the prop we want,
// which goes to a func. which gets the 'user' object. then calls dispatch().
// dispatch tells redux to pass this action object with the 'user' payload
// to the reducers.
// *** Removed for User Saga
// const mapDispatchToProps = dispatch => ({
//   setCurrentUser: user => dispatch(setCurrentUser(user)),
// });

export default connect(mapStateToProps, mapDispatchToProps)(App);
