import PropTypes from "prop-types";
import React, { Component } from "react";
import styled from "styled-components";
import { NotificationActions } from "src/store/notifications/NotificationActions";
import { WalletActions } from "src/store/wallet/WalletActions";
import { WalletSelectors } from "src/store/wallet/WalletSelectors";
import { ReduxContainer } from "src/utils/redux/ReduxContainer";

import {
  ButtonLink,
  ButtonRow,
  Content,
  Row,
  Screen,
  ScreenTitle,
  ParagraphBody
} from "../components";

import { SecretWordInput, SecretPhraseWrapper } from "../containers";

// TODO Replace ButtonLink with Button after removing link
//
const CustomizedScreenTitle = styled(ScreenTitle)`
  margin-bottom: 0px;
`;

const CustomizedContent = styled(Content)`
  padding: 0px;
`;

@ReduxContainer(WalletSelectors, [NotificationActions, WalletActions])
class SecretPhraseRoute extends Component {
  static propTypes = {
    spawnSuccessNotification: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    mnemonic: PropTypes.string
  };

  _renderMnemonic() {
    if (!this.props.mnemonic) {
      return [];
    }

    return this.props.mnemonic
      .split(" ")
      .map((item, idx) => (
        <SecretWordInput number={idx + 1} value={item} disabled size="small" />
      ));
  }

  render() {
    const mnemonic = this._renderMnemonic();

    return (
      <Screen>
        <CustomizedScreenTitle>Secret phrase</CustomizedScreenTitle>
        <Row>
          <ParagraphBody>
            This 12 words will help your to restore your wallet. Save it
            somewhere safe and secure.
          </ParagraphBody>
        </Row>
        <CustomizedContent spread centerY>
          <Row>
            <SecretPhraseWrapper>{mnemonic}</SecretPhraseWrapper>
          </Row>
        </CustomizedContent>
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
          <ButtonLink spread to="/confirm-phrase">
            I've saved it
          </ButtonLink>

          <ButtonLink colorScheme="flat" spread to="/">
            Cancel
          </ButtonLink>
        </ButtonRow>
      </Screen>
    );
  }
}

export default SecretPhraseRoute;
