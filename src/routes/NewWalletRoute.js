import React, { Component } from 'react';

import {
  ButtonIconOnly,
  ButtonLink,
  ButtonRow,
  Content,
  IconEyeClosed,
  IconEyeOpened,
  ListUnordered,
  Row,
  Screen,
  ScreenTitle,
  TextField,
  TextFieldLabel,
  TextFieldMessage,
  TextFieldIconRow,
  TextFieldWrapper,
} from '../components';

// TODO Replace ButtonLink with Button after removing link

class NewWalletRoute extends Component {
  state = {
    passwordIsVisible: false,
  };

  onPasswordButtonClick = () => {
    this.setState({
      passwordIsVisible: !this.state.passwordIsVisible,
    });
  };

  render() {
    return (
      <Screen>
        <ScreenTitle>New wallet</ScreenTitle>
        <Content spread centerY>
          <Row>
            <TextFieldWrapper>
              <TextFieldLabel error>Password</TextFieldLabel>
              <TextFieldIconRow>
                <TextField
                  error
                  type={this.state.passwordIsVisible ? 'text' : 'password'}
                />
                <ButtonIconOnly
                  icon={
                    this.state.passwordIsVisible ? (
                      <IconEyeClosed />
                    ) : (
                      <IconEyeOpened />
                    )
                  }
                  colorScheme="flat"
                  onClick={this.onPasswordButtonClick}
                />
              </TextFieldIconRow>
              <TextFieldMessage error>
                <ListUnordered>
                  <li>8 symbols minimum</li>
                </ListUnordered>
              </TextFieldMessage>
              <TextFieldMessage>
                <ListUnordered>
                  <li>at least 1 uppercase letter and 1 number</li>
                </ListUnordered>
              </TextFieldMessage>
              <TextFieldMessage>
                <ListUnordered>
                  <li>0-9, a-z, special characters</li>
                </ListUnordered>
              </TextFieldMessage>
            </TextFieldWrapper>
          </Row>
        </Content>
        <ButtonRow>
          <ButtonLink disabled spread to="/secret-phrase">
            Create new wallet
          </ButtonLink>

          <ButtonLink colorScheme="flat" spread to="/">
            Cancel
          </ButtonLink>
        </ButtonRow>
      </Screen>
    );
  }
}

export default NewWalletRoute;
