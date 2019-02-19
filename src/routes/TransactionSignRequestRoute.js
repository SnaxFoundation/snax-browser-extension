import React, { Component } from "react";
import { TransactionActions } from "src/store/transaction/TransactionActions";
import { TransactionSelectors } from "src/store/transaction/TransactionSelectors";
import { ReduxContainer } from "src/utils/redux/ReduxContainer";

import {
  Button,
  ButtonRow,
  Content,
  ParagraphError,
  Row,
  Screen,
  ScreenTitle
} from "../components";

import { TransactionAmount, TransactionRecipient } from "../containers";

@ReduxContainer(TransactionSelectors, TransactionActions)
class TransactionSignRequestRoute extends Component {
  render() {
    return (
      <Screen>
        <ScreenTitle>Transaction request</ScreenTitle>
        <Content spread>
          <Row>
            <TransactionAmount amount={this.props.currentTransactionAmount} />
          </Row>
          <Row>
            <TransactionRecipient
              type={this.props.currentTransactionPlatform}
              name={this.props.currentTransactionRecipient}
            />
          </Row>
          {this._renderBalance()}
          {this._renderErrorIfNeeded()}
        </Content>
        <ButtonRow>
          <Button onClick={this._handleConfirmClick} spread>
            Confirm
          </Button>
          <Button onClick={this._handleCancelClick} colorScheme="flat" spread>
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
    await this.props.signTransaction();
    this.props.history.push('/wallet');
  };

  _handleCancelClick = async () => {
    await this.props.discardTransaction();
    this.props.history.push('/wallet');
  };
}

export default TransactionSignRequestRoute;
