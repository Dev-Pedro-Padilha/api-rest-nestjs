/*
     Toda regra de négocio e lógica para acessar os dados
    no Banco de dados.
*/

import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { CreateCargoDto } from "./dto/create-cargo.dto";
import { UpdateCargoDto } from "./dto/update-cargo.dto";
import { Cargo } from './entities/cargo.entity';

@Injectable()
export class CargosService{
    constructor(
        @InjectRepository(Cargo)
        private readonly cargosRepository: Repository<Cargo>,
    ) {}

    //Metodo para criar novo Cargo
    async createCargo(createCargoDto: CreateCargoDto): Promise<Cargo>{
        const newCargo = this.cargosRepository.create(createCargoDto);
        return await this.cargosRepository.save(newCargo);
    }

    //Método para retornar todos os Cargos
    findAll(): Promise<Cargo[]>{
        return this.cargosRepository.find();
    }

    //Método para retornar um Cargo especifico pelo id
    async findOne(id_cargo: number): Promise<Cargo>{
        const cargo = await this.cargosRepository.findOneBy({ id_cargo });

        if(!cargo){
            throw new NotFoundException('Cargo não encontrado');
        }
        return cargo;
    }

    //Método para atualizar um Cargo
    async update(id_cargo: number, updateCargoDto: UpdateCargoDto): Promise<void>{
        //Atualiza o cargo diretamente no banco de dados
        const result = await this.cargosRepository.update(id_cargo, updateCargoDto);

        if(result.affected === 0){
            throw new Error('Cargo não encontrado ou nenhuma alteração feita');
        }
    }

    //Método para remover um Cargo
    async remove(id_cargo: number): Promise<void>{
        const cargo = await this.findOne(id_cargo);
        await this.cargosRepository.remove(cargo);
    }

    //Retorna apenas a descrição dos cargos
    async getCargo(): Promise<string[]>{
        const cargos = await this.cargosRepository.find();
        return cargos.map(cargo => cargo.descricao);
    }
}