import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import {ApiTags, ApiOperation} from '@nestjs/swagger';

@Controller('users')
@ApiTags('Usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  @ApiOperation({summary: 'Create User'})
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }

  @Get()
  @ApiOperation({summary: 'Find All Users'})
  findAll() {
    return this.usuariosService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary: 'Find One User'})
  findOne(@Param('id') id: string) {
    return this.usuariosService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({summary: 'Update One User'})
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.update(+id, updateUsuarioDto);
  }

  @Delete(':id')
  @ApiOperation({summary: 'Remove One User'})
  remove(@Param('id') id: string) {
    return this.usuariosService.remove(+id);
  }
}
