import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ClientsService {
  constructor(private prisma:PrismaService){}
  

  async filterUniqueClient(id: number) {
    const filterClientUnique = await this.prisma.clients.findUnique({
      where: {id: id}
    })

    if(!filterClientUnique) {return {statusCode: HttpStatus.BAD_REQUEST, message: "Cliente não encontrado!"}}

    return {
      statusCode: HttpStatus.OK,
      data: filterClientUnique
    }
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    const filterClientUnique = await this.prisma.clients.findUnique({
      where: {id: id}
    })

    if(!filterClientUnique) {return {statusCode: HttpStatus.BAD_REQUEST, message: "Cliente não encontrado!"}}

    const clearClient = this.removeEmptyFields(updateClientDto);

    const updateClient = await this.prisma.clients.update({
      where: {id: id},
      data: clearClient
    })

    return {
      statusCode: HttpStatus.OK,
      data: updateClient,
      message: "Cliente atualizado com sucesso!"
    }

  }

  async remove(id: number) {
    const filterClientUnique = await this.prisma.clients.findUnique({
      where: {id: id}
    })

    if(!filterClientUnique) {return {statusCode: HttpStatus.BAD_REQUEST, message: "Cliente não encontrado!"}}

    const removeClient = await this.prisma.clients.delete({
      where: {id: id}
    })

    return {
      statusCode: HttpStatus.OK,
      message: "Cliente excluido com sucesso!"
    }
  }

  removeEmptyFields<T>(obj: T): T {
    return Object.fromEntries(
      Object.entries(obj).filter(([_, value]) => value !== '' && value !== null && value !== undefined)
    ) as T;
  }
}
