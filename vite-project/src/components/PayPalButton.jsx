import React, { useEffect, useRef } from 'react';

function PayPalButton({ amount, onSuccess }) {
  const paypalRef = useRef();

  useEffect(() => {
    if (paypalRef.current) {
      paypalRef.current.innerHTML = '';
    }

    window.paypal.Buttons({
      createOrder: (data, actions) => {
        return actions.order.create({
          purchase_units: [{ amount: { value: amount } }]
        });
      },
      onApprove: (data, actions) => {
        return actions.order.capture().then(details => {
          onSuccess(details);
        });
      }
    }).render(paypalRef.current);
  }, [amount, onSuccess]);

  return <div className='btnPayPal' ref={paypalRef}></div>;
}

export default PayPalButton;