import { Injectable } from '@nestjs/common';
import * as ActiveDirectory from 'activedirectory2';
import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';

dotenv.config(); // Carrega as variáveis do .env

@Injectable()
export class AuthService {
  private ad: any;
  private readonly jwtSecret: string;

  constructor() {
    const config = {
      url: process.env.LDAP_URL,
      baseDN: process.env.LDAP_BASE_DN,
      username: process.env.LDAP_USERNAME,
      password: process.env.LDAP_PASSWORD,
    };
    this.ad = new ActiveDirectory(config);
    this.jwtSecret = process.env.JWT_SECRET_KEY;
  }

  async authenticate(username: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      // Adiciona o sufixo ao username
      const fullUsername = `${username}`+process.env.LDAP_DOMAIN;
      //console.log(fullUsername);
      this.ad.authenticate(fullUsername, password, async (err: any, auth: boolean) => {
        if (err) {
          return reject(err);
        }
        if (auth) {
          try {
            const userDetails = await this.getUserData(username);
            const token = this.generateToken(userDetails);
            return resolve({ userDetails, token });
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
        this.ad.findUser({ attributes: ['cn', 'title', 'physicalDeliveryOfficeName', 'department', 'mail', 'description', 'thumbnailPhoto'] }, username, (err: any, user: any) => {
            if (err) {
                return reject(err);
            }
            if (!user) {
                return reject(new Error('User not found'));
            }

            //Converte a foto para Base64, se disponível
            if (user.thumbnailPhoto){
              user.thumbnailPhoto = Buffer.from(user.thumbnailPhoto, 'binary').toString('base64');
            }

            return resolve(user);
        });
    });
  }

  generateToken(userDetails: any): string {
    const payload = { username: userDetails.username, department: userDetails.department};
    return jwt.sign(payload, this.jwtSecret, { expiresIn: process.env.JWT_TOKEN_EXPIRES });
  }

  validadteToken(token: string): any {
    try{
      return jwt.verify(token, this.jwtSecret);
    } catch(err){
      return null;
    }
  }
}
