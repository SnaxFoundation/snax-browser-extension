import React, { Component } from 'react';

import {
  Content,
  Success,
  Screen,
  ParagraphBody2,
  Button,
  ButtonRow,
} from '../components';

class SuccessRoute extends Component {
  timeout = null;

  componentDidMount() {
    this.timeout = setTimeout(() => this._handleClosePopup(), 3000);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  _handleClosePopup() {
    window.close();
  }

  render() {
    return (
      <Screen>
        <Content spread centerY>
          <Success title="Success!">
            <ParagraphBody2>Transaction was successfully sent</ParagraphBody2>
          </Success>
        </Content>
        <ButtonRow>
          <Button onClick={this._handleClosePopup}>Ok</Button>
        </ButtonRow>
      </Screen>
    );
  }
}

export default SuccessRoute;
