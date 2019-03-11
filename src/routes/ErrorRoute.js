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
  render() {
    return (
      <Screen>
        <Content spread centerY>
          <Error title="502">
            <ParagraphBody2>error text</ParagraphBody2>
          </Error>
        </Content>
        {/* <ButtonRow>
          <Button>Back to wallet</Button>
        </ButtonRow> */}
      </Screen>
    );
  }
}

export default ErrorRoute;
