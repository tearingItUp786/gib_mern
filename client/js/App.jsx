// @flow

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import defaultTheme from './styling/common';
import AsyncRoute from './AsyncRoute';

const App = () => (
  <ThemeProvider theme={defaultTheme}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={props => <AsyncRoute props={props} loadingPromise={import('./Login')} />} />
        <Route
          exact
          path="/dashboard"
          component={props => <AsyncRoute props={props} loadingPromise={import('./components/Dashboard')} />}
        />
      </Switch>
    </BrowserRouter>
  </ThemeProvider>
);

export default App;
