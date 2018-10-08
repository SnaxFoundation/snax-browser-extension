import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {WalletActions} from 'src/store/wallet/WalletActions';
import {WalletSelectors} from 'src/store/wallet/WalletSelectors';
import {PasswordValidator} from 'src/utils/PasswordValidator';
import {ReduxContainer} from 'src/utils/redux/ReduxContainer';

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


@ReduxContainer(WalletSelectors, WalletActions)
class NewWalletRoute extends Component {
  
  static propTypes = {
    createWif: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
  };
  
  state = {
    isPasswordVisible: false,
    isInputTouched: false,
    passwordCandidate: '',
  };
  
  render() {
    const validator = new PasswordValidator(this.state.passwordCandidate);
    
    const { isInputTouched } = this.state;
    
    return (
      <Screen>
        <ScreenTitle>New wallet</ScreenTitle>
        <Content spread centerY>
          <Row>
            <TextFieldWrapper>
              <TextFieldLabel error={isInputTouched && !validator.isValid}>Password</TextFieldLabel>
              <TextFieldIconRow>
                <TextField
                  error
                  type={this.state.isPasswordVisible ? 'text' : 'password'}
                  onChange={this.handleInputChange}
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
              <TextFieldMessage error={isInputTouched && !validator.doMoreThan7CharactersExist}>
                <ListUnordered>
                  <li>8 symbols minimum</li>
                </ListUnordered>
              </TextFieldMessage>
              <TextFieldMessage error={isInputTouched && !validator.doUppercaseAndNumberExist}>
                <ListUnordered>
                  <li>at least 1 uppercase letter and 1 number</li>
                </ListUnordered>
              </TextFieldMessage>
              <TextFieldMessage error={isInputTouched && !validator.doOnlyAlphanumericAndSpecialCharactersPresent}>
                <ListUnordered>
                  <li>0-9, a-z, special characters</li>
                </ListUnordered>
              </TextFieldMessage>
            </TextFieldWrapper>
          </Row>
        </Content>
        <ButtonRow>
          <ButtonLink onClick={this.handleCreation} disabled={!validator.isValid} spread to="/secret-phrase">
            Create new wallet
          </ButtonLink>

          <ButtonLink colorScheme="flat" spread to="/">
            Cancel
          </ButtonLink>
        </ButtonRow>
      </Screen>
    );
  }
  
  handleInputChange = (e) => {
    this.setState({
      passwordCandidate: e.target.value,
      isInputTouched: true,
    })
  };
  
  handlePasswordButtonClick = () => {
    this.setState({
      isPasswordVisible: !this.state.isPasswordVisible,
    });
  };
  
  handleCreation = (e) => {
    const {passwordCandidate} = this.state;
    e.preventDefault();
  
    const validator = new PasswordValidator(passwordCandidate);
    
    if (validator.isValid) {
      this.props.createWif(passwordCandidate);
      this.props.history.push('/secret-phrase');
    }
  }
}

export default NewWalletRoute;
