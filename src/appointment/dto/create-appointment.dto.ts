import { AppointmentStatus } from "@prisma/client";
import { IsDateString, IsEnum, IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateAppointmentDto {

    @IsNotEmpty()
    @IsString()
    appointmentDate: string;  // Será uma string ISO de data
  
    @IsNotEmpty()
    @IsString()
    appointmentTime: string;  // Será uma string ISO de hora
  
    @IsInt()
    @IsNotEmpty()
    idClient: number;
  
    @IsInt()
    @IsNotEmpty()
    idService: number;
}
