import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Departamento_AD')      //Nome da Tabela no Banco de Dados
export class Department {
    @PrimaryGeneratedColumn({ name: 'IdDepartamentoAd'})
    id_departamento: number;

    @Column({ length:100, name: 'Descricao' })
    descricao: string;
}