import React, { useState } from 'react';
import ShoeListDisplay from './ShoeListDisplay';

/*
    TODO: 
    - Implement Cart
    - Implement Users
*/

const Home = () => {
  const [showBugComponent, setShowBugComponent] = useState(false);

  return (
    <>
      {/* <button type="button" onClick={() => setShowBugComponent(true)}>
        Click to test if Sentry is capturing frontend errors! (Should only work in Production)
      </button> */}

      <ShoeListDisplay />

      {showBugComponent && showBugComponent.field.notexist}
    </>
  );
};

export default Home;
