import { Injectable } from '@nestjs/common';
import * as ActiveDirectory from 'activedirectory2';
import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs/promises';
import * as path from 'path';

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
            return resolve({});
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
        this.ad.findUser({ attributes: ['cn', 'title', 'physicalDeliveryOfficeName', 'department', 'mail', 'description'] }, username, (err: any, user: any) => {
            if (err) {
                return reject(err);
            }
            if (!user) {
                return reject(new Error('User not found'));
            }
            /*
            //Converte a foto para Base64, se disponível
            if (user.thumbnailPhoto){
              user.thumbnailPhoto = Buffer.from(user.thumbnailPhoto, 'binary').toString('base64');
            }
            */
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

  async getImageAsBase64(userDetails: any): Promise<string> {
    try{
      console.log(userDetails.description);
      const imageName = userDetails.description;
      const basePath = '\\\\perto06\\ECQ\\SIMPEQ\\FOTOS';

      const imagePath = path.join(basePath, imageName+'.fc');
      console.log(imagePath);
      if(!imagePath){
        return null;
      }
      //console.log(imagePath);
      //Lendo o arquivo de forma assíncrona com Promises
      const data = await fs.readFile(imagePath);

      const imageBase64 = data.toString('base64');
      
      return imageBase64;

    } catch (error){
      console.error('Erro ao buscar imagem: ${error.message}');
      //throw new Error('Erro ao buscar imagem: ${error.message}');
      return null;
    }
  }

}
