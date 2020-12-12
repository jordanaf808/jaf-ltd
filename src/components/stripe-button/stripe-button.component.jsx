import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    'pk_test_51HKpjGC1PiAwwv6891Ej4qTksB4sJ6pJamaN20Q8H0eBowKJ9sFnAyOlvP9h6jI2UpWtm32c8YRLmqiPdMTLnX4p00KHNuBdV6';
  const onToken = token => {
    console.log(token);
    alert('Payment Successful');
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
