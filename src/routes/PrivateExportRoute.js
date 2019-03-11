import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Inject } from 'src/context/steriotypes/Inject';
import { ClipboardCopier } from 'src/services/misc/ClipboardCopier';
import { ReduxContainer } from "src/utils/redux/ReduxContainer";
import { WalletActions } from "src/store/wallet/WalletActions";
import { WalletSelectors } from "src/store/wallet/WalletSelectors";
import { NotificationActions } from "src/store/notifications/NotificationActions";

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

  @Inject(ClipboardCopier) clipboardCopier;

  handleExport = async () => {
    const privateKey = await this.props.getWifFromStorage();
    this.clipboardCopier.copy(privateKey);

    this.props.spawnSuccessNotification(
      "Private key was successfully copied to your clipboard"
    );
  }

  render() {
    return (
      <Screen>
        <BrandBox>
          <BrandBoxTitle>Snax</BrandBoxTitle>
          <BrandBoxSubtitle>wallet</BrandBoxSubtitle>
        </BrandBox>
        <Content spread centerY>
          <Row>
            <ParagraphBody2 style={{ textAlign: 'center', width: '100%' }}>
              Warning! Don't export your private key, if you don't understand,
              what you are doing! Don't send your private key to anyone, you can
              lose all your tokens!
            </ParagraphBody2>
          </Row>
        </Content>
        <ButtonRow>
          <ButtonWithIcon
            icon={<IconDownload />}
            colorScheme="red"
            onClick={this.handleExport}
          >
            I understand. Export.
          </ButtonWithIcon>
          <SecondaryInfoBox>
            <Anchor spread to="/wallet">
              Back
            </Anchor>
          </SecondaryInfoBox>
        </ButtonRow>
      </Screen>
    );
  }
}

export default PrivateExportRoute;
