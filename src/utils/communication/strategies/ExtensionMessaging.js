class Inbound {
  connectionName;
  constructor(connectionName) {
    this.connectionName = connectionName;
  }

  listenAndAnswer(listener) {
    if (
      window.chrome &&
      window.chrome.extension &&
      window.chrome.extension.onConnect
    ) {
      const event = window.chrome.extension.onConnect;

      event.addListener(port => {
        if (port.name !== this.connectionName) {
          return;
        }

        port.onMessage.addListener(async msg => {
          if (msg) {
            port.postMessage(await listener(msg));
          }
        });
      });
    }
  }
}

class Outbound {
  _port;
  _connectionName;

  constructor(connectionName) {
    this._connectionName = connectionName;
  }

  send(message) {
    this._initialize();
    this._port && this._port.postMessage(message);
  }

  listen(listener) {
    this._listener = listener;
  }

  _initialize() {
    if (
      window.chrome &&
      window.chrome.extension &&
      typeof window.chrome.extension.connect === "function"
    ) {
      this._port = window.chrome.extension.connect({
        name: this._connectionName
      });

      if (this._port.onMessage.hasListener(this._handleMessage)) {
        this._port.onmessage.removeListener(this._handleMessage);
      }

      this._port.onMessage.addListener(this._handleMessage);
    }
  }

  _handleMessage = async msg => {
    if (this._listener && msg) {
      this._listener(msg);
    }
  };
}

export class ExtensionMessaging {
  connectionName;

  constructor(connectionName) {
    this.connectionName = connectionName;
  }

  getInbound() {
    return new Inbound(this.connectionName);
  }

  getOutbound() {
    return new Outbound(this.connectionName);
  }
}
