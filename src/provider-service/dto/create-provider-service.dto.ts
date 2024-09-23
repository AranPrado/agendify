import { ServiceStatus } from "@prisma/client";
import { IsNumber, IsString } from "class-validator";

export class CreateProviderServiceDto {

    @IsString()
    serviceName: string

    @IsString()
    serviceDescription: string

    @IsString()
    status: ServiceStatus

    

    @IsNumber()
    idProvider: number
}
