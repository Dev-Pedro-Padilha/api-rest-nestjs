import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateDepartmentDto {
    @IsNumber()
    id_departamento: number;

    @ApiProperty({example: 'Recursos Humanos'})
    @IsString()
    descricao: string;
}