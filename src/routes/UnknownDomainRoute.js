import React, { Component } from 'react';
import {
  BrandBox,
  BrandBoxTitle,
  BrandBoxSubtitle,
  Button,
  Content,
  ParagraphCaption,
  Row,
  Screen,
} from '../components';

class UnknownDomainRoute extends Component {
  render() {
    return (
      <Screen>
        <BrandBox>
          <BrandBoxTitle>Snax</BrandBoxTitle>
          <BrandBoxSubtitle>wallet</BrandBoxSubtitle>
        </BrandBox>
        <Content spread centerY>
          <Row>
            <Button spread>Go to my wallet</Button>
          </Row>
          <Row>
            <ParagraphCaption>
              Wallet will be opened in a new tab
            </ParagraphCaption>
          </Row>
        </Content>
      </Screen>
    );
  }
}

export default UnknownDomainRoute;