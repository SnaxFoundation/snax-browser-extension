import { Singleton } from "src/context/steriotypes/Singleton";
import { JsonRpc, JsSignatureProvider, Api } from "@snaxfoundation/snaxjs";
import { WalletManager } from "src/services/accounts/WalletManager";
import { Inject } from "src/context/steriotypes/Inject";

@Singleton
export class PrivateSnaxProvider {
  @Inject(WalletManager) walletManager;

  async transfer(from, to, amount) {
    let error = null;
    try {
      const rpc = new JsonRpc(
        process.env.SNAXNODE || "http://172.31.38.163:8888",
        {
          fetch
        }
      );
      const {
        wallet: { wif: privateKey }
      } = await this.walletManager.getWallet();
      const signatureProvider = new JsSignatureProvider([privateKey]);
      const api = new Api({
        rpc,
        signatureProvider,
        textDecoder: new TextDecoder(),
        textEncoder: new TextEncoder()
      });
      await api.transact(
        {
          actions: [
            {
              account: "snax.token",
              name: "transfer",
              authorization: [
                {
                  actor: from,
                  permission: "active"
                }
              ],
              data: {
                from,
                to,
                quantity: amount,
                memo: "u to u transfer"
              }
            }
          ]
        },
        {
          blocksBehind: 1,
          expireSeconds: 30
        }
      );
      console.log(
        "Trying to send tokens from " +
          from +
          " to " +
          to +
          " in amount of " +
          amount
      );
    } catch (e) {
      error = e;
    }

    return {
      isSucceed: !error,
      isError: !!error,
      error
    };
  }
}
