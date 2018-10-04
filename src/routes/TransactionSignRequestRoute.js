import React, { Component } from 'react';

import {
  Button,
  ButtonRow,
  Content,
  ParagraphError,
  Row,
  Screen,
  ScreenTitle,
} from '../components';

import { TransactionAmount, TransactionRecipient } from '../containers';

class TransactionSignRequestRoute extends Component {
  render() {
    const error = (
      <Row>
        <ParagraphError>Not enought tokens</ParagraphError>
      </Row>
    );

    return (
      <Screen>
        <ScreenTitle>Transaction request</ScreenTitle>
        <Content spread>
          <Row>
            <TransactionAmount amount={458} />
          </Row>
          <Row>
            <TransactionRecipient type="twitter" name="fluffystuff19" />
          </Row>
          {error}
        </Content>
        <ButtonRow>
          <Button spread disabled>
            Confirm
          </Button>

          <Button colorScheme="flat" spread to="/">
            Cancel
          </Button>
        </ButtonRow>
      </Screen>
    );
  }
}

export default TransactionSignRequestRoute;
