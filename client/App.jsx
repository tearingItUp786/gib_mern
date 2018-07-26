import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  state = {};

  componentDidMount() {
    axios.get('http://localhost:3000/api/employee').then(resp => this.setState(resp.data));
  }

  render() {
    return (
      <code>
        <pre>{JSON.stringify(this.state, null, 4)}</pre>
      </code>
    );
  }
}

export default App;
