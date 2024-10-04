import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUsuarioDto {
    @ApiProperty({ example: '1234'})
    @IsNumber()
    matricula: number;

    @ApiProperty({ example: '7'})
    @IsNumber()
    id_tipo_acesso: number;
    
    @ApiProperty({ example: '8'})
    @IsNumber()
    id_tipo_status: number;

    @ApiProperty({ example: 'Cilcano da Silva'})
    @IsString()
    nome: string;

    @ApiProperty({ example: '1234'})
    @IsString()
    senha: string;

    @ApiProperty({ example: ''})
    @IsString()
    impressao_digital: string;
    
    @ApiProperty({ example: 'Ciclano.Silva@perto.com.br'})
    @IsString()
    email: string;
    
    @ApiProperty({ example: ''})
    @IsString()
    nro_serie_cracha: string;
    
    @ApiProperty({ example: '171'})
    @IsNumber()
    id_tipo_empresa: number;
}
