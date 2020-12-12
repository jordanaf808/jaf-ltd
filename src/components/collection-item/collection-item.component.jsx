import React from "react";
import { connect } from "react-redux";

import CustomButton from "../custom-button/custom-button.component";
import { addItem } from "../../redux/cart/cart.actions";

import "./collection-item.styles.scss";

const CollectionItem = ({ item, addItem }) => {
  const { name, price, imageUrl } = item;
  return (
    <div className='collection-item'>
      <div
        className='image'
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className='collection-footer'>
        <span className='name'>{name}</span>
        <span className='price'>{price}</span>
      </div>
      <CustomButton onClick={() => addItem(item)} inverted>
        Add To Cart
      </CustomButton>
    </div>
  );
};

// "mapStateToProps() is a utility which helps your component get updated state(which is updated by some other components),
// mapDispatchToProps() is a utility which will help your component to fire an action event (dispatching action which may
// cause change of application state)" Code Whisperer

// "dispatch is just a function and the only way to change your application state. mapStateToProps is one way to expose dispatch
// function of your store to React Component. Also note that connect is not a part of redux in fact it is just a utility and boilerplate
// reduce library called react-redux to work with react and redux. You can achieve the same result without react-redux if you pass
// your store from root react component to children"  Vlad Filimon

// To connect this action to Redux and do it's thing, we declare this function that
// gets a dispatch. when the addItem component is used it will get the item(s) as props,
// which 'dispatch' will take and run through the addItem action creator. which returns an
// object with type and payload, then dispatch that new object into our store.
const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
});

export default connect(null, mapDispatchToProps)(CollectionItem);
