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

  popup;

  publicPopup;

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
          if (this.popup) {
            this.popup.close();
          }

          setTimeout(() => {
            this.popup = window.open(
              chrome.extension.getURL("index.html"),
              "extension_popup",
              "width=360,height=500,status=no,scrollbars=no,resizable=no"
            );
            this.popup.addEventListener(
              "load",
              this.listenTransactionConfirmation(payload, resolve, reject)
            );
          }, 500); //TODO check what we can do with timeout
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
            setTimeout(() => {
              if (!this.publicPopup) {
                this.publicPopup = window.open(
                  chrome.extension.getURL("index.html"),
                  "extension_popup",
                  "width=360,height=500,status=no,scrollbars=no,resizable=no"
                );
              }
            }, 500);

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

  listenTransactionConfirmation(payload, resolve, reject) {
    return async () => {
      try {
        const result = await this.privateTransactionOutboundCommunicator.sendConfirmTransaction(
          payload
        );
        resolve(result);
      } catch (e) {
        console.error(e);
        reject(e);
      }
    };
  }
}

new BackgroundScript().run();
