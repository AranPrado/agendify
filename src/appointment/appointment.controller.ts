import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { AppointmentStatus } from '@prisma/client';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post('createAppointmentClient')
  async createAppointmentClient(
    @Body('idService') idService: number,
    @Body('idClient') idClient: number,
    @Body() createdAppointment: CreateAppointmentDto
  ) {
    return await this.appointmentService.createAppointmentClient(idService, idClient, createdAppointment);
  }

  @Get('findAllProvider/:idProvider')
  async findAllProvider(@Param('idProvider') idProvider: number) {
    return await this.appointmentService.findAllProvider(idProvider);
  }

  @Get('findOneProvider/:idProvider/:idAppointment')
  async findOneProvider(
    @Param('idProvider') idProvider: number,
    @Param('idAppointment') idAppointment: number
  ) {
    return await this.appointmentService.findOneProvider(idProvider, idAppointment);
  }

  @Patch('updateConfirmProvider')
  async updateConfirmProvider(
    @Body('idProvider') idProvider: number,
    @Body('idAppointment') idAppointment: number
  ) {
    return await this.appointmentService.updateCompletedProvider(idAppointment, idProvider);
  }

  @Patch('updateRejectProvider')
  async updateRejectProvider(
    @Body('idProvider') idProvider: number,
    @Body('idAppointment') idAppointment: number
  ) {
    return await this.appointmentService.updateRejectdProvider(idAppointment, idProvider);
  }

  @Get('findAllClient/:idClient')
  async findAllClient(@Param('idClient') idClient: number) {
    return await this.appointmentService.findAllClient(idClient);
  }

  @Get('findOneClient/:idClient/:idAppointment')
  async findOneClient(
    @Param('idClient') idClient: number,
    @Param('idAppointment') idAppointment: number
  ) {
    return await this.appointmentService.findOneClient(idClient, idAppointment);
  }

  @Patch('updateCancelClient')
  async updateCancelClient(
    @Body('idClient') idClient: number,
    @Body('idAppointment') idAppointment: number,
    
  ) {
    return await this.appointmentService.updateCancelClient(idClient, idAppointment);
  }

  @Patch('updateConfirmClient')
  async updateConfirmClient(
    @Body('idClient') idClient: number,
    @Body('idAppointment') idAppointment: number,
    
  ) {
    return await this.appointmentService.updateConfirmClient(idClient, idAppointment);
  }
  
}
