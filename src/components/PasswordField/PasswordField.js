import React from 'react';
import PropTypes from 'prop-types';
import {ButtonIconOnly} from 'src/components/Button';
import {IconEyeClosed, IconEyeOpened} from 'src/components/Icon';
import {TextField, TextFieldIconRow, TextFieldLabel} from 'src/components/TextField';

export class PasswordField extends React.Component {
  
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    error: PropTypes.bool,
    value: PropTypes.string,
  };
  
  static defaultProps = {
    error: false,
  };
  
  state = {
    isInputTouched: false,
  };
  
  render() {
    const hasError = this.state.isInputTouched && this.props.error;
    return (
      <React.Fragment>
        <TextFieldLabel error={hasError}>Password</TextFieldLabel>
        <TextFieldIconRow>
          <TextField
            error={hasError}
            value={this.props.value}
            type={this.state.isPasswordVisible ? 'text' : 'password'}
            onChange={this.handleInputChange}
          />
          <ButtonIconOnly
            icon={this.state.isPasswordVisible ? (<IconEyeClosed />) : (<IconEyeOpened />)}
            colorScheme="flat"
            onClick={this.handlePasswordButtonClick}
          />
        </TextFieldIconRow>
      </React.Fragment>
    );
  }
  
  handleInputChange = (e) => {
    this.setState({ isInputTouched: true });
    this.props.onChange(e);
  };
  
  handlePasswordButtonClick = () => {
    this.setState({
      isPasswordVisible: !this.state.isPasswordVisible,
    });
  };
  
}