import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    'pk_test_51HKpjGC1PiAwwv6891Ej4qTksB4sJ6pJamaN20Q8H0eBowKJ9sFnAyOlvP9h6jI2UpWtm32c8YRLmqiPdMTLnX4p00KHNuBdV6';
  const onToken = token => {
    // axios takes an object that has all the props we want to pass. Axios will look for the route labeled 'payment'. Axios will append this to any route a request made
    axios({
      url: 'payment',
      method: 'post',
      data: {
        amount: priceForStripe,
        token: token,
      },
    })
      .then(response => {
        alert('Payment Successful');
      })
      .catch(error => {
        console.log('Payment error: ', JSON.parse(error));
        alert(
          'There was an issue with your payment. Please make sure you entered in your information correctly'
        );
      });
  };

  return (
    <StripeCheckout
      label='Pay Now'
      name='JAF Ltd.'
      billingAddress
      shippingAddress
      // image='https://svgshare.com/i/CUz.svg'
      image='https://sendeyo.com/up/d/f3eb2117da'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
