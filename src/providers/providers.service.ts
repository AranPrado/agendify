import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class ProvidersService {
  
  constructor(private prisma:PrismaService){}


  async findUniqueProvider(id:number){
    const filterProvider = await this.prisma.provider.findUnique({
      where: {id: id}
    })

    if(!filterProvider){
      return{
        statusCode: HttpStatus.BAD_REQUEST,
        message: "Prestador não encontrado"
      }
    }

    return {
      statusCode: HttpStatus.OK,
      data: filterProvider
    }
  }

  async updateProvider(id:number, updateProvider:UpdateProviderDto){
    const filterProvider = await this.prisma.provider.findUnique({
      where: {id: id}
    })

    if(updateProvider.password){
      updateProvider.password = await bcrypt.hash(updateProvider.password, 10)
    }

    if(!filterProvider){
      return{
        statusCode: HttpStatus.BAD_REQUEST,
        message: "Prestador não encontrado"
      }
    }


    

    const updateClear = this.removeEmptyFields(updateProvider)



    const update = await this.prisma.provider.update({
      where: {id: id},
      data: updateClear
    })

    return {
      statusCode: HttpStatus.OK,
      message: "Prestador atualizado com sucesso!",
      data: update
    }



  }

  async deleteProvider(id:number){
    const filterProvider = await this.prisma.provider.findUnique({
      where: {id: id}
    })

    if(!filterProvider){
      return{
        statusCode: HttpStatus.BAD_REQUEST,
        message: "Prestador não encontrado"
      }
    }

    const providerDelete = await this.prisma.provider.delete({
      where: {id: id}
    })

    return {
      statusCode: HttpStatus.OK,
      message: "Prestador deletado com sucesso!"
    }
  }



  removeEmptyFields<T>(obj: T): T {
    return Object.fromEntries(
      Object.entries(obj).filter(([_, value]) => value !== '' && value !== null && value !== undefined)
    ) as T;
  }
  

}
