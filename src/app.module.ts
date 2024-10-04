import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AuthMiddleware } from './auth/middleware/auth.middleware';
import { CarsModule } from './cars/cars.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsuariosModule } from './usuarios/usuarios.module';
import { DepartmentsModule } from './departments/departments.module';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
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
      synchronize: false,
      options: {
        encrypt: false,  // Se estiver usando uma conexão não criptografada
        trustServerCertificate: true,  // Pode ser necessário em conexões locais
      },
      autoLoadEntities: true,
     
    }),
    CarsModule,
    UsuariosModule,
    DepartmentsModule,
    AuthModule,
    HomeModule
  ],
  controllers: [],
  providers: [],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer){
    consumer
    .apply(AuthMiddleware)
    .exclude('auth/login')
    .forRoutes('*');    //Aplica o Middleware em todas as rotas ou rotas especificas
  }
}