
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DepartmentsModule } from '../departments/departments.module';
import { CargosModule } from 'src/cargos/cargos.module';

@Module({
  imports: [ DepartmentsModule, CargosModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
