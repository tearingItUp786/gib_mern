import React from 'react';
import { render } from 'react-dom';
import App from './App';

const rootEl = document.getElementById('app');

const renderApp = Component => {
  render(<Component />, rootEl);
};
renderApp(App);

if (module.hot) {
  module.hot.accept('./App', () => {
    /*eslint-disable*/
    const NextRootContainer = require('./App').default;
    renderApp(NextRootContainer);
  });
}
