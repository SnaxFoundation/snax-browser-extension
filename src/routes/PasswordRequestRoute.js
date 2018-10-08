import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {NotificationActions} from 'src/store/notifications/NotificationActions';
import {WalletActions} from 'src/store/wallet/WalletActions';
import {ReduxContainer} from 'src/utils/redux/ReduxContainer';

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

@ReduxContainer(null, [WalletActions, NotificationActions])
class PasswordRequestRoute extends Component {
  
  static propTypes = {
    spawnErrorNotification: PropTypes.func.isRequired,
    extractWalletFromStorage: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
  };
  
  state = {
    isPasswordVisible: false,
    password: '',
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
                  type={this.state.isPasswordVisible ? 'text' : 'password'}
                  onChange={this.handlePasswordChange}
                />
                <ButtonIconOnly
                  icon={
                    this.state.isPasswordVisible ? (
                      <IconEyeClosed />
                    ) : (
                      <IconEyeOpened />
                    )
                  }
                  colorScheme="flat"
                  onClick={this.handlePasswordButtonClick}
                />
              </TextFieldIconRow>
            </TextFieldWrapper>
          </Row>
        </Content>
        <ButtonRow>
          <ButtonLink onClick={this.handleOpenWalletClick} disabled={!this.isPasswordValid()} spread to="/wallet">
            Open wallet
          </ButtonLink>

          <ButtonLink colorScheme="flat" spread to="/">
            Cancel
          </ButtonLink>
        </ButtonRow>
      </Screen>
    );
  }
  
  handlePasswordButtonClick = () => {
    this.setState({
      isPasswordVisible: !this.state.isPasswordVisible,
    });
  };
  
  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  };
  
  handleOpenWalletClick = (e) => {
    e.preventDefault();
    
    if (this.isPasswordValid()) {
      try {
        this.props.extractWalletFromStorage(this.state.password);
      } catch (e) {
        console.error(e);
        this.props.spawnErrorNotification('Cannot decrypt wallet, please check your password');
        return;
      }
      this.props.history.push('/wallet');
    }
  };
  
  isPasswordValid() {
    return !!this.state.password;
  }
}

export default PasswordRequestRoute;
