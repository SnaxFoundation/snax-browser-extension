import Color from 'color';
import React, { Component } from 'react';
import styled from 'styled-components';

import { ReduxContainer } from 'src/utils/redux/ReduxContainer';

import {
  Button,
  ButtonRow,
  Content,
  IconSnax,
  IconSteemit,
  IconTwitter,
  ParagraphError,
  Row,
  Screen,
  ScreenTitle,
  Tag,
} from '../components';
import { PlatformBindingActions } from '../store/platformBinding/PlatformBindingActions';
import { PlatformBindingSelectors } from '../store/platformBinding/PlatformBindingSelectors';
import styleConstants from '../styles/style-constants';

const iconMap = {
  twitter: (
    <IconTwitter color={styleConstants.brandColor.twitter} size="inherit" />
  ),
  snax: <IconSnax size="inherit" />,
  steemit: (
    <IconSteemit color={styleConstants.brandColor.steemit} size="inherit" />
  ),
};

const Wrapper = styled.div`
  display: grid;
  grid-gap: 3px;
  font-size: 16px;
  align-items: stretch;
`;

const Prefix = styled.span`
  font-weight: ${styleConstants.fontWeight.bold};
  letter-spacing: 0.1em;
  font-size: 0.8em;
  color: ${styleConstants.textColor.medium};
`;

@ReduxContainer(PlatformBindingSelectors, PlatformBindingActions)
class PlatformBindingSignRequestRoute extends Component {
  state = {
    processing: false,
    error: null,
  };

  render() {
    const { currentPlatformToBind } = this.props;
    return (
      <Screen>
        <ScreenTitle>Platform binding request</ScreenTitle>
        <Content spread>
          <Row>
            <Wrapper spread>
              <Prefix>Request to bind platform: </Prefix>
              <Tag
                text={currentPlatformToBind}
                icon={iconMap[currentPlatformToBind]}
                style={{
                  backgroundColor: Color(
                    styleConstants.brandColor[currentPlatformToBind] ||
                      styleConstants.paletteBlueGrey[900]
                  ).alpha(0.1),
                }}
              />
              {this._renderErrorIfNeeded()}
              {this._renderResourcesErrorIfNeeded()}
            </Wrapper>
          </Row>
        </Content>
        {!this.state.error
          ? this._renderActiveBindingButtons()
          : this._renderFailedBindingButtons()}
      </Screen>
    );
  }

  _renderActiveBindingButtons = () => {
    const isButtonDisables = this.state.error;
    return (
      <ButtonRow>
        <Button
          disabled={isButtonDisables}
          onClick={this._handleConfirmClick}
          spread
          loading={this.state.processing}
          data-test-id="transaction-confirm__actions__confirm"
        >
          Confirm
        </Button>
        <Button
          data-test-id="transaction-confirm__actions__cancel"
          onClick={this._handleCancelClick}
          colorScheme="flat"
          spread
        >
          Cancel
        </Button>
      </ButtonRow>
    );
  };

  _renderFailedBindingButtons = () => {
    return (
      <ButtonRow>
        <Button onClick={this._handleGoBackClick} spread>
          Back to wallet
        </Button>
      </ButtonRow>
    );
  };

  _renderErrorIfNeeded = () => {
    return null;
  };

  _renderResourcesErrorIfNeeded() {
    if (this.state.error) {
      return (
        <Row>
          <ParagraphError>{this.state.error}</ParagraphError>
        </Row>
      );
    }
    return null;
  }

  _handleConfirmClick = async () => {
    this.setState({ processing: true, error: null });

    await this.props.bindPlatform();

    const error =
      this.props.currentPlatformBindingError &&
      this.props.currentPlatformBindingError.json &&
      this.props.currentPlatformBindingError.json.error &&
      this.props.currentPlatformBindingError.json.error.name;

    const success = this.props.isCurrentPlatformBindingSucceed;
    const failed = this.props.isCurrentPlatformBindingFailed;

    if (failed) {
      let errorMessage;

      if (
        error === 'ram_usage_exceeded' ||
        error === 'tx_net_usage_exceeded' ||
        error === 'tx_cpu_usage_exceeded'
      ) {
        errorMessage = `Seems you made a lot of transactions in the last 24 hours. ${
          this.props.currentPlatformBindingError.json.error.what
        }`;
      } else {
        errorMessage = 'Something wrong, try again';
      }

      this.setState({
        processing: false,
        error: errorMessage,
      });
    }

    if (success) {
      this.setState({ processing: false });
      this.props.history.push('/transaction-success');
    }
  };

  _handleCancelClick = async () => {
    await this.props.discardTransaction();
    this.props.history.push('/wallet');
  };

  _handleGoBackClick = () => {
    this.props.history.push('/wallet');
  };
}

export default PlatformBindingSignRequestRoute;
