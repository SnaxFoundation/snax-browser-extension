import "babel-polyfill";
import { Inject } from "src/context/steriotypes/Inject";
import { PasswordInboundCommunicator } from "src/services/communication/password/PasswordInboundCommunicator";
import { PrivateTransactionInboundCommunicator } from "src/services/communication/privateTransaction/PrivateTransactionInboundCommunicator";
import { PrivateDataOutboundCommunicator } from "src/services/communication/privateData/PrivateDataOutboundCommunicator";
import { PrivateDataInboundCommunicator } from "src/services/communication/privateData/PrivateDataInboundCommunicator";
import { PrivateTransactionOutboundCommunicator } from "src/services/communication/privateTransaction/PrivateTransactionOutboundCommunicator";
import { Holder } from "src/services/misc/Holder";
const PASSWORD_HOLDER_TOKEN = "password";

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
  }

  handlePopupRequests() {
    this.passwordInboundCommunicator.handleGetPassword(() =>
      this.holder.get(PASSWORD_HOLDER_TOKEN)
    );
    this.passwordInboundCommunicator.handleSavePassword(payload =>
      this.holder.hold(PASSWORD_HOLDER_TOKEN, payload.password)
    );
    this.privateDataInboundCommunicator.handleSetData(({ name, data }) =>
      this.holder.hold(name, data)
    );
  }

  handleContentRequests() {
    this.privateTransactionInboundCommunicator.handleRequestConfirmationTransaction(
      payload => {
        return new Promise((resolve, reject) => {
          this.setBadge();
          chrome.runtime.onMessage.addListener(request => {
            if (request.loaded) {
              this.listenTransactionConfirmation(payload, resolve, reject);
            }
          });
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
              name
            };
          }

          const value = this.holder.get(name);

          if (value == null) {
            this.setBadge();
            resolve({
              name,
              data: this.holder.get(name)
            });
          } else {
            resolve({
              name,
              data: value
            });
          }
        })
    );
  }

  setBadge = () => {
    chrome.browserAction.setBadgeText({ text: "1" });
    chrome.browserAction.setBadgeBackgroundColor({ color: "red" });
  };

  async listenTransactionConfirmation(payload, resolve, reject) {
    try {
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
