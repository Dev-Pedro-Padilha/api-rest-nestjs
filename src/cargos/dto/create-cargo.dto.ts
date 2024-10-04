import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateCargoDto {
    @IsNumber()
    id_cargo: number;

    @ApiProperty({ example: 'Desenvolvedor Software' })
    @IsString()
    descricao: string;
}