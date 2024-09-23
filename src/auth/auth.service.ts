import { Injectable } from '@nestjs/common';
import * as ActiveDirectory from 'activedirectory2';
import * as dotenv from 'dotenv';

dotenv.config(); // Carrega as variáveis do .env

@Injectable()
export class AuthService {
  private ad: any;

  constructor() {
    const config = {
      url: process.env.LDAP_URL,
      baseDN: process.env.LDAP_BASE_DN,
      username: process.env.LDAP_USERNAME,
      password: process.env.LDAP_PASSWORD,
    };
    this.ad = new ActiveDirectory(config);
  }

  async authenticate(username: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.ad.authenticate(username, password, async (err: any, auth: boolean) => {
        if (err) {
          return reject(err);
        }
        if (auth) {
          try {
            const userDetails = await this.getUserData(username);
            return resolve(userDetails);
          } catch (error) {
            return reject(error);
          }
        } else {
          return resolve(null);
        }
      });
    });
  }

  async getUserData(username: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.ad.findUser(username, { attributes: ['*'] }, (err: any, user: any) => {
        if (err) {
          return reject(err);
        }
        if (!user) {
          return reject(new Error('User not found'));
        }
        return resolve(user);
      });
    });
  }
}
