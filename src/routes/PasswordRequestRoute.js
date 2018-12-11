import PropTypes from "prop-types";
import React, { Component } from "react";
import { NotificationActions } from "src/store/notifications/NotificationActions";
import { TransactionSelectors } from "src/store/transaction/TransactionSelectors";
import { WalletActions } from "src/store/wallet/WalletActions";
import { ReduxContainer } from "src/utils/redux/ReduxContainer";

import {
  Button,
  ButtonLink,
  ButtonRow,
  Content,
  Row,
  Screen,
  ScreenTitle,
  TextFieldWrapper,
  PasswordField
} from "../components";

@ReduxContainer(TransactionSelectors, [WalletActions, NotificationActions])
class PasswordRequestRoute extends Component {
  static propTypes = {
    spawnErrorNotification: PropTypes.func.isRequired,
    tryExtractWalletFromStorage: PropTypes.func.isRequired,
    isCurrentTransactionActive: PropTypes.bool,
    history: PropTypes.object.isRequired
  };

  state = {
    isPasswordVisible: false,
    password: ""
  };

  render() {
    return (
      <Screen>
        <ScreenTitle>Open wallet</ScreenTitle>
        <Content spread centerY>
          <Row>
            <TextFieldWrapper>
              <PasswordField onChange={this.handlePasswordChange} />
            </TextFieldWrapper>
          </Row>
        </Content>
        <ButtonRow>
          <Button
            onClick={this.handleOpenWalletClick}
            disabled={!this.isPasswordValid()}
            spread
          >
            Open wallet
          </Button>
          <ButtonLink colorScheme="flat" spread to="/">
            Cancel
          </ButtonLink>
        </ButtonRow>
      </Screen>
    );
  }

  handlePasswordButtonClick = () => {
    this.setState({
      isPasswordVisible: !this.state.isPasswordVisible
    });
  };

  handlePasswordChange = e => {
    this.setState({
      password: e.target.value
    });
  };

  handleOpenWalletClick = async e => {
    e.preventDefault();

    if (this.isPasswordValid()) {
      const result = await this.props.tryExtractWalletFromStorage(
        this.state.password
      );

      const redirectUrl = this.props.isCurrentTransactionActive
        ? "/transaction-sign-request"
        : "/wallet";

      if (!result.isExtractionSucceed) {
        this.props.spawnErrorNotification(
          "Cannot decrypt wallet, please check your password"
        );
      } else {
        this.props.history.push(redirectUrl);
      }
    }
  };

  isPasswordValid() {
    return !!this.state.password;
  }
}

export default PasswordRequestRoute;
