import 'babel-polyfill';
import {Inject} from 'src/context/steriotypes/Inject';
import {PublicOnPageEosProvider} from 'src/services/eos/PublicOnPageEosProvider';

class InjectedScript {
  @Inject(PublicOnPageEosProvider)
  publicOnPageEosProvider;
  
  run() {
    const mintsObject = {
      transfer: this.publicOnPageEosProvider.transfer.bind(this.publicOnPageEosProvider)
    };
    
    Reflect.defineProperty(global, 'Mints', {
      get: () => mintsObject,
    })
  }
}


new InjectedScript().run();