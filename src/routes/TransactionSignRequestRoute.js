import React, { Component } from 'react';
import { TransactionActions } from 'src/store/transaction/TransactionActions';
import { TransactionSelectors } from 'src/store/transaction/TransactionSelectors';
import { ReduxContainer } from 'src/utils/redux/ReduxContainer';

import {
  Button,
  ButtonRow,
  Content,
  ParagraphError,
  Row,
  Screen,
  ScreenTitle,
} from '../components';

import { TransactionAmount, TransactionRecipient } from '../containers';

@ReduxContainer(TransactionSelectors, TransactionActions)
class TransactionSignRequestRoute extends Component {
  state = {
    processing: false,
  };

  render() {
    return (
      <Screen>
        <ScreenTitle>Transaction request</ScreenTitle>
        <Content spread>
          <Row>
            <TransactionAmount
              data-test-id="transaction-confirm__view__amount"
              amount={this.props.currentTransactionAmount}
            />
          </Row>
          <Row>
            <TransactionRecipient
              type={this.props.currentTransactionPlatform}
              name={this.props.currentTransactionDisplayName}
            />
          </Row>
          {this._renderBalance()}
          {this._renderErrorIfNeeded()}
        </Content>
        <ButtonRow>
          <Button
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
      </Screen>
    );
  }

  _renderErrorIfNeeded() {
    if (
      parseFloat(this.props.currentAccountBalance) >
      parseFloat(this.props.currentTransactionAmount)
    )
      return null;
    else
      return (
        <Row>
          <ParagraphError>Not enough tokens</ParagraphError>
        </Row>
      );
  }

  _renderBalance() {
    return <Row> Your balance is: {this.props.currentAccountBalance}</Row>;
  }

  _handleConfirmClick = async () => {
    this.setState({ processing: true });

    await this.props.signTransaction();

    this.setState({ processing: false });
    this.props.history.push('/transaction-success');
  };

  _handleCancelClick = async () => {
    await this.props.discardTransaction();
    this.props.history.push('/wallet');
  };
}

export default TransactionSignRequestRoute;
