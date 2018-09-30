import React, { Component } from 'react';

import {
  ButtonLink,
  ButtonRow,
  Content,
  Row,
  Screen,
  ScreenTitle,
  TextFieldLabel,
  TextFieldMultiline,
  TextFieldWrapper,
} from '../components';

class ImportRoute extends Component {
  render() {
    return (
      <Screen>
        <ScreenTitle>Open wallet</ScreenTitle>
        <Content spread centerY>
          <Row>
            <TextFieldWrapper>
              <TextFieldLabel>Secret phrase</TextFieldLabel>
              <TextFieldMultiline
                type="text"
                placeholder="Enter your 12 word secret phrase to unlock wallet"
              />
            </TextFieldWrapper>
          </Row>
        </Content>
        <ButtonRow>
          <ButtonLink disabled spread to="/wallet">
            Open wallet
          </ButtonLink>
        </ButtonRow>
      </Screen>
    );
  }
}

export default ImportRoute;
