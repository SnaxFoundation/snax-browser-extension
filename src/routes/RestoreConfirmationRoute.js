import React, { Component } from 'react';

import {
  Anchor,
  Button,
  ButtonRow,
  Content,
  Row,
  Screen,
  ScreenTitle,
  ParagraphBody,
  SecondaryInfoBox,
} from '../components';

class RestoreConfirmationRoute extends Component {
  static propTypes = {};

  render() {
    return (
      <Screen>
        <ScreenTitle>Restore key</ScreenTitle>
        <Content spread centerY>
          <Row className="text-align-center">
            <ParagraphBody>
              Are you sure you want to restore your key? Your current key will
              be discarded.
            </ParagraphBody>
            <ParagraphBody>
              If you need to log into your current wallet you will need your
              secret key and password.
            </ParagraphBody>
          </Row>
        </Content>

        <ButtonRow>
          <Button spread onClick={null}>
            Restore
          </Button>

          <SecondaryInfoBox>
            <Anchor spread to="#">
              Cancel
            </Anchor>
          </SecondaryInfoBox>
        </ButtonRow>
      </Screen>
    );
  }
}

export default RestoreConfirmationRoute;
