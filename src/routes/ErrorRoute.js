import qs from 'query-string';
import React, { Component } from 'react';

import {
  Error,
  Content,
  Screen,
  Button,
  ButtonRow,
  ParagraphBody2,
} from '../components';

class ErrorRoute extends Component {
  handerGoBackToWallet = () => {
    this.props.history.push('/wallet');
  };

  render() {
    const { message } = qs.parse(this.props.location.search);

    return (
      <Screen>
        <Content spread centerY>
          <Error title="">
            <ParagraphBody2>{message}</ParagraphBody2>
          </Error>
        </Content>
        <ButtonRow>
          <Button onClick={this.handerGoBackToWallet}>Back to wallet</Button>
        </ButtonRow>
      </Screen>
    );
  }
}

export default ErrorRoute;
