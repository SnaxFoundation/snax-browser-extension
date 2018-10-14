class Inbound {
  listenAndAnswer(listener) {
    window.addEventListener('message', async (event) => {
      const data = event.data;
      if (data.___mintsMessage && data.___mintsRequest) {
        const result = await listener(data.payload);
        window.postMessage({
          payload: result,
          ___mintsMessage: true,
          ___mintsAnswer: true,
          ___mintsRequest: false,
        }, '*');
      }
    });
  }
}

class Outbound {
  send(message) {
    window.postMessage({
      payload: message,
      ___mintsMessage: true,
      ___mintsAnswer: false,
      ___mintsRequest: true,
    } , '*');
  }
  
  listen(listener) {
    window.addEventListener('message', (event) => {
      const data = event.data;
      if (data.___mintsMessage && data.___mintsAnswer) {
        listener(data.payload);
      }
    });
  }
}

export class PostMessaging {
  constructor(connectionName) {
  
  }
  
  getInbound() {
    return new Inbound();
  }
  
  getOutbound() {
    return new Outbound();
  }
}