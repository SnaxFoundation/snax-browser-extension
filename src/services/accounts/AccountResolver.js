import { Inject } from 'src/context/steriotypes/Inject';
import { Singleton } from 'src/context/steriotypes/Singleton';
import { config } from 'src/config';
import { JsonRpc } from '@snaxfoundation/snaxjs';
import { sha256 } from 'js-sha256';

@Singleton
export class AccountResolver {
  rpc = new JsonRpc(config.chainUrl, { fetch });

  async getAccountNameById(platform, id) {
    if (platform === 'twitter') {
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
    } else if (platform === 'steem') {
      const { rows } = await this.rpc.get_table_rows({
        code: 'p.steemit',
        scope: 'p.steemit',
        table: 'pusers',
        limit: 1,
        lower_bound: id,
      });
      const maybeUser = rows[0];
      if (!maybeUser || String(maybeUser.id) !== String(id)) {
        return null;
      } else {
        return maybeUser.account_name;
      }
    }
  }

  async getIdByAccountName(platform, accountName) {
    if (platform === 'twitter') {
      const response = await fetch(`${config.twitterUrl}/${accountName}`, {
        credentials: 'omit',
      });

      if (response.status !== 200) {
        return null;
      }

      const userPage = await response.text();
      const id = this.extractIdFromPage(userPage);
      return id;
    } else if (platform === 'steem') {
      const result = (await this.rpc.get_table_rows({
        code: 'p.steemit',
        scope: 'p.steemit',
        table: 'pusers',
        limit: 1,
        index_position: 3,
        key_type: 'sha256',
        lower_bound: sha256(accountName),
      })).rows;
      if (result.length) return result[0].id;
      else return null;
    }
  }

  extractIdFromPage(page) {
    return page.match(/data-user-id="([^"]+)/gim)[1].match(/(\d+)$/)[0];
  }

  extractNameFromPage(page) {
    return page.match(/href="\/intent\/follow\?screen_name=([^"]+)/im)[1];
  }
}
