import React, { Component } from 'react';
import {
  BrandBox,
  BrandBoxTitle,
  BrandBoxSubtitle,
  Button,
  ButtonIconOnly,
  ButtonRow,
  Content,
  IconLogOut,
  HeadingSmall,
  LoaderBox,
  ParagraphBody,
  Row,
  Screen,
} from '../components';

class WalletRoute extends Component {
  render() {
    return (
      <Screen>
        <BrandBox>
          <BrandBoxTitle>Mints</BrandBoxTitle>
          <BrandBoxSubtitle>wallet</BrandBoxSubtitle>
        </BrandBox>
        <Content spread centerY>
          <Row>
            <div>
              <HeadingSmall>Wallet</HeadingSmall>
              <ParagraphBody className="word-break">
                EOS83odTXLTdpCeXy9xymyGMQ8SgcsFhPGPsFVS3nQkS4HdTmwFt1
              </ParagraphBody>
              <div className="text-align-right">
                <Button colorScheme="flat" size="small">
                  <span className="dashed">Copy</span>
                </Button>
              </div>
            </div>
          </Row>
        </Content>
        <ButtonRow>
          <ButtonIconOnly colorScheme="flat" icon={<IconLogOut />} />
        </ButtonRow>

        {/* <LoaderBox>Loading</LoaderBox> */}
      </Screen>
    );
  }
}

export default WalletRoute;
