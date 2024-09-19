import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { Car } from './entities/car.entity';
import { CarsController } from './cars.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Car])],
  controllers: [CarsController],
  providers: [CarsService],
})
export class CarsModule {}
