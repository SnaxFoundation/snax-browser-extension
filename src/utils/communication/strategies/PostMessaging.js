class Inbound {
  listenAndAnswer(listener) {
    window.addEventListener('message', async (event) => {
      const data = event.data;
      if (data.___snaxMessage && data.___snaxRequest) {
        const result = await listener(data.payload);
        window.postMessage({
          payload: result,
          ___snaxMessage: true,
          ___snaxAnswer: true,
          ___snaxRequest: false,
        }, '*');
      }
    });
  }
}

class Outbound {
  send(message) {
    window.postMessage({
      payload: message,
      ___snaxMessage: true,
      ___snaxAnswer: false,
      ___snaxRequest: true,
    } , '*');
  }
  
  listen(listener) {
    window.addEventListener('message', (event) => {
      const data = event.data;
      if (data.___snaxMessage && data.___snaxAnswer) {
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