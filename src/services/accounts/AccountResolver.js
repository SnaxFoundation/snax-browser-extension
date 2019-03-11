import { Inject } from 'src/context/steriotypes/Inject';
import { Singleton } from 'src/context/steriotypes/Singleton';
import { config } from 'src/config';
@Singleton
export class AccountResolver {
  async getAccountNameById(id) {
    const response = await fetch(
      `${config.twitterUrl}/intent/user?user_id=${id}`,
      {
        credentials: 'omit',
      }
    );

    if (response.status !== 200) {
      return null;
    }

    const userPage = await response.text();
    const userName = this.extractNameFromPage(userPage);
    return userName;
  }

  async getIdByAccountName(accountName) {
    const response = await fetch(`${config.twitterUrl}/${accountName}`, {
      credentials: 'omit',
    });

    if (response.status !== 200) {
      return null;
    }

    const userPage = await response.text();
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
