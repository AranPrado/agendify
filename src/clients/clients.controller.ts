import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

 
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.clientsService.filterUniqueClient(id);
  }

  
  @Patch('update/:id')
  update(@Param('id') id: number, @Body() updateClientDto: UpdateClientDto) {
    return this.clientsService.update(id, updateClientDto)
  }

  
  @Delete('delete/:id')
  remove(@Param('id') id: number) {
    return this.clientsService.remove(id);
  }
}
