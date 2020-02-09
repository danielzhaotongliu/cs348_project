import React, { useState } from 'react';
import ShoeComponent from '../app/example-app/components/ShoeComponent'

const Home = () => {
  const [showBugComponent, setShowBugComponent] = useState(false);

  return (
    <>
      {/* <button type="button" onClick={() => setShowBugComponent(true)}>
        Click to test if Sentry is capturing frontend errors! (Should only work in Production)
      </button> */}

      <ShoeComponent name={'Contigo'} price={20} brand={'Clarks'} size={10}/>

      {showBugComponent && showBugComponent.field.notexist}
    </>
  );
};

export default Home;
