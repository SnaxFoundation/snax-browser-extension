import React, { Component } from "react";

import {
  Anchor,
  Button,
  ButtonRow,
  Content,
  Row,
  Screen,
  ScreenTitle,
  ParagraphBody,
  SecondaryInfoBox
} from "../components";
import { NotificationActions } from "../store/notifications/NotificationActions";
import { ReduxContainer } from "../utils/redux/ReduxContainer";
import { TransactionSelectors } from "../store/transaction/TransactionSelectors";
import { WalletActions } from "../store/wallet/WalletActions";
import { WalletSelectors } from "../store/wallet/WalletSelectors";

@ReduxContainer(
  [WalletSelectors, TransactionSelectors],
  [WalletActions, NotificationActions]
)
class RestoreConfirmationRoute extends Component {
  static propTypes = {};

  restore = async () => {
    await this.props.clearWallet();
    await this.props.clearPassword();
    this.props.history.push("/");
  };

  render() {
    return (
      <Screen>
        <ScreenTitle>Restore key</ScreenTitle>
        <Content spread centerY>
          <Row className="text-align-center">
            <ParagraphBody>
              Are you sure you want to restore your key? Your current key will
              be discarded.
            </ParagraphBody>
            <ParagraphBody>
              If you need to log into your current wallet you will need your
              secret key and password.
            </ParagraphBody>
          </Row>
        </Content>

        <ButtonRow>
          <Button spread onClick={this.restore}>
            Restore
          </Button>

          <SecondaryInfoBox>
            <Anchor spread to="/wallet">
              Cancel
            </Anchor>
          </SecondaryInfoBox>
        </ButtonRow>
      </Screen>
    );
  }
}

export default RestoreConfirmationRoute;
