// @flow

import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import defaultTheme from './styling/common';
import AsyncRoute from './AsyncRoute';

const App = () => (
  <ThemeProvider theme={defaultTheme}>
    <BrowserRouter>
      <Route path="/" component={props => <AsyncRoute props={props} loadingPromise={import('./Login')} />} />
    </BrowserRouter>
  </ThemeProvider>
);

export default App;
