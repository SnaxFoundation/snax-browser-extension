import {Singleton} from 'src/context/steriotypes/Singleton';

@Singleton
export class PrivateEosProvider {
  transfer(from, to, amount) {
    console.warn('Communication with blockchain is not implemented yet');
    console.log('Trying to send tokens from ' + from + ' to ' + to + ' in amount of ' + amount);
    
    return {
      isSucceed: true,
      isError: false,
      error: null,
    }
  }
}