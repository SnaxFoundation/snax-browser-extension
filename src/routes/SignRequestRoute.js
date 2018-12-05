import React, { Component } from 'react';

import {
  Button,
  ButtonRow,
  Content,
  ParagraphBody,
  Screen,
  ScreenTitle,
} from '../components';

class SignRequestRoute extends Component {
  render() {
    return (
      <Screen>
        <ScreenTitle>Sign request</ScreenTitle>
        <Content spread centerY className="text-align-center">
          <ParagraphBody>
            <strong>Sign needed</strong>
          </ParagraphBody>
          <ParagraphBody>
            So as to authorize on platform with Snax Wallets we need your
            permission
          </ParagraphBody>
        </Content>
        <ButtonRow>
          <Button spread>Sign</Button>

          <Button colorScheme="flat" spread to="/">
            Cancel
          </Button>
        </ButtonRow>
      </Screen>
    );
  }
}

export default SignRequestRoute;
