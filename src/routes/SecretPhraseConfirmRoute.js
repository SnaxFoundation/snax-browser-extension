import React, { Component } from 'react';

import {
  Button,
  ButtonLink,
  ButtonRow,
  Content,
  Row,
  Screen,
  ScreenTitle,
  TextField,
  TextFieldLabel,
  TextFieldWrapper,
  ParagraphBody,
} from '../components';

// TODO Replace ButtonLink with Button after removing link

class SecretPhraseConfirmRoute extends Component {
  render() {
    return (
      <Screen>
        <ScreenTitle>Check secret phrase</ScreenTitle>
        <Row>
          <ParagraphBody>
            Let's check your secret phrase. Enter word <strong>4</strong> and{' '}
            <strong>9</strong>.
          </ParagraphBody>
        </Row>
        <Content spread centerY>
          <Row>
            <TextFieldWrapper>
              <TextFieldLabel>Word 4</TextFieldLabel>
              <TextField type="text" />
            </TextFieldWrapper>
          </Row>
          <Row>
            <TextFieldWrapper>
              <TextFieldLabel>Word 9</TextFieldLabel>
              <TextField type="text" />
            </TextFieldWrapper>
          </Row>
        </Content>

        <ButtonRow>
          <ButtonLink spread to="/wallet">
            Open wallet
          </ButtonLink>

          <ButtonLink colorScheme="flat" spread to="/secret-phrase">
            Back
          </ButtonLink>
        </ButtonRow>
      </Screen>
    );
  }
}

export default SecretPhraseConfirmRoute;
