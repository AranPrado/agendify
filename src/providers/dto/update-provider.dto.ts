import { PartialType } from '@nestjs/mapped-types';
import { CreateProviderDto } from './create-provider.dto';
import { Gender } from '@prisma/client';
import { IsString } from 'class-validator';

export class UpdateProviderDto extends PartialType(CreateProviderDto) {

    @IsString()
    name?:string
    
    @IsString()
    email?:string

    @IsString()
    password?:string
    
    @IsString()
    aboutMe?: string
}
