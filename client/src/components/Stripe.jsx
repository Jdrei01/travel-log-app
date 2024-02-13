import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { PaymentElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (elements == null) {
      return;
    }

    // Your existing code for handling form submission

  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button type="submit" disabled={!stripe || !elements}>
        Pay
      </button>
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};

const stripePromise = loadStripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh");

export default function Stripe() {
  return (
    <Elements stripe={stripePromise} options={{ mode: 'setup', currency: 'usd' }}>
      <CheckoutForm />
    </Elements>
  );
}
