import { Module } from '@nestjs/common';
import { CarsModule } from './cars/cars.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'mssql',
      host: '10.3.171.42',
      port: 1433,
      username: "teste",
      password: "SIMPEQ@123",
      database: 'SIMPEQ_HOMOLOG',
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
    AuthModule
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}