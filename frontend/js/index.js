// import pages
import 'bootstrap-includes';
import '../sass/style.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/browser';
import {BrowserRouter} from 'react-router-dom';
import App from './App';

Sentry.init({
  dsn: window.SENTRY_DSN,
  release: window.COMMIT_SHA,
});

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('react-app'));
