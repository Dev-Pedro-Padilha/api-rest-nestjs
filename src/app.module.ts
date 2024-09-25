import { Module } from '@nestjs/common';
import { CarsModule } from './cars/cars.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';
import * as dotenv from 'dotenv';

dotenv.config(); // Carrega as variáveis do .env


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'mssql',
      host: process.env.DB_HOST,
      port: 1433,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      schema: 'dbo', // Especificar o esquema correto aqui
      synchronize: true,
      options: {
        encrypt: false,  // Se estiver usando uma conexão não criptografada
        trustServerCertificate: true,  // Pode ser necessário em conexões locais
      },
      autoLoadEntities: true,
     
    }),
    CarsModule,
    UsuariosModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}