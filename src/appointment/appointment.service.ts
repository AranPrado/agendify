import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AppointmentStatus } from '@prisma/client';

@Injectable()
export class AppointmentService {

  constructor(private prisma: PrismaService) { }



  async findAllProvider(idProvider: number) {
    // Busca todos os agendamentos onde o serviço pertence ao prestador
    const filterAllAppointment = await this.prisma.appointment.findMany({
      where: {
        ProviderService: {
          idProvider: idProvider,  // Filtra pelo id do prestador
        },
      },
      include: {
        ProviderService: true,  // Inclui informações do serviço
        Clients: true,  // Inclui informações do cliente, se necessário
      },
    });


    return {
      statusCode: HttpStatus.OK,
      data: filterAllAppointment,
    };
  }

  async findOneProvider(idProvider: number, idAppointment: number) {

    const filterOneAppointment = await this.prisma.appointment.findFirst({
      where: {
        id: idAppointment,
        ProviderService: {
          idProvider: idProvider
        }
      },
      include: {
        ProviderService: true,
        Clients: true,
      }
    })

    return {
      statusCode: HttpStatus.OK,
      data: filterOneAppointment
    }

  }

  async updateCompletedProvider(idAppointment: number, idProvider: number) {

    // Busca o agendamento pelo ID
    const filterAppointment = await this.prisma.appointment.findUnique({
      where: { id: idAppointment },
      include: { ProviderService: true }  // Inclui os detalhes do serviço associado
    });

    // Verifica se o agendamento existe
    if (!filterAppointment) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: "Agendamento não encontrado!"
      }

    }

    // Verifica se o serviço do agendamento pertence ao prestador
    if (filterAppointment.ProviderService.idProvider !== idProvider) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: "Prestador não autorizado a confirmar este agendamento!"
      }

    }

    // Atualiza o status do agendamento para "CONFIRMED"
    const updatedAppointment = await this.prisma.appointment.update({
      where: { id: idAppointment },
      data: {
        statusProvider: 'completed' // Supondo que "CONFIRMED" seja um status válido em sua enumeração AppointmentStatus
      }
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'Serviço finalizado com sucesso!',
      data: updatedAppointment,
    };
  }

  async updateRejectdProvider(idAppointment: number, idProvider: number) {
    // Busca o agendamento pelo ID
    const filterAppointment = await this.prisma.appointment.findUnique({
      where: { id: idAppointment },
      include: { ProviderService: true }  // Inclui os detalhes do serviço associado
    });

    // Verifica se o agendamento existe
    if (!filterAppointment) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: "Agendamento não encontrado!"
      }

    }

    // Verifica se o serviço do agendamento pertence ao prestador
    if (filterAppointment.ProviderService.idProvider !== idProvider) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: "Prestador não autorizado a confirmar este agendamento!"
      }

    }

    // Atualiza o status do agendamento para "CONFIRMED"
    const updatedAppointment = await this.prisma.appointment.update({
      where: { id: idAppointment },
      data: {
        statusProvider: 'rejectd' // Supondo que "CONFIRMED" seja um status válido em sua enumeração AppointmentStatus
      }
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'Agendamento rejeitado com sucesso',
      data: updatedAppointment,
    };
  }

  async createAppointmentClient(idService: number, idClient: number, createAppointmentDto: CreateAppointmentDto) {
    const filterService = await this.prisma.providerService.findUnique({
      where: { id: idService }
    })

    const filterClient = await this.prisma.clients.findUnique({
      where: { id: idClient }
    })

    if (!filterClient) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Cliente não encontrado!'
      }
    }

    if (!filterService) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Serviço não encontrado!'
      }
    }

    if (filterService.status === 'unavailable') {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: "Serviço indisponivel no momento!"
      }
    }

    const createdAppointment = await this.prisma.appointment.create({
      data: {
        ...createAppointmentDto,
        statusClient: "pending",
        statusProvider: "pending"
      }
    })

    return {
      statusCode: HttpStatus.OK,
      message: "Serviço agendado com sucesso!",
      data: createdAppointment
    }


  }

  async findAllClient(idClient: number) {
    const filterAllAppointment = await this.prisma.appointment.findMany({
      where: { idClient: idClient }
    })

    if (!filterAllAppointment) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: "Cliente não encontrado"
      }
    }

    return {
      statusCode: HttpStatus.OK,
      data: filterAllAppointment
    }
  }

  async findOneClient(idClient: number, idAppointment: number) {
    const filterUniqueAppointment = await this.prisma.appointment.findUnique({
      where: { id: idAppointment, idClient: idClient }
    })

    if (!filterUniqueAppointment) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: "Agendamento não encontrado!"
      }
    }

    return {
      statusCode: HttpStatus.OK,
      data: filterUniqueAppointment
    }
  }

  async updateCancelClient(idClient: number, idAppointment: number, ) {

    const filterUniqueAppointment = await this.prisma.appointment.findUnique({
      where: { id: idAppointment, idClient: idClient }
    })

    if (!filterUniqueAppointment) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: "Agendamento não encontrado!"
      }
    }

    const updateCancelAppointment = await this.prisma.appointment.update({
      where: { id: idAppointment, idClient: idClient },
      data: {
        statusClient: 'canceled'
      }
    })

    return {
      statusCode: HttpStatus.OK,
      message: "Serviço cancelado com sucesso!"
    }
  }


  async updateConfirmClient(idClient: number, idAppointment: number) {

    const filterUniqueAppointment = await this.prisma.appointment.findUnique({
      where: { id: idAppointment, idClient: idClient }
    })

    if (!filterUniqueAppointment) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: "Agendamento não encontrado!"
      }
    }

    const updateCancelAppointment = await this.prisma.appointment.update({
      where: { id: idAppointment, idClient: idClient },
      data: {
        statusClient: 'completed'
      }
    })

    return {
      statusCode: HttpStatus.OK,
      message: "Serviço confirmado pelo o cliente com sucesso!"
    }
  }

}
