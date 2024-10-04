
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DepartmentsModule } from '../departments/departments.module';

@Module({
  imports: [ DepartmentsModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
