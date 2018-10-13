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
    tryCreateWifFromCandidate: PropTypes.func.isRequired,
    spawnErrorNotification: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    mnemonic: PropTypes.string,
  };
  
  state = {
    firstValidationWord: '',
    secondValidationWord: '',
  };
  
  constructor(props, context) {
    super(props, context);
  
    const [firstValidationNumber, secondValidationNumber] = this.getRandomValidationNumbers();
    
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
            <SecretWordInput
              number={firstValidationNumber}
              onChange={this.handleFirstWordChange}
            />
          </Row>
          <Row>
            <SecretWordInput
              number={secondValidationNumber}
              onChange={this.handleSecondWordChange}
            />
          </Row>
        </Content>

        <ButtonRow>
          <ButtonLink
            onClick={this.handleOpenValid}
            disabled={!this.areRandomWordsFromMnemonicValid()}
            spread to="/wallet"
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
  
  handleOpenValid = async (e) => {
    e.preventDefault();
    if (this.areRandomWordsFromMnemonicValid()) {
      const result = await this.props.tryCreateWifFromCandidate(this.props.mnemonic);
      if (result.isCreationSucceed) {
        this.props.history.push('/wallet');
      } else {
        this.props.spawnErrorNotification('Some error occurred during creation, please contact with development team');
      }
    }
  };
  
  getValidatingWordsFromMnemonicArray(mnemonicArray) {
    if (mnemonicArray.length !== 12) {
      throw new Error('Mnemonic array is invalid');
    }
    
    return [
      mnemonicArray[this.state.firstValidationNumber - 1],
      mnemonicArray[this.state.secondValidationNumber - 1]
    ];
  }
  
  getRandomValidationNumbers() {
    const firstNumber = this.getRandomNumber(1, 6);
    const secondNumber = this.getRandomNumber(7, 12);
    return [firstNumber, secondNumber]
      .sort(() => this.getRandomNumber(0, 1));
  }
  
  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  areRandomWordsFromMnemonicValid() {
    const mnemonicArray = this.props.mnemonic.split(' ');
    const [firstWord, secondWord] = this.getValidatingWordsFromMnemonicArray(mnemonicArray);
    return firstWord === this.state.firstValidationWord
      && secondWord === this.state.secondValidationWord;
  }
}

export default SecretPhraseConfirmRoute;
