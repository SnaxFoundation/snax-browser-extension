import PropTypes from "prop-types";
import React, { Component } from "react";

import { PasswordValidator } from "src/utils/validators/PasswordValidator";
import { ReduxContainer } from "src/utils/redux/ReduxContainer";
import { WalletActions } from "src/store/wallet/WalletActions";
import { WalletSelectors } from "src/store/wallet/WalletSelectors";

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
  Anchor
} from "../components";
import { Inject } from "../context/steriotypes/Inject";
import { PasswordManager } from "../services/accounts/PasswordManager";

// TODO Replace ButtonLink with Button after removing link

@ReduxContainer(WalletSelectors, WalletActions)
class PasswordCreateRoute extends Component {
  static propTypes = {
    createWifCandidate: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
  };

  state = {
    isPasswordVisible: false,
    isInputTouched: false,
    passwordCandidate: ""
  };

  @Inject(PasswordManager) passwordManager;

  async componentDidMount() {
    const passwordCandidate = await this.passwordManager.getPassword();
    if (passwordCandidate) {
      this.setState({ passwordCandidate });
    }
  }

  isNewWallet = () =>
    this.props.history.location.pathname !== "/import-password";

  render() {
    const validator = new PasswordValidator(this.state.passwordCandidate);

    return (
      <Screen>
        <ScreenTitle>New wallet</ScreenTitle>
        <Content spread centerY>
          <Row>
            <TextFieldWrapper>
              <PasswordField
                error={!validator.isValid}
                onChange={this.handleInputChange}
                value={this.state.passwordCandidate}
              />
              <TextFieldMessage error={!validator.areMoreThan7CharactersUsed}>
                <ListUnordered>
                  <li>8 symbols minimum</li>
                </ListUnordered>
              </TextFieldMessage>
              <TextFieldMessage error={!validator.areUppercaseAndNumberUsed}>
                <ListUnordered>
                  <li>at least 1 uppercase letter and 1 number</li>
                </ListUnordered>
              </TextFieldMessage>
              <TextFieldMessage
                error={!validator.areOnlyAlphanumericAndSpecialCharactersUsed}
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
            disabled={!validator.isValid}
            spread
            to="/secret-phrase"
          >
            {!this.isNewWallet() ? "Import wallet" : "Create new wallet"}
          </ButtonLink>

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

  handleInputChange = e => {
    this.setState({
      passwordCandidate: e.target.value
    });
  };

  handleCreation = async e => {
    const { passwordCandidate } = this.state;
    e.preventDefault();

    const validator = new PasswordValidator(passwordCandidate);

    if (validator.isValid) {
      if (this.isNewWallet()) {
        await this.props.createWifCandidate(passwordCandidate);
        this.props.history.push("/secret-phrase");
      } else {
        await this.props.setPassword(passwordCandidate);
        this.props.history.push("/import-wallet");
      }
    }
  };
}

export default PasswordCreateRoute;
