import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {NotificationActions} from 'src/store/notifications/NotificationActions';
import {WalletActions} from 'src/store/wallet/WalletActions';
import {WalletSelectors} from 'src/store/wallet/WalletSelectors';
import {ReduxContainer} from 'src/utils/redux/ReduxContainer';

import {
  ButtonLink,
  ButtonRow,
  Content,
  Row,
  Screen,
  ScreenTitle,
  ParagraphBody,
} from '../components';

import { SecretWordInput } from '../containers';

// TODO Replace ButtonLink with Button after removing link


@ReduxContainer(WalletSelectors, [WalletActions, NotificationActions])
class SecretPhraseConfirmRoute extends Component {
  
  static propTypes = {
    createWifFromCandidate: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    mnemonic: PropTypes.string,
  };
  
  state = {
    firstValidationWord: '',
    secondValidationWord: '',
  };
  
  constructor(props, context) {
    super(props, context);
  
    const firstValidationNumber = this.getRandomValidationNumber();
    const secondValidationNumber = this.getRandomValidationNumber(firstValidationNumber);
    
    this.state = {
      firstValidationNumber,
      secondValidationNumber,
    }
  }
  
  render() {
    const { firstValidationNumber, secondValidationNumber } = this.state;
    
    return (
      <Screen>
        <ScreenTitle>Check secret phrase</ScreenTitle>
        <Row>
          <ParagraphBody>
            Let's check your secret phrase. Enter word <strong>{firstValidationNumber}</strong> and{' '}
            <strong>{secondValidationNumber}</strong>.
          </ParagraphBody>
        </Row>
        <Content spread centerY>
          <Row>
            <SecretWordInput number={firstValidationNumber} onChange={this.handleFirstWordChange} />
          </Row>
          <Row>
            <SecretWordInput number={secondValidationNumber} onChange={this.handleSecondWordChange}  />
          </Row>
        </Content>

        <ButtonRow>
          <ButtonLink
            onClick={this.handleOpenValid}
            spread to="/wallet"
            disabled={!this.areRandomWordsFromMnemonicValid()}
          >
            Open wallet
          </ButtonLink>

          <ButtonLink colorScheme="flat" spread to="/secret-phrase">
            Back
          </ButtonLink>
        </ButtonRow>
      </Screen>
    );
  }
  
  getRandomValidationNumber(exclude) {
     const number = Math.floor(Math.random() * Math.floor(11)) + 1;
     
     if (exclude === undefined) {
       return number;
     }
     
     if (number === exclude) {
       return this.getRandomValidationNumber(exclude);
     }
     
     return number;
  }
  
  areRandomWordsFromMnemonicValid() {
    const mnemonicArray = this.props.mnemonic.split(' ');
    const firstWord = mnemonicArray[this.state.firstValidationNumber - 1];
    const secondWord = mnemonicArray[this.state.secondValidationNumber - 1];
    
    return true;
    //return firstWord === this.state.firstValidationWord && secondWord === this.state.secondValidationWord;
  }
  
  handleFirstWordChange = (e) => {
    this.setState({
      firstValidationWord: e.target.value,
    })
  };
  
  handleSecondWordChange = (e) => {
    this.setState({
      secondValidationWord: e.target.value
    })
  };
  
  handleOpenValid = (e) => {
    e.preventDefault();
    if (this.areRandomWordsFromMnemonicValid()) {
      this.props.createWifFromCandidate(this.props.mnemonic);
      this.props.history.push('/wallet');
    }
  }
}

export default SecretPhraseConfirmRoute;
