// src/home/home.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { HomeDto } from './dto/home.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Home')
@Controller('home')
export class HomeController {

    @Post()
    @ApiOperation({ summary: 'Recebe json e token para iniciar pagina home' })
    async receiveAuthData() {
        // Aqui você pode processar o token e os dados do usuário
        //console.log('Token:', homeDto.token);
        //console.log('User Data:', homeDto.user);

        // Retorne uma resposta apropriada
        return {
        message: 'Dados recebidos com sucesso!',
        };
    }
}
