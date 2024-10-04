import { Injectable, NotFoundException } from '@nestjs/common';
import * as ActiveDirectory from 'activedirectory2';
import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs/promises';
import * as path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import { unlink } from 'fs';
//Serviço de Departamentos
import { DepartmentsService } from '../departments/departments.service';

const unlinkAsync = promisify(unlink);
const execPromise = promisify(exec);

dotenv.config(); // Carrega as variáveis do .env

@Injectable()
export class AuthService {
  private ad: any;
  private readonly jwtSecret: string;

  constructor(private readonly departmentService: DepartmentsService) {
    const config = {
      url: process.env.LDAP_URL,
      baseDN: process.env.LDAP_BASE_DN,
      username: process.env.LDAP_EMAIL,
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
        this.ad.findUser(
          { attributes: ['cn', 'title', 'physicalDeliveryOfficeName', 'department', 'mail', 'description', 'thumbnailPhoto'] },
          username,
          async (err: any, user: any) => {
              if (err) {
                  return reject(err);
              }
              if (!user) {
                  return reject(new Error('User not found'));
              }

              if (user.thumbnailPhoto == null) {
                  user.thumbnailPhoto = await this.getImageAsBase64(user);
                  //console.log('thumbnailPhoto é null');
              } else{
                //console.log('thumbnailPhoto não é null');
                //Roda script python que busca foto no ad e salva no diretorio uploads
                try{
                  const scriptPath = path.join(__dirname, '../../scripts/search_foto.py');
                  const { stdout, stderr } = await execPromise('python ' + scriptPath + ' ' + username);
                  if (stderr){
                    console.error('stderr:' + stderr);
                  }
                  console.error('Download ok');
                } catch (error){
                  console.error('exec error: ' + error);
                }
                //Le a foto para enviar junto no json
                const filePath = 'uploads/'+ user.description +'.png';
                const data = await fs.readFile(filePath);
        
                const imageBase64 = data.toString('base64');
        
                user.thumbnailPhoto = imageBase64;
                
                //Deleta foto
                await this.deleteFile(filePath);
              }
              this.searchDepartment(user);

              return resolve(user);
          }
        );
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
      //console.log(userDetails.description);
      const imageName = userDetails.description;
      const basePath = '\\\\perto06'+ process.env.PHOTO_USER_PATH;

      const imagePath = path.join(basePath, imageName+'.fc');
      //console.log(imagePath);
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

  async searchDepartment(userDetails: any): Promise<boolean> {
    const department = userDetails.department;                                  //Salva department do Usuario
    //console.log('Departamento: ' + department);
    //Método para retornar todos os Departamentos
    const departments =  await this.departmentService.getDepartment();          //Pega departments cadastrados
    //console.log(departments);
    const isDepartmentValid = departments.includes(department);                 //Compara department do Usuario com Departments cadastrados

    if(isDepartmentValid){
      console.log('Departamento Cadastrado');
    } else {
      console.log('Departamento não Cadastrado');
    }
    return isDepartmentValid;
  }

  async deleteFile(filePath: string): Promise<void> {
    try{
      await unlinkAsync(filePath);
    } catch(error){
      if (error.code === 'ENOENT'){
        throw new NotFoundException('File not found');
      }
      throw new Error('Error deleting file: ' + error.message);
    }
  }
}
