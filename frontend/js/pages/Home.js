import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';

import ShoeListPage from './ShoeListPage';
import CartPage from './CartPage';
import ReviewPage from './ReviewPage';
import ShoePage from './ShoePage';
import ShippingAddressPage from './ShippingAddressPage';
import PaymentMethodPage from './PaymentMethodPage';
import ReviewTransactionPage from './ReviewTransactionPage';
import UserPage from './UserPage';

const Home = () => {
  const [showBugComponent, setShowBugComponent] = useState(false);

  return (
    <>
      {/* Leave the below commented out for now */}
      {/* <button type="button" onClick={() => setShowBugComponent(true)}>
        Click to test if Sentry is capturing frontend errors! (Should only work in Production)
      </button> */}

      <Switch>
        <Route exact path='/' component={ShoeListPage} />
        <Route path='/cart' component={CartPage} />
        <Route path='/store' component={ShoeListPage}/>
        <Route path='/shoe' component={ShoePage} />
        <Route path='/review' component={ReviewPage} />
        <Route path='/selectAddress' component={ShippingAddressPage} />
        <Route path='/selectPayment' component={PaymentMethodPage} />
        <Route path='/reviewTransaction' component={ReviewTransactionPage} />
        <Route path='/user' component={UserPage} />
      </Switch>

      {showBugComponent && showBugComponent.field.notexist}
    </>
  );
};

export default Home;
