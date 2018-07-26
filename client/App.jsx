// @flow

import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import axios from 'axios';
import AsyncRoute from './AsyncRoute';

class App extends Component {
  state = {};

  componentDidMount() {
    axios.get('http://localhost:3000/api/employee').then(resp => this.setState(resp.data));
  }

  render() {
    return (
      <BrowserRouter>
        <Route path="/" component={props => <AsyncRoute props={props} loadingPromise={import('./Login')} />} />
      </BrowserRouter>
    );
  }
}

export default App;
