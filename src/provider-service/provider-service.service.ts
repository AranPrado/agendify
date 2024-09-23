import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateProviderServiceDto } from './dto/create-provider-service.dto';
import { UpdateProviderServiceDto } from './dto/update-provider-service.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProviderServiceService {

  constructor(private prisma:PrismaService){}

  async create(idProvider: number, createProviderServiceDto: CreateProviderServiceDto) {
    const filterProvider = await this.prisma.provider.findUnique({
      where: {id: idProvider}
    })

    if(!filterProvider){
      return{
        statusCode: HttpStatus.BAD_REQUEST,
        message: "Prestador não encontrado"
      }
    }

    const createdService = await this.prisma.providerService.create({
      data: {
        ...createProviderServiceDto
      }
    })

    return {
      statusCode: HttpStatus.OK,
      data: createdService
    }

  }

  async findAllServiceProvider(idProvider:number){

    const filterProvider = await this.prisma.provider.findUnique({
      where: {id: idProvider}
    })

    const filterServicerProvider = await this.prisma.providerService.findMany({
      where: {idProvider: idProvider}
    })


    if(!filterServicerProvider){
      return{
        statusCode: HttpStatus.BAD_REQUEST,
        message: "Prestador não encontrado"
      }
    }


    return {
      statusCode: HttpStatus.OK,
      data: filterServicerProvider,
      infoProvider: filterProvider
    }

  }

  async findUniqueServiceProvider(idProvider:number,idService:number){
    const filterProvider = await this.prisma.provider.findUnique({
      where: {id: idProvider}
    })


    const filterService = await this.prisma.providerService.findUnique({
      where: {id: idService, idProvider: idProvider}
    })

    if(!filterService){
      return{
        statusCode: HttpStatus.BAD_REQUEST,
        message: "Prestador não encontrado"
      }
    }

    return {
      statusCode: HttpStatus.OK,
      data: filterService,
      infoProvider: filterProvider
    }



  }

  async findAllService(){
    const returnAll = await this.prisma.providerService.findMany()

    return {
      statusCode: HttpStatus.OK,
      data: returnAll
    }
  }

  async updateServiceProvider(idProvider: number, idService:number, updateProviderServiceDto: UpdateProviderServiceDto) {
    const filterService = await this.prisma.providerService.findUnique({
      where: {id: idService, idProvider: idProvider}
    })

    if(!filterService){
      return{
        statusCode: HttpStatus.BAD_REQUEST,
        message: "Serviço não encontrado!"
      }
    }

    const clearUpdate = this.removeEmptyFields(updateProviderServiceDto)

    const updateService = await this.prisma.providerService.update({
      where: {id: idService, idProvider: idProvider},
      data: clearUpdate
    })

    return {
      statusCode: HttpStatus.OK,
      message: "Serviço alterado com sucesso!",
      data: updateService
    }


  }

  async removeService(idProvider:number, idService:number) {
    const filterService = await this.prisma.providerService.findUnique({
      where: {id: idService, idProvider: idProvider}
    })

    if(!filterService){
      return{
        statusCode: HttpStatus.BAD_REQUEST,
        message: "Serviço não encontrado!"
      }
    }

    const remove = await this.prisma.providerService.delete({
      where: {id: idService, idProvider:idProvider}
      
    })

    return {
      statusCode: HttpStatus.OK,
      message: "Serviço excluido com sucesso!"
    }
  }

  removeEmptyFields<T>(obj: T): T {
    return Object.fromEntries(
      Object.entries(obj).filter(([_, value]) => value !== '' && value !== null && value !== undefined)
    ) as T;
  }
  
}
