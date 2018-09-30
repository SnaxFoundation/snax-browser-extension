import React, { Component } from 'react';

import {
  ButtonLink,
  ButtonRow,
  Content,
  ListUnordered,
  Row,
  Screen,
  ScreenTitle,
  TextField,
  TextFieldLabel,
  TextFieldMessage,
  TextFieldWrapper,
} from '../components';

// TODO Replace ButtonLink with Button after removing link

class NewWalletRoute extends Component {
  render() {
    return (
      <Screen>
        <ScreenTitle>New wallet</ScreenTitle>
        <Content spread centerY>
          <Row>
            <TextFieldWrapper>
              <TextFieldLabel error>Password</TextFieldLabel>
              <TextField error type="password" />
              <TextFieldMessage error>Password is too weak</TextFieldMessage>
              <TextFieldMessage>
                <ListUnordered>
                  <li>8 symbols minimum</li>
                  <li>at least 1 uppercase letter and 1 number</li>
                  <li>latin letters only</li>
                </ListUnordered>
              </TextFieldMessage>
            </TextFieldWrapper>
          </Row>
          <Row>
            <TextFieldWrapper>
              <TextFieldLabel>Repeat password</TextFieldLabel>
              <TextField type="password" />
            </TextFieldWrapper>
          </Row>
        </Content>
        <ButtonRow>
          <ButtonLink disabled spread to="/secret-phrase">
            Create new wallet
          </ButtonLink>
        </ButtonRow>
      </Screen>
    );
  }
}

export default NewWalletRoute;
