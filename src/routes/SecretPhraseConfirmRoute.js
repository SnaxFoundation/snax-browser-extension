import React, { Component } from 'react';

import {
  Button,
  ButtonLink,
  ButtonRow,
  Content,
  Row,
  Screen,
  ScreenTitle,
  ParagraphBody,
} from '../components';

import { SecretWordInput } from '../containers';

// TODO Replace ButtonLink with Button after removing link

class SecretPhraseConfirmRoute extends Component {
  render() {
    return (
      <Screen>
        <ScreenTitle>Check secret phrase</ScreenTitle>
        <Row>
          <ParagraphBody>
            Let's check your secret phrase. Enter word <strong>4</strong> and{' '}
            <strong>12</strong>.
          </ParagraphBody>
        </Row>
        <Content spread centerY>
          <Row>
            <SecretWordInput number={4} />
          </Row>
          <Row>
            <SecretWordInput number={12} />
          </Row>
        </Content>

        <ButtonRow>
          <ButtonLink spread to="/wallet" disabled>
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
