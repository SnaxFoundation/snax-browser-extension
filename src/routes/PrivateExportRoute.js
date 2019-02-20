import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Inject } from 'src/context/steriotypes/Inject';
import { ClipboardCopier } from 'src/services/misc/ClipboardCopier';

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
  ParagraphBody2,
  Row,
  Screen,
} from '../components';

class PrivateExportRoute extends Component {
  static propTypes = {
    spawnSuccessNotification: PropTypes.func.isRequired,
  };

  @Inject(ClipboardCopier) clipboardCopier;

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
            onClick={this.handleCopyClick}
            colorScheme="red"
          >
            I understand. Export.
          </ButtonWithIcon>
        </ButtonRow>
      </Screen>
    );
  }

  handleCopyClick = () => {
    this.clipboardCopier.copy(this.props.publicKey);
    this.props.spawnSuccessNotification(
      'Public key was successfully copied to your clipboard'
    );
  };
}

export default PrivateExportRoute;
