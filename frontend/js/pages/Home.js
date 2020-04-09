import React, { useState } from 'react';
import ShoeListPage from './ShoeListPage';
import CartPage from './CartPage';
import ReviewPage from './ReviewPage';
import ShoePage from './ShoePage';
import { Switch, Route } from 'react-router-dom';

/*
    TODO:
    - Implement Users
*/

const Home = () => {
  const [showBugComponent, setShowBugComponent] = useState(false);

  return (
    <>
      {/* Leave the below commented out for now */}
      {/* <button type="button" onClick={() => setShowBugComponent(true)}>
        Click to test if Sentry is capturing frontend errors! (Should only work in Production)
      </button> */}

      <Switch>
        <Route exact path='/' component={ShoePage} />
        <Route path='/cart' component={CartPage} />
        <Route path='/store' component={ShoeListPage}/>
        <Route path='/shoe' component={ShoePage} />
        <Route path='/review' component={ReviewPage} />
      </Switch>


      {showBugComponent && showBugComponent.field.notexist}
    </>
  );
};

export default Home;
