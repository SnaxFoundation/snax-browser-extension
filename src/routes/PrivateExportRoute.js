import React, { Component } from 'react';
import PropTypes from 'prop-types';
import QRCode from 'qrcode.react';

import { Inject } from 'src/context/steriotypes/Inject';
import { ClipboardCopier } from 'src/services/misc/ClipboardCopier';
import { ReduxContainer } from 'src/utils/redux/ReduxContainer';
import { WalletActions } from 'src/store/wallet/WalletActions';
import { WalletSelectors } from 'src/store/wallet/WalletSelectors';
import { NotificationActions } from 'src/store/notifications/NotificationActions';

import {
  BrandBox,
  BrandBoxTitle,
  BrandBoxSubtitle,
  Anchor,
  ButtonWithIcon,
  ButtonRow,
  Content,
  IconDownload,
  SecondaryInfoBox,
  ParagraphBody2,
  Row,
  Screen,
} from '../components';

@ReduxContainer(WalletSelectors, [NotificationActions, WalletActions])
class PrivateExportRoute extends Component {
  static propTypes = {
    spawnSuccessNotification: PropTypes.func.isRequired,
  };

  state = {
    privateKey: null,
  };

  componentDidMount() {
    this.setPrivateKey();
  }

  async setPrivateKey() {
    const privateKey = await this.props.getWifFromStorage();
    this.setState({ privateKey });
  }

  @Inject(ClipboardCopier) clipboardCopier;

  copyToClipboard = async () => {
    this.clipboardCopier.copy(this.state.privateKey);
    this.props.spawnSuccessNotification(
      'Private key was successfully copied to your clipboard'
    );
  };

  render() {
    const { privateKey } = this.state;

    return (
      <Screen>
        <BrandBox>
          <BrandBoxTitle>Snax</BrandBoxTitle>
          <BrandBoxSubtitle>wallet</BrandBoxSubtitle>
        </BrandBox>
        <Content spread centerY>
          <Row>
            {privateKey && <QRCode value={privateKey} />}
            {/* <ParagraphBody2 style={{ textAlign: 'center', width: '100%' }}>
              Warning! Don't export your private key, if you don't understand,
              what you are doing! Don't send your private key to anyone, you can
              lose all your tokens!
            </ParagraphBody2> */}
          </Row>
        </Content>
        <ButtonRow>
          <ButtonWithIcon
            icon={<IconDownload />}
            colorScheme="red"
            onClick={this.copyToClipboard}
            data-test-id="export-private__actions__handle-export"
          >
            Copy to clipboard
          </ButtonWithIcon>
          <SecondaryInfoBox>
            <Anchor
              spread
              to="/wallet"
              data-test-id="export-private__actions__back"
            >
              Back
            </Anchor>
          </SecondaryInfoBox>
        </ButtonRow>
      </Screen>
    );
  }
}

export default PrivateExportRoute;
