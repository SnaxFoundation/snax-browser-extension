import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';

import { NotificationActions } from 'src/store/notifications/NotificationActions';
import { ReduxContainer } from 'src/utils/redux/ReduxContainer';
import { WalletActions } from 'src/store/wallet/WalletActions';
import { WalletSelectors } from 'src/store/wallet/WalletSelectors';

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
  TextFieldMultiline,
} from '../components';
import { ClipboardCopier } from '../services/misc/ClipboardCopier';
import { Inject } from '../context/steriotypes/Inject';
import { SecretPhraseWrapper } from '../containers';

const Emph = styled.strong`
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #f96060;
`;
@ReduxContainer(WalletSelectors, [NotificationActions, WalletActions])
class SecretPhraseRoute extends Component {
  static propTypes = {
    spawnSuccessNotification: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    mnemonic: PropTypes.string,
  };

  @Inject(ClipboardCopier) clipboardCopier;

  handleCopyClick = () => {
    this.clipboardCopier.copy(this.props.mnemonic);
    this.props.spawnSuccessNotification(
      'Mnemonic was successfully copied to your clipboard'
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
          data-test-id="secret-phrase__secret__text-field"
        />
      </div>,
      <div className="text-align-right">
        <Anchor
          as="button"
          colorScheme="flat"
          size="small"
          style={{ textDecoration: 'none' }}
          data-test-id="secret-phrase__secret__copy-button"
        >
          <span onClick={this.handleCopyClick} className="dashed">
            Copy
          </span>
        </Anchor>
      </div>,
    ];
  }

  async componentDidMount() {
    await this.props.tryCreateWifFromCandidate(this.props.mnemonic);
    this.props.setConfirmed(false);
  }

  updateWallet = async e => {
    e.preventDefault();
    this.props.history.push('/confirm-phrase');
  };

  render() {
    const mnemonic = this._renderMnemonic();

    return (
      <Screen>
        <ScreenTitle>Secret phrase</ScreenTitle>
        <Row style={{ flexDirection: 'column' }}>
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
              <Emph>Do not lose it!</Emph>
            </ParagraphBody>
            <ParagraphBody>
              Your key cannot be recovered if you lose it. Treat it like a bank
              account.
            </ParagraphBody>
            <ParagraphBody style={{ marginTop: '0.5em' }}>
              <Emph>Warning!</Emph>
            </ParagraphBody>
            <ParagraphBody>
              Your clipboard will be cleared after secret phrase confirmation!
            </ParagraphBody>
          </div>
        </Row>
        <ButtonRow>
          <Button
            spread
            onClick={this.updateWallet}
            data-test-id="secret-phrase__actions__confirm-button"
          >
            I've saved it
          </Button>

          <SecondaryInfoBox>
            <Anchor
              spread
              to="/new-wallet"
              data-test-id="secret-phrase__actions__back-button"
            >
              Back
            </Anchor>
          </SecondaryInfoBox>
        </ButtonRow>
      </Screen>
    );
  }
}

export default SecretPhraseRoute;
