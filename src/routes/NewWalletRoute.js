import React, { Component } from "react";
import PropTypes from "prop-types";
import { WalletActions } from "src/store/wallet/WalletActions";
import { WalletSelectors } from "src/store/wallet/WalletSelectors";
import { PasswordValidator } from "src/utils/validators/PasswordValidator";
import { ReduxContainer } from "src/utils/redux/ReduxContainer";

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
  PasswordField
} from "../components";

// TODO Replace ButtonLink with Button after removing link

@ReduxContainer(WalletSelectors, WalletActions)
class NewWalletRoute extends Component {
  static propTypes = {
    createWifCandidate: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
  };

  state = {
    isPasswordVisible: false,
    isInputTouched: false,
    passwordCandidate: ""
  };

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
                value="Brave_new_world12"
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
            Create new wallet
          </ButtonLink>

          <ButtonLink colorScheme="flat" spread to="/">
            Cancel
          </ButtonLink>
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
      await this.props.createWifCandidate(passwordCandidate);
      this.props.history.push("/secret-phrase");
    }
  };
}

export default NewWalletRoute;
