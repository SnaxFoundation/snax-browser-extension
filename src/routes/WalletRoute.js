import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Inject} from 'src/context/steriotypes/Inject';
import {ClipboardCopier} from 'src/services/misc/ClipboardCopier';
import {NotificationActions} from 'src/store/notifications/NotificationActions';
import {WalletActions} from 'src/store/wallet/WalletActions';
import {WalletSelectors} from 'src/store/wallet/WalletSelectors';
import {ReduxContainer} from 'src/utils/redux/ReduxContainer';
import {
  BrandBox,
  BrandBoxTitle,
  BrandBoxSubtitle,
  Button,
  ButtonIconOnly,
  ButtonRow,
  Content,
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
    clearWallet:  PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
  };
  
  @Inject(ClipboardCopier)
  clipboardCopier;
  
  render() {
    return (
      <Screen>
        <BrandBox>
          <BrandBoxTitle>Mints</BrandBoxTitle>
          <BrandBoxSubtitle>wallet</BrandBoxSubtitle>
        </BrandBox>
        <Content spread centerY>
          <Row>
            <div>
              <HeadingSmall>Wallet</HeadingSmall>
              <ParagraphBody className="word-break">
                {this.props.publicKey}
              </ParagraphBody>
              <div className="text-align-right">
                <Button colorScheme="flat" size="small">
                  <span onClick={this.handleCopyClick} className="dashed">Copy</span>
                </Button>
              </div>
            </div>
          </Row>
        </Content>
        <ButtonRow>
          <ButtonIconOnly onClick={this.handleLogout} colorScheme="flat" icon={<IconLogOut />} />
        </ButtonRow>

        {/* <LoaderBox>Loading</LoaderBox> */}
      </Screen>
    );
  }
  
  handleCopyClick = () => {
    this.clipboardCopier.copy(this.props.publicKey);
    this.props.spawnSuccessNotification("Public key was successfully copied to your clipboard");
  };
  
  handleLogout = () => {
    this.props.clearWallet();
    this.props.history.push('/');
  }
}

export default WalletRoute;
