import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import AppProvider from '../context/AppContext';
import Layout from '../components/Layout';
import Home from '../containers/Home';
import Checkout from '../containers/Checkout';
import Information from '../containers/Information';
import Payment from '../containers/Payment';
import Success from '../containers/Success';
import NotFound from '../containers/NotFound';
/* import '../styles/components/App.css';
 */
const App = () => {
  return (
    <PayPalScriptProvider
      options={{
        'client-id':
          'ASLx1mGjwVdAZzfujMVHDBPzDtbO2kvuLctqDAmIdFDKE-bn1mdHs43awPEomgsA_61lLau_7EgNFLft',
      }}
    >
      <AppProvider>
        <BrowserRouter>
          <Layout>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/checkout" component={Checkout} />
              <Route
                exact
                path="/checkout/information"
                component={Information}
              />
              <Route exact path="/checkout/payment" component={Payment} />
              <Route exact path="/checkout/success" component={Success} />
              <Route path="*" component={NotFound} />
            </Switch>
          </Layout>
        </BrowserRouter>
      </AppProvider>
    </PayPalScriptProvider>
  );
};

export default App;
