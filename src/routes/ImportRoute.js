import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {ButtonIconOnly} from 'src/components/Button';
import {IconEyeClosed, IconEyeOpened} from 'src/components/Icon';
import {TextField, TextFieldIconRow} from 'src/components/TextField';
import {NotificationActions} from 'src/store/notifications/NotificationActions';
import {WalletActions} from 'src/store/wallet/WalletActions';
import {WalletSelectors} from 'src/store/wallet/WalletSelectors';
import {ReduxContainer} from 'src/utils/redux/ReduxContainer';

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

@ReduxContainer(WalletSelectors, [WalletActions, NotificationActions])
class ImportRoute extends Component {
  
  static propTypes = {
    spawnErrorNotification: PropTypes.func.isRequired,
    recoverWifByMnemonic: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
  };
  
  state = {
    password: '',
    mnemonic: '',
  };
  
  render() {
    return (
      <Screen>
        <ScreenTitle>Import wallet</ScreenTitle>
        <Content spread centerY>
          <Row>
            <TextFieldWrapper>
              <TextFieldLabel>Secret phrase</TextFieldLabel>
              <TextFieldMultiline
                type="text"
                placeholder="Enter your 12 word secret phrase to unlock wallet"
                onChange={this.handleMnemonicChange}
                rows={3}
              />
            </TextFieldWrapper>
          </Row>
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
          <ButtonLink onClick={this.handleContinueClick} disabled={!this.arePasswordAndMnemonicValid()} spread to="/password">
            Continue
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
      passwordIsVisible: !this.state.passwordIsVisible,
    });
  };
  
  handlePasswordChange = (e) => {
    this.setState({
        password: e.target.value,
    });
  };
  
  handleMnemonicChange = (e) => {
    this.setState({
      mnemonic: e.target.value,
    });
  };
  
  handleContinueClick = (e) => {
    e.preventDefault();
    
    if (this.arePasswordAndMnemonicValid()) {
      try {
        this.props.recoverWifByMnemonic(this.state.mnemonic, this.state.password);
      } catch (e) {
        console.error(e);
        this.props.spawnErrorNotification('Recovering failed, please check you password');
        return;
      }
      
      this.props.history.push('/wallet');
    }
  };
  
  arePasswordAndMnemonicValid() {
    return this.state.mnemonic && this.state.password;
  }
}


export default ImportRoute;
