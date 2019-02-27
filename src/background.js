import 'babel-polyfill';
import { Inject } from 'src/context/steriotypes/Inject';
import { PasswordInboundCommunicator } from 'src/services/communication/password/PasswordInboundCommunicator';
import { PrivateTransactionInboundCommunicator } from 'src/services/communication/privateTransaction/PrivateTransactionInboundCommunicator';
import { PrivateDataOutboundCommunicator } from 'src/services/communication/privateData/PrivateDataOutboundCommunicator';
import { PrivateDataInboundCommunicator } from 'src/services/communication/privateData/PrivateDataInboundCommunicator';
import { PrivateTransactionOutboundCommunicator } from 'src/services/communication/privateTransaction/PrivateTransactionOutboundCommunicator';
import { Holder } from 'src/services/misc/Holder';
import { isSnaxDomain } from 'src/utils/misc';

import {
  setBadge,
  setBadgeColor,
  clearBadge,
  getActiveTabUrlAsync,
} from 'src/utils/chrome';

const PASSWORD_HOLDER_TOKEN = 'password';

class BackgroundScript {
  @Inject(PasswordInboundCommunicator) passwordInboundCommunicator;

  @Inject(PrivateTransactionInboundCommunicator)
  privateTransactionInboundCommunicator;

  @Inject(PrivateTransactionOutboundCommunicator)
  privateTransactionOutboundCommunicator;

  @Inject(PrivateDataInboundCommunicator) privateDataInboundCommunicator;

  @Inject(PrivateDataOutboundCommunicator) privateDataOutboundCommunicator;

  @Inject(Holder) holder;

  run() {
    this.handlePopupRequests();
    this.handleContentRequests();
    this.listenTabChange();
  }

  async handleSnaxDomain() {
    const url = await getActiveTabUrlAsync();
    if (isSnaxDomain(url)) {
      setBadgeColor(true);
    } else {
      setBadgeColor(false);
    }
  }

  async listenTabChange() {
    chrome.tabs.onActivated.addListener(() => {
      this.handleSnaxDomain();
    });

    chrome.tabs.onUpdated.addListener(() => {
      this.handleSnaxDomain();
    });
  }

  handlePopupRequests() {
    this.passwordInboundCommunicator.handleGetPassword(() =>
      this.holder.get(PASSWORD_HOLDER_TOKEN)
    );

    this.passwordInboundCommunicator.handleSavePassword(payload => {
      this.holder.hold(PASSWORD_HOLDER_TOKEN, payload.password);
    });

    this.privateDataInboundCommunicator.handleSetData(({ name, data }) => {
      this.holder.hold(name, data);
      clearBadge();
    });
  }

  handleContentRequests() {
    this.privateTransactionInboundCommunicator.handleRequestConfirmationTransaction(
      payload => {
        return new Promise((resolve, reject) => {
          setBadge();

          const onLoadedMessage = async message => {
            if (message.loaded) {
              await this.listenTransactionConfirmation(
                payload,
                resolve,
                reject
              );
            }
            chrome.runtime.onMessage.removeListener(onLoadedMessage);
          };

          chrome.runtime.onMessage.addListener(onLoadedMessage);
        });
      }
    );

    this.privateDataInboundCommunicator.handleRequestData(
      ({ id, name }) =>
        new Promise(resolve => {
          if (
            name === PASSWORD_HOLDER_TOKEN ||
            String(name) === PASSWORD_HOLDER_TOKEN
          ) {
            return {
              name,
            };
          }

          const value = this.holder.get(name);
          if (value == null) {
            setBadge();

            resolve({
              name,
              data: this.holder.get(name),
            });
          } else {
            resolve({
              name,
              data: value,
            });
          }
        })
    );
  }

  async listenTransactionConfirmation(payload, resolve, reject) {
    try {
      const onDiscardTransactionMessage = async message => {
        if (message.cancelTransaction) {
          chrome.runtime.onMessage.removeListener(onDiscardTransactionMessage);
          reject(new Error(message.error));

          chrome.runtime.sendMessage({
            closePopup: true,
          });
        }
      };

      chrome.runtime.onMessage.addListener(onDiscardTransactionMessage);

      const result = await this.privateTransactionOutboundCommunicator.sendConfirmTransaction(
        payload
      );
      resolve(result);
    } catch (e) {
      console.error(e);
      reject(e);
    }
  }
}

new BackgroundScript().run();
