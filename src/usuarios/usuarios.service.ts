import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuariosRepository: Repository<Usuario>,
  ) {}

  //Método para criar novo Usuario
  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const newUsuario = this.usuariosRepository.create(createUsuarioDto);
    return await this.usuariosRepository.save(newUsuario);
  }

  //Método para retornar todos os usuarios
  findAll(): Promise<Usuario[]> {
    return this.usuariosRepository.find();
  }

  //Método para retornar um usuario especifico pela Matricula
  async findOne(matricula: number): Promise<Usuario> {
    const usuario = await this.usuariosRepository.findOneBy({ matricula });

    if (!usuario){
      throw new NotFoundException('Usuario não encontrado');
    }
    return usuario;
  }

  //Método para Atualizat um usuario
  async update(matricula: number, updateUsuarioDto: UpdateUsuarioDto): Promise<void> {
    // Atualize o usuário diretamente no banco de dados
    const result = await this.usuariosRepository.update(matricula, updateUsuarioDto);
    
    if (result.affected === 0) {
        throw new Error('Usuário não encontrado ou nenhuma alteração feita');
    }
}

  //Método para Remover um Usuario
  async remove(matricula: number): Promise<void> {
    const usuario = await this.findOne(matricula);
    await this.usuariosRepository.remove(usuario);
  }
}
