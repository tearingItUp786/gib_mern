// @flow

import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import AsyncRoute from './AsyncRoute';

const App = () => (
  <BrowserRouter>
    <Route path="/" component={props => <AsyncRoute props={props} loadingPromise={import('./Login')} />} />
  </BrowserRouter>
);

export default App;
