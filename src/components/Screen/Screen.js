import React from 'react';
import PropTypes from 'prop-types';
import {Alert, AlertWrapper} from 'src/components/Alerts';
import {NotificationSelectors} from 'src/store/notifications/NotificationSelectors';
import {ReduxContainer} from 'src/utils/redux/ReduxContainer';
import styled from 'styled-components';
import constants from '../../styles/style-constants';

export const ScreenLayout = styled.div`
  width: 100%;
  flex-grow: 1;
  padding: ${constants.grid.appPaddingY}px ${constants.grid.appPaddingX}px;
  display: flex;
  flex-direction: column;
`;


@ReduxContainer(NotificationSelectors)
export class Screen extends React.Component {
  static propTypes = {
    notificationMessage: PropTypes.string,
    isNotificationVisible: PropTypes.bool,
    isNotificationSuccess: PropTypes.bool,
  };
  
  render() {
    const { children } = this.props;
    return (
      <React.Fragment>
        {
          this.props.isNotificationVisible && (<AlertWrapper>
            <Alert colorScheme={this.props.isNotificationSuccess ? 'success' : 'error'}>
              {this.props.notificationMessage}
              </Alert>
          </AlertWrapper>)
        }
        <ScreenLayout>
          {children}
        </ScreenLayout>
      </React.Fragment>
    )
  }
}
