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
    error: null,
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
          {this._renderResourcesErrorIfNeeded()}
        </Content>
        {!this.state.error
          ? this._renderActiveTransactionsButtons()
          : this._renderFailedTransactionsButtons()}
      </Screen>
    );
  }

  _renderActiveTransactionsButtons = () => {
    const isButtonDisables = !this._isEnoughBalance() || this.state.error;
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

  _renderFailedTransactionsButtons = () => {
    return (
      <ButtonRow>
        <Button onClick={this._handleGoBackClick} spread>
          Back
        </Button>
      </ButtonRow>
    );
  };

  _isEnoughBalance = () => {
    return (
      parseFloat(this.props.currentAccountBalance) >
      parseFloat(this.props.currentTransactionAmount)
    );
  };

  _renderErrorIfNeeded = () => {
    if (this._isEnoughBalance()) return null;
    else
      return (
        <Row>
          <ParagraphError>Not enough tokens</ParagraphError>
        </Row>
      );
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

  _renderBalance() {
    return <Row> Your balance is: {this.props.currentAccountBalance}</Row>;
  }

  _handleConfirmClick = async () => {
    this.setState({ processing: true, error: null });

    await this.props.signTransaction();

    const error =
      this.props.currentTransactionError &&
      this.props.currentTransactionError.json.error.name;

    const success = this.props.isCurrentTransactionSucceed;
    const failed = this.props.isCurrentTransactionFailed;

    if (failed) {
      let errorMessage;

      if (
        error === 'ram_usage_exceeded' ||
        error === 'tx_net_usage_exceeded' ||
        error === 'tx_cpu_usage_exceeded'
      ) {
        errorMessage =
          'Seems you made a lot of transactions in the last 24 hours. Try again later.';
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

export default TransactionSignRequestRoute;
