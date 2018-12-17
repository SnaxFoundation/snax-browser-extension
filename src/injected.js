import "babel-polyfill";
import { Inject } from "src/context/steriotypes/Inject";
import { PublicOnPageSnaxProvider } from "src/services/eos/PublicOnPageSnaxProvider";

class InjectedScript {
  @Inject(PublicOnPageSnaxProvider) publicOnPageSnaxProvider;

  run() {
    const snaxObject = {
      transfer: this.publicOnPageSnaxProvider.transfer.bind(
        this.publicOnPageSnaxProvider
      )
    };

    Reflect.defineProperty(global, "Snax", {
      get: () => snaxObject
    });
  }
}

new InjectedScript().run();