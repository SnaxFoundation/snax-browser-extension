import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';
import { NotificationActions } from 'src/store/notifications/NotificationActions';
import { WalletActions } from 'src/store/wallet/WalletActions';
import { WalletSelectors } from 'src/store/wallet/WalletSelectors';
import { ReduxContainer } from 'src/utils/redux/ReduxContainer';

import {
  Anchor,
  ButtonLink,
  ButtonRow,
  Content,
  Row,
  Screen,
  ScreenTitle,
  ParagraphBody,
  SecondaryInfoBox,
  TextFieldWrapper,
  TextFieldLabel,
  TextFieldMultiline,
} from '../components';

import { SecretWordInput, SecretPhraseWrapper } from '../containers';

// TODO Replace ButtonLink with Button after removing link
//

@ReduxContainer(WalletSelectors, [NotificationActions, WalletActions])
class SecretPhraseRoute extends Component {
  static propTypes = {
    spawnSuccessNotification: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    mnemonic: PropTypes.string,
  };

  _renderMnemonic() {
    if (!this.props.mnemonic) {
      return [];
    }

    // return this.props.mnemonic
    //   .split(' ')
    //   .map((item, idx) => (
    //     <SecretWordInput number={idx + 1} value={item} disabled size="small" />
    //   ));

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
          style={{ textDecoration: 'none' }}
        >
          <span onClick={this.handleCopyClick} className="dashed">
            Copy
          </span>
        </Anchor>
      </div>,
    ];
  }

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
          <ButtonLink spread to="/confirm-phrase">
            I've saved it
          </ButtonLink>

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
