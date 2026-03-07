import { Controller, Body, Get, Param, UseGuards, Put, Delete, ParseIntPipe, ParseUUIDPipe, Post, Query } from '@nestjs/common';
// import { AuthGuard } from '';
import { Roles } from '../../decorators/roles.decorator';
// import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { PlatosService } from './platos.service';
import { UpdatePlatosDto } from './dto/update-platos.dto';
import { CreatePlatosDto } from './dto/create-platos.dto';

@Controller('platos')
// @UseGuards(AuthGuard)
export class PlatosController {
  constructor(private readonly platosService: PlatosService) {}

  // @ApiBearerAuth()
  // @Get()
  // // @Roles('admin')
  // // @UseGuards(RolesGuard) 
  // getPlatos() {
  //   return this.platosService.findAll();
  // }

  @Get()
  getPlatos(@Query('page') page: number = 1, @Query('limit') limit: number = 5) {
    return this.platosService.getPlatos(page, limit);
  }

  @Post('seeder')
  seedPlatos() {
    return this.platosService.seeder();
  }

  // @ApiBearerAuth()
  // @Get(':id')
  // // @Roles('admin')
  // // @UseGuards(RolesGuard)
  // getPlato(@Param('id', ParseUUIDPipe) id: string) {
  //   return this.platosService.findOne(id);
  // }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.platosService.findOne(id);
  }

  // @ApiBearerAuth()
  // // @UseGuards(AuthGuard)
  // @Put(':id')
  // update(@Param('id', ParseUUIDPipe) id: string, @Body() updatePlatosDto: UpdatePlatosDto) {
  //   return this.platosService.update(id, updatePlatosDto);
  // }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() updatePlatosDto: UpdatePlatosDto
  ) {
    return this.platosService.update(id, updatePlatosDto);
  }

  @ApiBearerAuth()
  @Post()
  create(@Body() createPlatoDto: CreatePlatosDto) {
    return this.platosService.create(createPlatoDto);
  }
  

  // @ApiBearerAuth()
  // // @Roles('admin')
  // // @UseGuards(AuthGuard, RolesGuard)
  // @Delete(':id')
  // remove(@Param('id', ParseUUIDPipe) id: string) {
  //   return this.platosService.remove(id);
  // }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.platosService.remove(id);
  }
}
