import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {NotificationActions} from 'src/store/notifications/NotificationActions';
import {TransactionSelectors} from 'src/store/transaction/TransactionSelectors';
import {WalletActions} from 'src/store/wallet/WalletActions';
import {WalletSelectors} from 'src/store/wallet/WalletSelectors';
import {ReduxContainer} from 'src/utils/redux/ReduxContainer';

import {
  ButtonLink,
  ButtonRow,
  Content, PasswordField,
  Row,
  Screen,
  ScreenTitle,
  TextFieldLabel,
  TextFieldMultiline,
  TextFieldWrapper,
} from '../components';

@ReduxContainer([WalletSelectors, TransactionSelectors], [WalletActions, NotificationActions])
class ImportRoute extends Component {
  
  static propTypes = {
    spawnErrorNotification: PropTypes.func.isRequired,
    tryCreateWalletByMnemonic: PropTypes.func.isRequired,
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
              <PasswordField onChange={this.handlePasswordChange}/>
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
  
  handleContinueClick = async (e) => {
    e.preventDefault();
  
    const redirectUrl = this.props.isCurrentTransactionActive
      ? '/transaction-sign-request'
      : '/wallet';
    
    if (this.arePasswordAndMnemonicValid()) {
      const result = await this.props.tryCreateWalletByMnemonic(this.state.mnemonic, this.state.password);
      if (result.isCreationSucceed) {
        this.props.history.push(redirectUrl);
      } else {
        this.props.spawnErrorNotification('Recovering failed, please check you password');
      }
    }
  };
  
  arePasswordAndMnemonicValid() {
    return this.state.mnemonic && this.state.password;
  }
}


export default ImportRoute;
