import { Module } from '@nestjs/common';
import { CargosService } from './cargos.service';
import { Cargo } from './entities/cargo.entity';
import { CargosController } from './cargos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports:[TypeOrmModule.forFeature([Cargo])],
    controllers: [CargosController],
    providers:[CargosService],
    exports: [CargosService],
})

export class CargosModule {}