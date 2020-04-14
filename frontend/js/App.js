import React from 'react';
import { hot } from 'react-hot-loader';

import Home from './pages/Home';
import SentryBoundary from './utils/SentryBoundary';
import 'bootstrap/dist/css/bootstrap.min.css';
const App = () => (
  <SentryBoundary>
    <Home />
  </SentryBoundary>
);

export default hot(module)(App);
