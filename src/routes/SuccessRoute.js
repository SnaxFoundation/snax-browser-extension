import React, { Component } from 'react';

import {
  Content,
  Success,
  Screen,
  ParagraphBody2,
  Button,
  ButtonRow,
} from '../components';

class SuccessRoute extends Component {
  render() {
    return (
      <Screen>
        <Content spread centerY>
          <Success title="Success!">
            <ParagraphBody2>Transaction was sucessfuly sent</ParagraphBody2>
          </Success>
        </Content>
        <ButtonRow>
          <Button>Back to wallet</Button>
        </ButtonRow>
      </Screen>
    );
  }
}

export default SuccessRoute;
