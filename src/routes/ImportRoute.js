import React, { Component } from "react";
import PropTypes from "prop-types";
import { NotificationActions } from "src/store/notifications/NotificationActions";
import { TransactionSelectors } from "src/store/transaction/TransactionSelectors";
import { WalletActions } from "src/store/wallet/WalletActions";
import { WalletSelectors } from "src/store/wallet/WalletSelectors";
import { ReduxContainer } from "src/utils/redux/ReduxContainer";

import {
  ButtonLink,
  Button,
  ButtonRow,
  Content,
  Row,
  Screen,
  ScreenTitle,
  TextFieldLabel,
  TextFieldMultiline,
  TextFieldWrapper
} from "../components";

@ReduxContainer(
  [WalletSelectors, TransactionSelectors],
  [WalletActions, NotificationActions]
)
class ImportRoute extends Component {
  static propTypes = {
    spawnErrorNotification: PropTypes.func.isRequired,
    tryCreateWalletByMnemonic: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
  };

  state = {
    mnemonic: ""
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
        </Content>
        <ButtonRow>
          <Button
            onClick={this.handleContinueClick}
            disabled={!this.isMnemonicValid()}
            spread
          >
            Continue
          </Button>
          <ButtonLink colorScheme="flat" spread to="/">
            Cancel
          </ButtonLink>
        </ButtonRow>
      </Screen>
    );
  }

  handleMnemonicChange = e => {
    this.setState({
      mnemonic: e.target.value
    });
  };

  handleContinueClick = async e => {
    e.preventDefault();

    if (this.isMnemonicValid()) {
      const result = await this.props.tryCreateWalletByMnemonic(
        this.state.mnemonic
      );
      if (result.isCreationSucceed) {
        await this.props.setPassword("");
        this.props.history.push("/new-wallet");
      } else {
        this.props.spawnErrorNotification("Recovering failed");
      }
    }
  };

  isMnemonicValid() {
    return this.state.mnemonic && this.state.mnemonic.split(" ").length === 12;
  }
}

export default ImportRoute;
