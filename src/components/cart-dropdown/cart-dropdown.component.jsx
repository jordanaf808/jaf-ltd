import React from 'react';
// use 'connect' to access the Redux store
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { toggleCartHidden } from '../../redux/cart/cart.actions';

import './cart-dropdown.styles.scss';

// if we don't supply a second argument (e.g. mapDispatchToProps) to connect() down below it will
// automatically pass dispatch into our component as a prop! this way we can dispatch the toggleCartHidden action.
const CartDropdown = ({ cartItems, history, dispatch }) => (
  <div className='cart-dropdown'>
    <div className='cart-items'>
      {cartItems.length ? (
        cartItems.map((cartItem) => (
          <CartItem key={cartItem.id} item={cartItem} />
        ))
      ) : (
        <span className='empty-message'>Your Cart Is Empty</span>
      )}
    </div>
    <CustomButton
      onClick={() => {
        history.push('/checkout');
        dispatch(toggleCartHidden());
      }}>
      Go To Checkout
    </CustomButton>
  </div>
);

// mapStateToProps will return our state which we'll destructure out our
// cartItems from cart
// const mapStateToProps = ({ cart: { cartItems } }) => ({
//   cartItems,
// });

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
});

// js evaluates inside out. the return of the connect function will be wrapped with properties from the withRouter function:
// history, match, etc...
export default withRouter(connect(mapStateToProps)(CartDropdown));
