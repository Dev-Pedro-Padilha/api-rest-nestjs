import { Controller, Post, Get, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Autenticação')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  
  @Post('login')
  @ApiOperation({ summary: 'Faz Autenticação e gera Token' })
  async login(@Body() authDto: AuthDto) {
    const { username, password } = authDto;
    try {
      //console.log('Received login request:', authDto);
      const isAuthenticated = await this.authService.authenticate(username, password);
  
      if (!isAuthenticated) {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }
  
      // Buscar dados do usuário após a autenticação
      const userData = await this.authService.getUserData(username);
      //Se a foto do usuario existir, converte para Base64
      if (userData.thumbnailPhoto){
        userData.thumbnailPhoto = Buffer.from(userData.thumbnailPhoto, 'binary').toString('base64');
      }
      //Gera o token chamando a função no AuthService
      const token = this.authService.generateToken(userData);

      return { message: 'Login successful!', token, user: userData};
    } catch (error) {
      console.error('Error during authentication:', error);
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Something went wrong',
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('logout')
  async logout() {
    // Aqui você pode implementar a lógica de logout
    // Por exemplo, limpar qualquer sessão ou informação no lado do cliente
    return { message: 'Logout successful!' };
  }



}
