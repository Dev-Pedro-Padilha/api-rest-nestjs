import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, Res, Query } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from './multer.config';
import { UploadedFile } from '@nestjs/common';
import { File } from 'multer';
import { Response } from 'express';
import { join } from 'path';
import { existsSync } from 'fs';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Carros')
@Controller('cars')
export class CarsController {

  constructor(private readonly carsService: CarsService) {}

  @Post()
  @ApiOperation({ summary: 'Create Car' })
  @UseInterceptors(FileInterceptor('image', multerOptions))
  async create(@UploadedFile() file: File, @Body() createCarDto: CreateCarDto) {
    if(file){
      createCarDto.image = file.path;
    }

    return this.carsService.create(createCarDto);
  }

  @Get()
  @ApiOperation({ summary: 'Find All Cars' })
  findAll() {
    return this.carsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find by One Car' })
  findOne(@Param('id') id: string) {
    return this.carsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update One Car' })
  @UseInterceptors(FileInterceptor('image', multerOptions))
  update(@Param('id') id: string, @UploadedFile() file: File, @Body() updateCarDto: UpdateCarDto) {
    if (file){
      updateCarDto.image = file.path;
    }
    return this.carsService.update(+id, updateCarDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete One Car' })
  remove(@Param('id') id: string) {
    return this.carsService.remove(+id);
  }

  // Método para baixar ou visualizar a imagem
  @Get('file/:filename')
  @ApiOperation({ summary: 'Baixa Imagem' })
  handleFile(
    @Param('filename') filename: string, 
    @Res() res: Response, 
    @Query('download') download?: string,
  ) {
    const filePath = join(process.cwd(), 'uploads', filename);

    // Verifica se o arquivo existe
    if (!existsSync(filePath)) {
      return res.status(404).json({ message: 'Arquivo não encontrado' });
    }

    // Define o cabeçalho de Content-Disposition para forçar download
    if (download === 'true') {
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    }

    // Define o tipo de conteúdo
    res.setHeader('Content-Type', 'image/png'); // Altere para o tipo correto se necessário
    return res.sendFile(filePath);
  }






}
