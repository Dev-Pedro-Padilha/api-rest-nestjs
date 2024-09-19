import { IsNumber, IsString } from 'class-validator';

export class CreateUsuarioDto {
    @IsNumber()
    matricula: number;

    @IsNumber()
    id_tipo_acesso: number;
    
    @IsNumber()
    id_tipo_status: number;

    @IsString()
    nome: string;

    @IsString()
    senha: string;

    @IsString()
    impressao_digital: string;
    
    @IsString()
    email: string;
    
    @IsString()
    nro_serie_cracha: string;
    
    @IsNumber()
    id_tipo_empresa: number;
}
