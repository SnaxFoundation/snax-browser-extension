import { Singleton } from 'src/context/steriotypes/Singleton';
import { JsonRpc, JsSignatureProvider, Api } from '@snaxfoundation/snaxjs';
import { WalletManager } from 'src/services/accounts/WalletManager';
import { Inject } from 'src/context/steriotypes/Inject';
import { config } from 'src/config';
@Singleton
export class PrivateSnaxProvider {
  @Inject(WalletManager) walletManager;

  rpc = new JsonRpc(config.chainUrl || 'https://cdn.snax.one', {
    fetch,
  });

  async getBalance(account) {
    return (
      (await this.rpc.get_currency_balance('snax.token', account, 'SNAX'))[0] ||
      '0.0000 SNAX'
    );
  }

  async transfer(from, to, amount, platform) {
    let error = null;

    try {
      const {
        wallet: { wif: privateKey },
      } = await this.walletManager.getWallet();
      const signatureProvider = new JsSignatureProvider([privateKey]);
      const api = new Api({
        rpc: this.rpc,
        signatureProvider,
        textDecoder: new TextDecoder(),
        textEncoder: new TextEncoder(),
      });

      if (platform === 'twitter') {
        await api.transact(
          {
            actions: [
              {
                account: 'p.twitter',
                name: 'transfersoc',
                authorization: [
                  {
                    actor: from,
                    permission: 'active',
                  },
                ],
                data: {
                  from,
                  to,
                  quantity: amount,
                  memo: '',
                },
              },
            ],
          },
          {
            blocksBehind: 1,
            expireSeconds: 30,
          }
        );
      }

      if (platform === 'snax') {
        await api.transact(
          {
            actions: [
              {
                account: 'snax.token',
                name: 'transfer',
                authorization: [
                  {
                    actor: from,
                    permission: 'active',
                  },
                ],
                data: {
                  from,
                  to,
                  quantity: amount,
                  memo: '',
                },
              },
            ],
          },
          {
            blocksBehind: 1,
            expireSeconds: 30,
          }
        );
      }
    } catch (e) {
      error = e;
    }

    return {
      isSucceed: !error,
      isError: !!error,
      error,
    };
  }
}
