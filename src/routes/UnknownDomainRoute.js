import React, { Component } from 'react';
import {
  BrandBox,
  BrandBoxTitle,
  BrandBoxSubtitle,
  Button,
  Content,
  ParagraphCaption,
  Row,
  Label,
  Screen,
} from '../components';

class UnknownDomainRoute extends Component {
  handleGoToWallet = () => {
    const url = 'https://snax.one';
    window.open(url, '_blank');
  };

  render() {
    return (
      <Screen>
        <BrandBox>
          <BrandBoxTitle>Snax.One</BrandBoxTitle>
        </BrandBox>
        <Content spread centerY>
          <Row>
            <Button spread onClick={this.handleGoToWallet}>
              Go to my wallet
            </Button>
          </Row>
          <Row>
            <ParagraphCaption style={{ textAlign: 'center', width: '100%' }}>
              Wallet will be opened in a new tab
            </ParagraphCaption>
          </Row>
        </Content>
      </Screen>
    );
  }
}

export default UnknownDomainRoute;
