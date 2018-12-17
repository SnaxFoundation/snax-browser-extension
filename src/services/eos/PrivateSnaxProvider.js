import { Singleton } from "src/context/steriotypes/Singleton";
import { JsonRpc, JsSignatureProvider, Api } from "@snaxfoundation/snaxjs";
import { WalletManager } from "src/services/accounts/WalletManager";
import { Inject } from "src/context/steriotypes/Inject";

@Singleton
export class PrivateSnaxProvider {
  @Inject(WalletManager) walletManager;

  rpc = new JsonRpc(process.env.SNAXNODE || "https://testnetcdn.snax.one", {
    fetch
  });

  async getBalance(account) {
    return (
      (await this.rpc.get_currency_balance("snax.token", account, "SNAX"))[0] ||
      "0.0000 SNAX"
    );
  }

  async transfer(from, to, amount) {
    let error = null;
    console.log(
      "Trying to send tokens from " +
        from +
        " to " +
        to +
        " in amount of " +
        amount
    );
    try {
      const {
        wallet: { wif: privateKey }
      } = await this.walletManager.getWallet();
      const signatureProvider = new JsSignatureProvider([privateKey]);
      const api = new Api({
        rpc: this.rpc,
        signatureProvider,
        textDecoder: new TextDecoder(),
        textEncoder: new TextEncoder()
      });
      await api.transact(
        {
          actions: [
            {
              account: "p.twitter",
              name: "transfertou",
              authorization: [
                {
                  actor: from,
                  permission: "active"
                }
              ],
              data: {
                from,
                to,
                amount
              }
            }
          ]
        },
        {
          blocksBehind: 1,
          expireSeconds: 30
        }
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
