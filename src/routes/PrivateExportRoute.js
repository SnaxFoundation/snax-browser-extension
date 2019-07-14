import React, { Component } from 'react';
import PropTypes from 'prop-types';
import QRCode from 'qrcode.react';

import { Inject } from 'src/context/steriotypes/Inject';
import { ClipboardCopier } from 'src/services/misc/ClipboardCopier';
import { ReduxContainer } from 'src/utils/redux/ReduxContainer';
import { WalletActions } from 'src/store/wallet/WalletActions';
import { WalletSelectors } from 'src/store/wallet/WalletSelectors';
import { NotificationActions } from 'src/store/notifications/NotificationActions';
import styleConstants from 'src/styles/style-constants';

import {
  BrandBox,
  BrandBoxTitle,
  BrandBoxSubtitle,
  Anchor,
  ButtonWithIcon,
  ButtonRow,
  Content,
  IconCopy,
  SecondaryInfoBox,
  ParagraphBody,
  ParagraphBody2,
  ParagraphCaption,
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
      'Private key was successfully copied to your clipboard.'
    );
  };

  render() {
    const { privateKey } = this.state;

    return (
      <Screen>
        <BrandBox>
          <BrandBoxTitle>Snax.One</BrandBoxTitle>
          <BrandBoxSubtitle>wallet</BrandBoxSubtitle>
        </BrandBox>
        <Content
          style={{
            backgroundColor: styleConstants.color.red,
            color: '#fff',
            marginLeft: '-15px',
            marginRight: '-15px',
            padding: '10px 15px',
            width: 'calc(100% + 30px)',
          }}
        >
          <Row>
            <ParagraphBody2 style={{ fontSize: '13px', width: '100%' }}>
              Warning! Don't export your private key, if you don't understand,
              what you are doing! Don't send your private key to anyone, you can
              lose all your tokens!
            </ParagraphBody2>
          </Row>
        </Content>
        <Content
          spread
          centerY
          style={{ textAlign: 'center', paddingBottom: 0 }}
        >
          {privateKey && (
            <>
              <Row style={{ flexDirection: 'column' }}>
                <ParagraphCaption
                  style={{
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                    marginBottom: 0,
                  }}
                >
                  To export private key
                </ParagraphCaption>
                <ParagraphBody2>Scan QR code</ParagraphBody2>
              </Row>
              <Row style={{ display: 'flex', justifyContent: 'center' }}>
                <div
                  style={{
                    border: '5px solid #fff',
                    width: 'auto',
                    display: 'flex',
                  }}
                >
                  <QRCode value={privateKey} />
                </div>
              </Row>
              <Row
                style={{
                  justifyContent: 'center',
                  marginTop: '15px',
                  marginBottom: '-10px',
                }}
              >
                <ParagraphCaption>or</ParagraphCaption>
              </Row>
            </>
          )}
          <Row style={{ justifyContent: 'center' }}>
            <ButtonWithIcon
              icon={<IconCopy outlined />}
              colorScheme="flat"
              onClick={this.copyToClipboard}
              data-test-id="export-private__actions__handle-export"
            >
              Copy to clipboard
            </ButtonWithIcon>
          </Row>
        </Content>
        <ButtonRow style={{ marginTop: 0 }}>
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
