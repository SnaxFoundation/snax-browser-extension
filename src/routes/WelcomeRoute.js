import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import {
  BrandBox,
  BrandBoxTitle,
  BrandBoxSubtitle,
  Button,
  Content,
  DividerWithText,
  Row,
  Label,
  Screen,
} from '../components';

class WelcomeRoute extends Component {
  render() {
    return (
      <Screen>
        <BrandBox>
          <BrandBoxTitle>Snax</BrandBoxTitle>
          <BrandBoxSubtitle>
            extension&nbsp;&nbsp;<Label>beta</Label>
          </BrandBoxSubtitle>
        </BrandBox>
        <Content spread centerY>
          <Row>
            <Button
              as={Link}
              spread
              to="/new-wallet"
              data-test-id="welcome__new-wallet__button"
            >
              Create new wallet
            </Button>
          </Row>
          <Row>
            <DividerWithText>or</DividerWithText>
          </Row>
          <Row>
            <Button
              as={Link}
              spread
              to="/import-password"
              data-test-id="welcome__import-wallet__button"
            >
              I already have wallet
            </Button>
          </Row>
        </Content>
      </Screen>
    );
  }
}

export default WelcomeRoute;
