import PropTypes from "prop-types";
import React, { Component } from "react";

import { NotificationActions } from "src/store/notifications/NotificationActions";
import { ReduxContainer } from "src/utils/redux/ReduxContainer";
import { WalletActions } from "src/store/wallet/WalletActions";
import { WalletSelectors } from "src/store/wallet/WalletSelectors";

import {
  Anchor,
  Button,
  ButtonRow,
  Content,
  Row,
  Screen,
  ScreenTitle,
  ParagraphBody,
  SecondaryInfoBox,
  TextFieldLabel,
  TextFieldMultiline
} from "../components";
import { ClipboardCopier } from "../services/misc/ClipboardCopier";
import { Inject } from "../context/steriotypes/Inject";
import { SecretPhraseWrapper } from "../containers";

@ReduxContainer(WalletSelectors, [NotificationActions, WalletActions])
class SecretPhraseRoute extends Component {
  static propTypes = {
    spawnSuccessNotification: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    mnemonic: PropTypes.string
  };

  @Inject(ClipboardCopier) clipboardCopier;

  handleCopyClick = () => {
    this.clipboardCopier.copy(this.props.mnemonic);
    this.props.spawnSuccessNotification(
      "Mnemonic was successfully copied to your clipboard"
    );
  };

  _renderMnemonic() {
    if (!this.props.mnemonic) {
      return [];
    }
    return [
      <div>
        <TextFieldLabel>Secret phrase</TextFieldLabel>
        <TextFieldMultiline
          type="text"
          disabled
          value={this.props.mnemonic}
          rows={3}
        />
      </div>,
      <div className="text-align-right">
        <Anchor
          as="button"
          colorScheme="flat"
          size="small"
          style={{ textDecoration: "none" }}
        >
          <span onClick={this.handleCopyClick} className="dashed">
            Copy
          </span>
        </Anchor>
      </div>
    ];
  }

  updateWallet = async e => {
    e.preventDefault();
    await this.props.tryCreateWifFromCandidate(this.props.mnemonic);
    this.props.history.push("/confirm-phrase");
  };

  render() {
    const mnemonic = this._renderMnemonic();

    return (
      <Screen>
        <ScreenTitle>Secret phrase</ScreenTitle>
        <Row>
          <ParagraphBody>
            This 12 words will help your to restore your wallet. Save it
            somewhere safe and secure.
          </ParagraphBody>
        </Row>
        <Content spread centerY>
          <Row>
            <SecretPhraseWrapper>{mnemonic}</SecretPhraseWrapper>
          </Row>
        </Content>
        <Row className="text-align-center">
          <div>
            <ParagraphBody>
              <strong>Do not lose it!</strong>
            </ParagraphBody>
            <ParagraphBody>
              Your key cannot be recovered if you lose it. Treat it like a bank
              account.
            </ParagraphBody>
          </div>
        </Row>
        <ButtonRow>
          <Button spread onClick={this.updateWallet}>
            I've saved it
          </Button>

          <SecondaryInfoBox>
            <Anchor spread to="/new-wallet">
              Back
            </Anchor>
          </SecondaryInfoBox>
        </ButtonRow>
      </Screen>
    );
  }
}

export default SecretPhraseRoute;
