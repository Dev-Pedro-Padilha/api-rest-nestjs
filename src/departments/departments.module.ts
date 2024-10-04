import { Module } from '@nestjs/common';
import { DepartmentsService } from 'src/departments/departments.service';
import { Department } from './entities/department.entity';
import { DepartmentsController } from './departments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports:[TypeOrmModule.forFeature([Department])],
    controllers: [DepartmentsController],
    providers: [DepartmentsService],
    exports: [DepartmentsService],
})
export class DepartmentsModule {}