import React, { Component } from 'react';

import {
  ButtonIconOnly,
  ButtonLink,
  ButtonRow,
  Content,
  IconEyeClosed,
  IconEyeOpened,
  Row,
  Screen,
  ScreenTitle,
  TextFieldLabel,
  TextField,
  TextFieldIconRow,
  TextFieldWrapper,
} from '../components';

class PasswordRequestRoute extends Component {
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
        <ScreenTitle>Open wallet</ScreenTitle>
        <Content spread centerY>
          <Row>
            <TextFieldWrapper>
              <TextFieldLabel>Password</TextFieldLabel>
              <TextFieldIconRow>
                <TextField
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
            </TextFieldWrapper>
          </Row>
        </Content>
        <ButtonRow>
          <ButtonLink disabled spread to="/wallet">
            Open wallet
          </ButtonLink>

          <ButtonLink colorScheme="flat" spread to="/">
            Cancel
          </ButtonLink>
        </ButtonRow>
      </Screen>
    );
  }
}

export default PasswordRequestRoute;
