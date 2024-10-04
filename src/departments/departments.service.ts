import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDepartmentDto } from './dto/create-Department.dto';
import { UpdateDepartmentDto } from './dto/update-Department.dto';
import { Department } from './entities/department.entity';

@Injectable()
export class DepartmentsService{
    constructor(
        @InjectRepository(Department)
        private readonly departmentsRepository: Repository<Department>,
    ) {}

    //Metodo para criar novo Departamento
    async createDepartment(createDepartmentDto: CreateDepartmentDto): Promise<Department>{
        const newDepartment = this.departmentsRepository.create(createDepartmentDto);
        return await this.departmentsRepository.save(newDepartment);
    }

    //Método para retornar todos os Departamentos
    findAll(): Promise<Department[]>{
        return this.departmentsRepository.find();
    }

    //Metodo para retornar um Departamento especifico pelo id
    async findOne(id_departamento: number): Promise<Department>{
        const department = await this.departmentsRepository.findOneBy({ id_departamento });

        if(!department){
            throw new NotFoundException('Departamento não encontrado');
        }
        return department;
    }

    //Método para Atualizar um Departamento
    async update(id_departamento: number, updateDepartmentDto: UpdateDepartmentDto): Promise<void> {
        //Atualiza o departamento diretamente no banco de dados
        const result = await this.departmentsRepository.update(id_departamento, updateDepartmentDto);
        
        if(result.affected === 0){
            throw new Error('Departamento não encontrado ou nenhuna alteração feita');
        }
    }

    //Método para remover um Departamento
    async remove(id_departamento: number): Promise<void>{
        const department = await this.findOne(id_departamento);
        await this.departmentsRepository.remove(department);
    }

    async getDepartment(): Promise<string[]>{
        const departments = await this.departmentsRepository.find();
        return departments.map(department => department.descricao);
    }
}