import React, { Component } from 'react';

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

class SecretPhraseRoute extends Component {
  render() {
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
            <TextFieldWrapper>
              <TextFieldMultiline
                type="text"
                disabled
                value="wild oranges hat palm summit run keppler strict meadow plum octopus card"
                rows={3}
              />
              <div className="text-align-right">
                <Button colorScheme="flat" size="small">
                  <span className="dashed">Copy text</span>
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
              Your key cannot be recovered if you lose it.
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
          <ButtonLink spread to="/confirm-phrase">
            I've saved it
          </ButtonLink>

          <ButtonLink colorScheme="flat" spread to="/">
            Cancel
          </ButtonLink>
        </ButtonRow>
      </Screen>
    );
  }
}

export default SecretPhraseRoute;
