import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useHistory } from 'react-router-dom';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { handleSumTotal } from '../utils';
import '../styles/components/Payment.css';

const Payment = () => {
  const { state } = useContext(AppContext);
  const { cart } = state;

  const [paidFor, setPaidFor] = useState(false);

  const handleApprove = (data) => {
    console.log(data);
    setPaidFor(true);
  };

  const history = useHistory();
  if (paidFor) {
    history.push('/checkout/success');
  }
  return (
    <div className="Payment">
      <div className="Payment-content">
        <h3>Resumen del pedido:</h3>
        {cart.map((item) => (
          <div className="Payment-item" key={item.title}>
            <div className="Payment-element">
              <h4>{item.title}</h4>
              <span>${item.price}</span>
            </div>
          </div>
        ))}
        {cart.length > 0 ? <h3>{`Total: ${handleSumTotal(cart)}`}</h3> : <></>}
        <div className="Payment-button" id="payment-button-container">
          <PayPalButtons
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: handleSumTotal(cart),
                    },
                  },
                ],
              });
            }}
            onApprove={(data, actions) => {
              return actions.order.capture().then((details) => {
                const name = details.payer.name.given_name;
                handleApprove(data);
              });
            }}
          />
        </div>
      </div>
      <div></div>
    </div>
  );
};

/* 
<code> 

import React from 'react'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PaypalPay = () => {
  return (
    <PayPalScriptProvider
      options={{
        "client-id": process.env.REACT_APP_PAYPAL_ID,
        currency: "USD",
      }}>

<PayPalButtons
        style={{ layout: "vertical" }}
        disabled={false}
        createOrder={(data, actions) =>
          actions.order
            .create({
              purchase_units: [
                {
                  amount: {
                    value: Number.parseFloat(handleSumTotal()).toFixed(2),
                  },
                },
              ],
            })
            .then((orderId) => {
              return orderId;
            })
        }
        onApprove={(data, actions) => {
          return actions.order
            .capture()
            .then((data) => {
              // Your code here after capture the
              paymentHandleSuccess(data);
            })
            .catch((error) => console.log(error));
        }}
      />
    </PayPalScriptProvider>

  )
}

export default PaypalPay
*/

export default Payment;
