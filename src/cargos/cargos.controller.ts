import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CargosService } from './cargos.service';
import { CreateCargoDto } from './dto/create-cargo.dto';
import { UpdateCargoDto } from './dto/update-cargo.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@Controller('cargos')
@ApiTags('Cargos')
export class CargosController{
    constructor(private readonly cargosService: CargosService){}

    //Endpoint para criar Cargos
    @Post()
    @ApiOperation({ summary: 'Create cargo' })
    create(@Body() createCargoDto: CreateCargoDto){
        return this.cargosService.createCargo(createCargoDto);
    }

    //Endpoint para retornar todos os Cargos
    @Get()
    @ApiOperation({ summary: 'Find All Cargos' })
    findAll(){
        return this.cargosService.findAll();
    }

    //Endpoint para retornar cargo especifico pelo id
    @Get(':id')
    @ApiOperation({ summary: 'Find One Cargo' })
    findOne(@Param('id') id:string){
        return this.cargosService.findOne(+id);
    }

    //Endpoint para atualizar um Cargo
    @Patch(':id')
    @ApiOperation({ summary: 'Update One Cargo' })
    update(@Param('id') id:string, @Body() UpdateCargoDto: UpdateCargoDto) {
        return this.cargosService.update(+id, UpdateCargoDto);
    }

    //Endpoint para deletar um Cargo
    @Delete(':id')
    @ApiOperation({ summary: 'Delete One Cargo' })
    remove(@Param('id') id: string){
        return this.cargosService.remove(+id);
    }
    
}