import React, { Component } from 'react';
import {
  BrandBox,
  BrandBoxTitle,
  BrandBoxSubtitle,
  ButtonLink,
  Content,
  DividerWithText,
  Row,
  Screen,
} from '../components';

class WelcomeRoute extends Component {
  render() {
    return (
      <Screen>
        <BrandBox>
          <BrandBoxTitle>Snax</BrandBoxTitle>
          <BrandBoxSubtitle>extension</BrandBoxSubtitle>
        </BrandBox>
        <Content spread centerY>
          <Row>
            <ButtonLink
              spread
              to="/new-wallet"
              data-test-id="welcome__new-wallet__button"
            >
              Create new wallet
            </ButtonLink>
          </Row>
          <Row>
            <DividerWithText>or</DividerWithText>
          </Row>
          <Row>
            <ButtonLink
              spread
              to="/import-password"
              data-test-id="welcome__import-wallet__button"
            >
              I already have wallet
            </ButtonLink>
          </Row>
        </Content>
      </Screen>
    );
  }
}

export default WelcomeRoute;
