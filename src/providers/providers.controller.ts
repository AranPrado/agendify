import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('providers')
@Controller('providers')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.providersService.findUniqueProvider(id);
  }

  @Patch('update/:id')
  update(@Param('id') id: number, @Body() updateProviderDto: UpdateProviderDto) {
    return this.providersService.updateProvider(id, updateProviderDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: number) {
    return this.providersService.deleteProvider(id);
  }
}
