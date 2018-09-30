import React, { Component } from 'react';

import { Error, Screen } from '../components';

class ErrorRoute extends Component {
  render() {
    return (
      <Screen>
        <Error title="502">error text</Error>
      </Screen>
    );
  }
}

export default ErrorRoute;
