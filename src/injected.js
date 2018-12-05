import "babel-polyfill";
import { Inject } from "src/context/steriotypes/Inject";
import { PublicOnPageEosProvider } from "src/services/eos/PublicOnPageEosProvider";

class InjectedScript {
  @Inject(PublicOnPageEosProvider) publicOnPageEosProvider;

  run() {
    const snaxObject = {
      transfer: this.publicOnPageEosProvider.transfer.bind(
        this.publicOnPageEosProvider
      )
    };

    Reflect.defineProperty(global, "Snax", {
      get: () => snaxObject
    });
  }
}

new InjectedScript().run();
