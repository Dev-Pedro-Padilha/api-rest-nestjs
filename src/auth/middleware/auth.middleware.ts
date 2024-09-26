import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common'
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    use(req: any, res: any, next: () => void){
        const token = req.headers['authorization']?.split(' ')[1];

        if(!token){
            throw new HttpException('Token não fornecido', HttpStatus.UNAUTHORIZED);
        }

        //Verifica a validade do token
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err: any, decoded: any) => {
            if(err){
                throw new HttpException('Token inválido', HttpStatus.UNAUTHORIZED);
            }

            //Armazena as informações do usuário no objeto de requisição
            req.user = decoded;
            next();
        });
    }
}