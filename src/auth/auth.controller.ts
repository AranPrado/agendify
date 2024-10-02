import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { RegisterClients, RegisterProvider } from './dto/registerDto';
import { Gender } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register/clients')
  registerClients(
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('name') name: string,
    @Body('gender') gender: Gender,
    @Body('age') age:number,


) {
    return this.authService.registerClient(email, password, name, gender, age)
  }

  @Post('register/providers')
  registerProviders(
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('name') name: string,
    @Body('gender') gender: Gender,
    @Body('age') age:number,
    @Body('aboutMe') aboutMe:string,
  ) {
    return this.authService.registerProvider(email, password, name, gender, age, aboutMe)
  }

  @Post('login')
  login(
    @Body('email') email:string,
    @Body('password') password:string,
    @Body('type') type: 'clients' | 'provider'
  ){

    return this.authService.login(email,password,type)

  }

  @Post('recover-password')
  recoverPassword(
    @Body('email') email: string,
    @Body('newPassword') newPassword:string,
    @Body('type') type: 'clients' | 'provider'
  ){
    return this.authService.recoverPassword(email,newPassword,type)
  }


}
