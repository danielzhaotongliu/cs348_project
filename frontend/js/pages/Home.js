import React, { useState } from 'react';
import ShoeListPage from './ShoeListPage';
import { Switch, Route } from 'react-router-dom';

/*
    TODO: 
    - Implement Cart
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
        <Route exact path='/' component={ShoeListPage} />
      </Switch>


      {showBugComponent && showBugComponent.field.notexist}
    </>
  );
};

export default Home;
