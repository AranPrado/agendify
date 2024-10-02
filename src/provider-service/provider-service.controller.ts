import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProviderServiceService } from './provider-service.service';
import { CreateProviderServiceDto } from './dto/create-provider-service.dto';
import { UpdateProviderServiceDto } from './dto/update-provider-service.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('providers-service')
@Controller('provider-service')
export class ProviderServiceController {
  constructor(private readonly providerServiceService: ProviderServiceService) {}

  @Post('createdService/:id')
  create(@Param('id') id:number,@Body() createProviderServiceDto: CreateProviderServiceDto) {
    return this.providerServiceService.create(id,createProviderServiceDto);
  }

  @Get('findAllServiceProvider/:id')
  findAllServiceProvider(@Param('id') id:number) {
    return this.providerServiceService.findAllServiceProvider(id)
  }

  @Get('findServiceProvider/:idProvider/:idService')
  findServiceProvider(@Param('idProvider') idProvider: number, @Param('idService') idService:number){

    return this.providerServiceService.findUniqueServiceProvider(idProvider,idService)

  }

  @Get('findAllService')
  findAllServices(){
    return this.providerServiceService.findAllService()
  }

  

  @Patch('updateService/:idProvider/:idService')
  update(@Param('idProvider') idProvider:number,@Param('idService') idService:number, @Body() updateProviderServiceDto: UpdateProviderServiceDto) {

    return this.providerServiceService.updateServiceProvider(idProvider,idService,updateProviderServiceDto)
    
  }

  @Delete('deleteService/:idProvider/:idService')
  remove(@Param('idProvider') idProvider: number, @Param('idService') idService:number) {
    return this.providerServiceService.removeService(idProvider,idService)
  }
}
