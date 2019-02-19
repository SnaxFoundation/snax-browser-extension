import { Inject } from "src/context/steriotypes/Inject";
import { Singleton } from "src/context/steriotypes/Singleton";
import { PasswordOutboundCommunicator } from "src/services/communication/password/PasswordOutboundCommunicator";

@Singleton
export class PasswordManager {
  @Inject(PasswordOutboundCommunicator) passwordOutboundCommunicator;

  async hasPassword() {
    return !!(await this.passwordOutboundCommunicator.getPassword());
  }

  async getPassword() {
    const password = await this.passwordOutboundCommunicator.getPassword();

    return password;
  }

  async setPassword(password) {
    await this.passwordOutboundCommunicator.savePassword(password);
  }

  async clearPassword() {
    await this.passwordOutboundCommunicator.savePassword("");
  }
}
