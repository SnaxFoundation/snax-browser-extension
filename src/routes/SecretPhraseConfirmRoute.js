import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { NotificationActions } from 'src/store/notifications/NotificationActions';
import { ReduxContainer } from 'src/utils/redux/ReduxContainer';
import { TransactionSelectors } from 'src/store/transaction/TransactionSelectors';
import { WalletActions } from 'src/store/wallet/WalletActions';
import { WalletSelectors } from 'src/store/wallet/WalletSelectors';

import { ClipboardCopier } from '../services/misc/ClipboardCopier';
import { Inject } from '../context/steriotypes/Inject';
import {
  SecondaryInfoBox,
  Anchor,
  Button,
  ButtonRow,
  Content,
  Row,
  Screen,
  ScreenTitle,
  ParagraphBody,
  TextFieldWrapper,
  TextFieldLabel,
  TextFieldMultiline,
} from '../components';

@ReduxContainer(
  [WalletSelectors, TransactionSelectors],
  [WalletActions, NotificationActions]
)
class SecretPhraseConfirmRoute extends Component {
  static propTypes = {
    tryCreateWifFromCandidate: PropTypes.func.isRequired,
    spawnErrorNotification: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    mnemonic: PropTypes.string,
  };

  @Inject(ClipboardCopier) clipboardCopier;

  constructor(props, context) {
    super(props, context);

    this.state = {
      mnemonic: '',
    };
  }

  updateMnemonic = async e => {
    e.preventDefault();
    await this.props.createNewMnemonic();
    this.props.history.push('/secret-phrase');
  };

  render() {
    return (
      <Screen>
        <ScreenTitle>Check secret phrase</ScreenTitle>
        <Row>
          <ParagraphBody>Let's check your secret phrase.</ParagraphBody>
        </Row>
        <Content spread centerY>
          <Row>
            <TextFieldWrapper>
              <TextFieldLabel>Secret phrase</TextFieldLabel>
              <TextFieldMultiline
                type="text"
                placeholder="Enter your 12 word secret phrase"
                onChange={this.handleMnemonicChange}
                rows={3}
                value={this.state.mnemonic}
                data-test-id="secret-phrase-confirm__secret__input-text-field"
              />
            </TextFieldWrapper>
          </Row>
        </Content>

        <ButtonRow>
          <Button
            onClick={this.handleOpenValid}
            spread
            data-test-id="secret-phrase-confirm__actions__open-wallet"
          >
            Open wallet
          </Button>

          <SecondaryInfoBox>
            <Anchor
              colorScheme="flat"
              to="/secret-phrase"
              spread
              onClick={this.updateMnemonic}
              data-test-id="secret-phrase-confirm__actions__generate-new-key"
            >
              Generate new key
            </Anchor>
          </SecondaryInfoBox>
        </ButtonRow>
      </Screen>
    );
  }

  handleMnemonicChange = e => {
    this.setState({
      mnemonic: e.target.value,
    });
  };

  async checkMnemonic() {
    const walletResult = await this.props.tryExtractWalletFromStorage();
    const walletFromMnemonic = await this.props.generateWalletFromMnemonic(
      this.state.mnemonic
    );
    return walletResult.wallet.wif === walletFromMnemonic.wallet.wif;
  }

  handleOpenValid = async e => {
    e.preventDefault();
    const redirectUrl = this.props.isCurrentTransactionActive
      ? '/transaction-sign-request'
      : '/wallet';

    if (await this.checkMnemonic()) {
      this.props.setConfirmed();
      this.props.history.push(redirectUrl);
    } else {
      this.props.spawnErrorNotification('Invalid mnemonic');
    }
  };
}

export default SecretPhraseConfirmRoute;
