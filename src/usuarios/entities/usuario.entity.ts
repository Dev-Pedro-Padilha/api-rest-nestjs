import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('USUARIOS')                         //Nome da tabela no Banco de Dados
export class Usuario {
    @PrimaryColumn({ name: 'CD_MATRICULA' })
    matricula: number;

    @Column({ nullable:true, name: 'ID_TP_ACESSO'  })
    id_tipo_acesso: number;

    @Column({ nullable:true, name: 'ID_TP_STATUS' })
    id_tipo_status: number;

    @Column({ length: 60, name: 'NM_USUARIO' })
    nome: string;

    @Column({ length: 10, name: 'SENHA' })
    senha: string;

    @Column({ length: 512, nullable:true, name: 'IMPRESSAO_DIGITAL' })
    impressao_digital: string;

    @Column({ length: 60, nullable:true, name: 'EMAIL' })
    email: string;

    @Column({ length: 15, nullable: true, name: 'NRO_SERIE_CRACHA' })
    nro_serie_cracha: string;

    @Column({ nullable:true, name: 'ID_TP_EMPRESA' })
    id_tipo_empresa: number;



}
