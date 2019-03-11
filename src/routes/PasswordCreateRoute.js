import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { PasswordValidator } from 'src/utils/validators/PasswordValidator';
import { ReduxContainer } from 'src/utils/redux/ReduxContainer';
import { WalletActions } from 'src/store/wallet/WalletActions';
import { WalletSelectors } from 'src/store/wallet/WalletSelectors';

import {
  Button,
  ButtonRow,
  Content,
  ListUnordered,
  Row,
  Screen,
  ScreenTitle,
  TextFieldMessage,
  TextFieldWrapper,
  PasswordField,
  SecondaryInfoBox,
  Anchor,
} from '../components';
import { Inject } from '../context/steriotypes/Inject';
import { PasswordManager } from '../services/accounts/PasswordManager';

@ReduxContainer(WalletSelectors, WalletActions)
class PasswordCreateRoute extends Component {
  static propTypes = {
    createWifCandidate: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
  };

  state = {
    isPasswordVisible: false,
    isInputTouched: false,
    passwordCandidate: '',
    passwordError: false,
  };

  @Inject(PasswordManager) passwordManager;

  async componentDidMount() {
    const passwordCandidate = await this.passwordManager.getPassword();
    if (passwordCandidate) {
      this.setState({ passwordCandidate });
    }
  }

  isNewWallet = () =>
    this.props.history.location.pathname !== '/import-password';

  handleInputChange = e => {
    const { value } = e.target;
    const {
      areOnlyAlphanumericAndSpecialCharactersUsed,
    } = new PasswordValidator(value);

    if (value.length === 0 || areOnlyAlphanumericAndSpecialCharactersUsed) {
      this.setState({
        passwordCandidate: value,
        passwordError: false,
      });
    } else {
      this.setState({ passwordError: true });
    }
  };

  handleCreation = async e => {
    const { passwordCandidate } = this.state;
    e.preventDefault();

    const validator = new PasswordValidator(passwordCandidate);

    if (validator.isValid) {
      if (this.isNewWallet()) {
        await this.props.createWifCandidate(passwordCandidate);
        this.props.history.push('/secret-phrase');
      } else {
        await this.props.setPassword(passwordCandidate);
        this.props.history.push('/import-wallet');
      }
    }
  };

  render() {
    const {
      isValid,
      areMoreThan7CharactersUsed,
      areOnlyAlphanumericAndSpecialCharactersUsed,
      areAtLeastOneUppercaseAndNumberOrCharacter,
    } = new PasswordValidator(this.state.passwordCandidate);

    return (
      <Screen>
        <ScreenTitle>New wallet</ScreenTitle>
        <Content spread centerY>
          <Row>
            <TextFieldWrapper>
              <PasswordField
                onChange={this.handleInputChange}
                value={this.state.passwordCandidate}
              />
              <TextFieldMessage filled={areMoreThan7CharactersUsed}>
                <ListUnordered>
                  <li>8 symbols minimum</li>
                </ListUnordered>
              </TextFieldMessage>
              <TextFieldMessage
                filled={areAtLeastOneUppercaseAndNumberOrCharacter}
              >
                <ListUnordered>
                  <li>
                    at least 1 lowercase, 1 uppercase letter and 1 number or
                    special character
                  </li>
                </ListUnordered>
              </TextFieldMessage>
              <TextFieldMessage
                error={this.state.passwordError}
                filled={areOnlyAlphanumericAndSpecialCharactersUsed}
              >
                <ListUnordered>
                  <li>only 0-9, A-Z, a-z, special characters are allowed</li>
                </ListUnordered>
              </TextFieldMessage>
            </TextFieldWrapper>
          </Row>
        </Content>
        <ButtonRow>
          <Button
            onClick={this.handleCreation}
            disabled={!isValid}
            spread
            to="/secret-phrase"
            as={Link}
            data-test-id="password-create__create-wallet__button"
          >
            {!this.isNewWallet() ? 'Import wallet' : 'Create new wallet'}
          </Button>

          <SecondaryInfoBox>
            <Anchor
              colorScheme="flat"
              spread
              to="/"
              onClick={this.props.clearPassword}
            >
              Back
            </Anchor>
          </SecondaryInfoBox>
        </ButtonRow>
      </Screen>
    );
  }
}

export default PasswordCreateRoute;
