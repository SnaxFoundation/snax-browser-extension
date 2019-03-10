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
            <Button as={Link} spread to="/new-wallet">
              Create new wallet
            </Button>
          </Row>
          <Row>
            <DividerWithText>or</DividerWithText>
          </Row>
          <Row>
            <Button as={Link} spread to="/import-password">
              I already have wallet
            </Button>
          </Row>
        </Content>
      </Screen>
    );
  }
}

export default WelcomeRoute;
