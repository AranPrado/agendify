import { PartialType } from '@nestjs/mapped-types';
import { CreateProviderServiceDto } from './create-provider-service.dto';
import { IsString } from 'class-validator';
import { ServiceStatus } from '@prisma/client';

export class UpdateProviderServiceDto extends PartialType(CreateProviderServiceDto) {

    @IsString()
    serviceName?: string

    @IsString()
    serviceDescription?:string

    @IsString()
    status?: ServiceStatus

    
}
