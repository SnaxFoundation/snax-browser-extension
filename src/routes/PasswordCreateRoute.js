import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { WalletActions } from 'src/store/wallet/WalletActions';
import { WalletSelectors } from 'src/store/wallet/WalletSelectors';
import { PasswordValidator } from 'src/utils/validators/PasswordValidator';
import { ReduxContainer } from 'src/utils/redux/ReduxContainer';

import {
  ButtonLink,
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

// TODO Replace ButtonLink with Button after removing link

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
  };

  render() {
    const {
      isEmpty,
      isValid,
      areMoreThan7CharactersUsed,
      areUppercaseAndNumberUsed,
      areOnlyAlphanumericAndSpecialCharactersUsed,
    } = new PasswordValidator(this.state.passwordCandidate);

    return (
      <Screen>
        <ScreenTitle>New wallet</ScreenTitle>
        <Content spread centerY>
          <Row>
            <TextFieldWrapper>
              <PasswordField
                error={!isEmpty && !isValid}
                onChange={this.handleInputChange}
              />
              <TextFieldMessage filled={!isEmpty && areMoreThan7CharactersUsed}>
                <ListUnordered>
                  <li>8 symbols minimum</li>
                </ListUnordered>
              </TextFieldMessage>
              <TextFieldMessage filled={!isEmpty && areUppercaseAndNumberUsed}>
                <ListUnordered>
                  <li>at least 1 uppercase letter and 1 number</li>
                </ListUnordered>
              </TextFieldMessage>
              <TextFieldMessage
                filled={!isEmpty && areOnlyAlphanumericAndSpecialCharactersUsed}
              >
                <ListUnordered>
                  <li>0-9, a-z, special characters</li>
                </ListUnordered>
              </TextFieldMessage>
            </TextFieldWrapper>
          </Row>
        </Content>
        <ButtonRow>
          <ButtonLink
            onClick={this.handleCreation}
            disabled={!isValid}
            spread
            to="/secret-phrase"
          >
            {this.props.publicKey ? 'Import wallet' : 'Create new wallet'}
          </ButtonLink>

          <SecondaryInfoBox>
            <Anchor colorScheme="flat" spread to="/">
              Back
            </Anchor>
          </SecondaryInfoBox>
        </ButtonRow>
      </Screen>
    );
  }

  handleInputChange = e => {
    this.setState({
      passwordCandidate: e.target.value,
    });
  };

  handleCreation = async e => {
    const { passwordCandidate } = this.state;
    const { publicKey } = this.props;
    e.preventDefault();

    const validator = new PasswordValidator(passwordCandidate);

    if (validator.isValid) {
      if (!publicKey) {
        await this.props.createWifCandidate(passwordCandidate);
        this.props.history.push('/secret-phrase');
      } else {
        await this.props.setPassword(passwordCandidate);
        const redirectUrl = this.props.isCurrentTransactionActive
          ? '/transaction-sign-request'
          : '/wallet';
        this.props.history.push(redirectUrl);
      }
    }
  };
}

export default PasswordCreateRoute;
