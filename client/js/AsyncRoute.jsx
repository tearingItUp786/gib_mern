// @flow
import React, { Component } from 'react';
import Loading from './common/Loading';

type AsyncRouteProps = {
  props: mixed,
  loadingPromise: Promise<{ default: Class<React.Component<*, *>> }>
};

type AsyncRouteState = {
  loaded: boolean
};

class AsyncRoute extends Component<AsyncRouteProps, AsyncRouteState> {
  component = null;

  state = {
    loaded: false
  };

  componentDidMount() {
    const { loadingPromise } = this.props;

    loadingPromise.then(module => {
      this.component = module.default;
      this.setState({ loaded: true });
    });
  }

  render() {
    const { loaded } = this.state;
    const { props } = this.props;

    if (!loaded) {
      return <Loading />;
    }

    // $FlowFixMe
    return <this.component {...props} />;
  }
}

export default AsyncRoute;
