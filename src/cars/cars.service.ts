import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Car } from './entities/car.entity';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car)
    private readonly carsRepository: Repository<Car>,
  ) {}
  
  //Método para criar um novo Carro
  async create(createCarDto: CreateCarDto): Promise<Car> {
    const newCar = this.carsRepository.create(createCarDto);    //Cria uma instância de car
    return await this.carsRepository.save(newCar);              //Salva no Banco de Dados
  }

  //Método para retornar todos os carros
  findAll(): Promise<Car[]> {
    return this.carsRepository.find();                          //Busca todos os carros no Banco de Dados
  }

  //Método para retornar um carro espedífico pelo Id
  async findOne(id:number): Promise<Car> {
    const car = await this.carsRepository.findOneBy({ id });    //Busca o carro por Id

    if(!car){
      throw new NotFoundException('Carro não encontrado');
    }
    return car;
  }
  
  //Método par atualizar um carro
  async update(id:number, updateCarDto: UpdateCarDto): Promise<Car>{
    const car = await this.findOne(id);                         //Verifica se o carro existe
    const updateCar = { ...car, ...updateCarDto };              //Atualiza os campos com os novos valores
    return this.carsRepository.save(updateCar);                 //Salva no Banco de Dados
  }
  
  //Método para remover um carro
  async remove(id:number): Promise<void>{
    const car = await this.findOne(id);                         //Verifica se o carro existe
    await this.carsRepository.remove(car);                      //Remove o carro do Banco de Dados
  }

}
