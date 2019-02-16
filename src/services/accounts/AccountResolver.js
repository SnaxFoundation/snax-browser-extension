import { Inject } from "src/context/steriotypes/Inject";
import { Singleton } from "src/context/steriotypes/Singleton";

@Singleton
export class AccountResolver {
  async getAccountNameById(id) {
    let userPage = await fetch(
      `https://twitter.com/intent/user?user_id=${id}`,
      {
        credentials: "omit"
      }
    );

    userPage = await userPage.text();
    const userName = this.extractNameFromPage(userPage);
    return userName;
  }

  async getIdByAccountName(accountName) {
    let userPage = await fetch(`https://twitter.com/${accountName}`, {
      credentials: "omit"
    });

    userPage = await userPage.text();
    console.log(userPage);
    const id = this.extractIdFromPage(userPage);
    return id;
  }

  extractIdFromPage(page) {
    return page.match(/data-user-id="([^"]+)/gim)[1].match(/(\d+)$/)[0];
  }

  extractNameFromPage(page) {
    return page.match(/href="\/intent\/follow\?screen_name=([^"]+)/im)[1];
  }
}
