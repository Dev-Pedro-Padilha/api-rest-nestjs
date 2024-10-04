import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Cargo_Ad')                 //Nome da tabela no banco de dados
export class Cargo{
    @PrimaryGeneratedColumn({ name: 'IdCargoAd' })      //Coluna
    id_cargo: number;

    @Column({ length: 100, name: 'Descricao' })
    descricao: string;
}