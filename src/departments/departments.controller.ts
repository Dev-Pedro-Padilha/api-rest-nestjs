import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@Controller('departments')
@ApiTags('Departments')
export class DepartmentsController{
    constructor(private readonly departmentsService: DepartmentsService){}

    //Endpoint para criar Departamento
    @Post()
    @ApiOperation({summary: 'Create department'})
    create(@Body() createDepartmentDto: CreateDepartmentDto){
        return this.departmentsService.createDepartment(createDepartmentDto);
    }

    //Endpoint para retornar todos Departamentos
    @Get()
    @ApiOperation({summary: 'Find All Departments'})
    findAll(){
        return this.departmentsService.findAll();
    }

    //Endpoint para retornar Departamento especifico pelo id
    @Get(':id')
    @ApiOperation({summary: 'Find One Department'})
    findOne(@Param('id') id: string){
        return this.departmentsService.findOne(+id);
    }

    //Endpoint para atualizar um Departamento
    @Patch(':id')
    @ApiOperation({summary: 'Update One Department'})
    update(@Param('id') id: string, @Body() UpdateDepartmentDto: UpdateDepartmentDto){
        return this.departmentsService.update(+id, UpdateDepartmentDto);
    }

    //Endpoint para deletar um Departamento
    @Delete(':id')
    @ApiOperation({summary: 'Delete One Department'})
    remove(@Param('id') id: string){
        return this.departmentsService.remove(+id);
    }

}