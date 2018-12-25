import PropTypes from "prop-types";
import React, { Component } from "react";
import styled from "styled-components";
import { NotificationActions } from "src/store/notifications/NotificationActions";
import { TransactionSelectors } from "src/store/transaction/TransactionSelectors";
import { WalletActions } from "src/store/wallet/WalletActions";
import { ReduxContainer } from "src/utils/redux/ReduxContainer";

import {
  Button,
  Anchor,
  ButtonRow,
  Content,
  Row,
  ScreenForm,
  ScreenTitle,
  TextFieldWrapper,
  PasswordField,
  SecondaryInfoBox
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

  handleRestoreClick = async e => {
    e.preventDefault();
    await this.props.clearWallet();
    await this.props.clearPassword();
    this.props.history.push("/");
  };

  render() {
    return (
      <ScreenForm onSubmit={this.handleOpenWalletClick}>
        <ScreenTitle>Unlock wallet</ScreenTitle>
        <Content spread centerY>
          <Row>
            <TextFieldWrapper>
              <PasswordField onChange={this.handlePasswordChange} />
            </TextFieldWrapper>
          </Row>
        </Content>
        <ButtonRow>
          <Button type="submit" disabled={!this.isPasswordValid()} spread>
            Unlock wallet
          </Button>
          <SecondaryInfoBox>
            <Anchor
              colorScheme="flat"
              spread
              onClick={this.handleRestoreClick}
              to="/"
            >
              Restore wallet
            </Anchor>
          </SecondaryInfoBox>
        </ButtonRow>
      </ScreenForm>
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
      let result;
      try {
        result = await this.props.tryExtractWalletFromStorage(
          this.state.password
        );
      } catch (e) {
        this.props.spawnErrorNotification(
          "Cannot decrypt wallet, please check your password"
        );
      }

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
    } else {
      this.props.spawnErrorNotification(
        "Cannot decrypt wallet, please check your password"
      );
    }
  };

  isPasswordValid() {
    return !!this.state.password;
  }
}

export default PasswordRequestRoute;
