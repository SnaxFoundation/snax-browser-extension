import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {Alert, AlertWrapper} from 'src/components/Alerts';
import {HiddenTextArea} from 'src/components/HiddenInput';
import {Inject} from 'src/context/steriotypes/Inject';
import {ClipboardCopier} from 'src/services/misc/ClipboardCopier';
import {NotificationActions} from 'src/store/notifications/NotificationActions';
import {NotificationSelectors} from 'src/store/notifications/NotificationSelectors';
import {WalletSelectors} from 'src/store/wallet/WalletSelectors';
import {ReduxContainer} from 'src/utils/redux/ReduxContainer';

import {
  Button,
  ButtonLink,
  ButtonRow,
  Content,
  Row,
  Screen,
  ScreenTitle,
  TextFieldMultiline,
  TextFieldWrapper,
  ParagraphBody,
} from '../components';

// TODO Replace ButtonLink with Button after removing link

@ReduxContainer([WalletSelectors, NotificationSelectors], NotificationActions)
class SecretPhraseRoute extends Component {
  
  static propTypes = {
    spawnSuccessNotification: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    mnemonic: PropTypes.string,
  };
  
  @Inject(ClipboardCopier)
  clipboardCopier;
  
  render() {
    return (
      <React.Fragment>
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
              <TextFieldWrapper>
                <TextFieldMultiline
                  type="text"
                  disabled
                  value={this.props.mnemonic}
                  rows={3}
                />
                <div className="text-align-right">
                  <Button colorScheme="flat" size="small">
                    <span
                      onClick={this.handleCopyClick}
                      className="dashed"
                    >
                      Copy text
                    </span>
                  </Button>
                </div>
              </TextFieldWrapper>
            </Row>
          </Content>
          <Row className="text-align-center">
            <div>
              <ParagraphBody>
                <strong>Do not lose it!</strong>
              </ParagraphBody>
              <ParagraphBody>
                Your key cannot be recoverWifByMnemoniced if you lose it.
              </ParagraphBody>
            </div>
          </Row>
          <Row className="text-align-center">
            <div>
              <ParagraphBody>
                <strong>Make a backup</strong>
              </ParagraphBody>
              <ParagraphBody>Treat it like a bank account.</ParagraphBody>
            </div>
          </Row>
          <ButtonRow>
            <ButtonLink spread to="/wallet">
              I've saved it
            </ButtonLink>
  
            <ButtonLink colorScheme="flat" spread to="/">
              Cancel
            </ButtonLink>
          </ButtonRow>
        </Screen>
      </React.Fragment>
    );
  }
  
  handleCopyClick = () => {
    this.clipboardCopier.copy(this.props.mnemonic);
    this.props.spawnSuccessNotification("Mnemonic was copied to your clipboard");
  }
}

export default SecretPhraseRoute;
