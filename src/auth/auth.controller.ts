import { Controller, Post, Get, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import * as fs from 'fs/promises';
import { exec } from 'child_process';
import { promisify } from 'util';
import * as path from 'path';

const execPromise = promisify(exec);

@ApiTags('Autenticação')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  
  @Post('login')
  @ApiOperation({ summary: 'Faz Autenticação e gera Token' })
  async login(@Body() authDto: AuthDto) {
    const { username, password } = authDto;
    try {
      //Autentica o usuario e retorna os dados 
      const isAuthenticated = await this.authService.authenticate(username, password);
  
      if (!isAuthenticated) {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }

      const user = await this.authService.getUserData(username);
      //console.log(user);
      const token = this.authService.generateToken(user);
      
      //console.log(user);
      return { message: 'Login successful!', user, token };
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
