import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Inject } from 'src/context/steriotypes/Inject';
import { ClipboardCopier } from 'src/services/misc/ClipboardCopier';
import { NotificationActions } from 'src/store/notifications/NotificationActions';
import { WalletActions } from 'src/store/wallet/WalletActions';
import { WalletSelectors } from 'src/store/wallet/WalletSelectors';
import { ReduxContainer } from 'src/utils/redux/ReduxContainer';
import {
  BrandBox,
  BrandBoxTitle,
  BrandBoxSubtitle,
  Anchor,
  ButtonWithIcon,
  ButtonRow,
  Content,
  IconDownload,
  IconLogOut,
  HeadingSmall,
  ParagraphBody,
  Row,
  Screen,
} from '../components';
@ReduxContainer(WalletSelectors, [NotificationActions, WalletActions])
class WalletRoute extends Component {
  static propTypes = {
    spawnSuccessNotification: PropTypes.func.isRequired,
    clearWallet: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
  };

  @Inject(ClipboardCopier) clipboardCopier;

  handleCopyClick = () => {
    this.clipboardCopier.copy(this.props.publicKey);
    this.props.spawnSuccessNotification(
      'Public key was successfully copied to your clipboard'
    );
  };

  handleLogout = () => {
    this.props.clearPassword();
    this.props.history.push('/password');
  };

  handleExportKey = () => {
    this.props.history.push('/private-export');
  };

  render() {
    return (
      <Screen>
        <BrandBox>
          <BrandBoxTitle>Snax.One</BrandBoxTitle>
          <BrandBoxSubtitle>My public key</BrandBoxSubtitle>
        </BrandBox>
        <Content spread centerY>
          <Row>
            <div>
              <HeadingSmall>Public key</HeadingSmall>
              <ParagraphBody className="word-break">
                {this.props.publicKey}
              </ParagraphBody>
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
              </div>
            </div>
          </Row>
        </Content>
        <ButtonRow
          style={{
            justifyContent: 'space-between',
            marginLeft: '-0.5em',
            marginRight: '-0.5em',
            width: 'calc(100% + 1em)',
            display: 'flex',
          }}
        >
          <ButtonWithIcon
            onClick={this.handleLogout}
            colorScheme="flat"
            icon={<IconLogOut />}
            size="small"
            style={{ textAlign: 'left' }}
            data-test-id="wallet__actions__lock-wallet"
          >
            Lock my wallet
          </ButtonWithIcon>
          <ButtonWithIcon
            icon={<IconDownload />}
            colorScheme="flat"
            size="small"
            as="a"
            onClick={this.handleExportKey}
            data-test-id="wallet__actions__export-private-key"
          >
            Export private key
          </ButtonWithIcon>
        </ButtonRow>
      </Screen>
    );
  }
}

export default WalletRoute;
