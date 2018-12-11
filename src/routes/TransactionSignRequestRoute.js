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
              type="twitter"
              name={this.props.currentTransactionRecipient}
            />
          </Row>
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
    return (
      <Row>
        <ParagraphError>Not enought tokens</ParagraphError>
      </Row>
    );
  }

  _handleConfirmClick = async () => {
    await this.props.signTransaction();
    //window.close();
  };

  _handleCancelClick = async () => {
    await this.props.discardTransaction();
    window.close();
  };
}

export default TransactionSignRequestRoute;
