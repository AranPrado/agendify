import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Gender } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) { }



  async registerClient(email: string, password: string, name: string, gender: Gender, age: number) {

    const hashPassword = await bcrypt.hash(password, 10)


    const createdClient = await this.prisma.clients.create({
      data: {
        email,
        password: hashPassword,
        name,
        gender,
        age,
      }
    });

    return {
      status: HttpStatus.CREATED,
      message: "Cliente cadastrado com sucesso!",
      data: createdClient
    }
  }

  async registerProvider(email: string, password: string, name: string, gender: Gender, age: number, aboutMe: string) {

    const hashPassword = await bcrypt.hash(password, 10)

    const createdProvider = await this.prisma.provider.create({
      data: {
        email,
        password: hashPassword,
        name,
        gender,
        age,
        aboutMe
      }
    })

    return {
      status: HttpStatus.CREATED,
      message: "Prestador cadastrado com sucesso!",
      data: createdProvider
    }

  }

  async login(email: string, password: string, typeValidate: 'clients' | 'provider') {

    if (typeValidate === 'clients') {
      const filterClient = await this.prisma.clients.findUnique({
        where: { email }
      })

      const infoClientLogin = {
        id: filterClient.id,
        name: filterClient.name,
        email: filterClient.email,
        age: filterClient.age,
        gender: filterClient.gender,
        
      }

      if (!filterClient) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: "Email invalido!"
        }
      }

      const isPasswordValid = await bcrypt.compare(password, filterClient.password);

      if (!isPasswordValid) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: "Senha invalida!"
        }
      }

      const token = this.generateToken(infoClientLogin, 'clients');

      

      return token;

    }

    //////////////////////////////////////////////////////////////////

    else if (typeValidate === 'provider') {
      const filterProvider = await this.prisma.provider.findUnique({
        where: { email }
      })

      if (!filterProvider) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: "Prestador não encontrado!"
        }
      }

      const infoProviderLogin = {
        id: filterProvider.id,
        name: filterProvider.name,
        email: filterProvider.email,
        age: filterProvider.age,
        gender: filterProvider.gender,
        aboutMe: filterProvider.aboutMe
        
      }

      const isPasswordValid = await bcrypt.compare(password, filterProvider.password);

      if (!isPasswordValid) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: "Senha invalida!"
        }
      }

      const token = this.generateToken(infoProviderLogin, 'provider');

      return token;


    }

  }

  async recoverPassword(email: string, newPassword: string, typeValidate: 'clients' | 'provider') {

    if (typeValidate === 'clients') {
      const filterClient = await this.prisma.clients.findUnique({
        where: { email }
      })

      if (!filterClient) { return { statusCode: HttpStatus.BAD_REQUEST, message: "Email invalido!" } }

      const hashNewPassword = await bcrypt.hash(newPassword, 10);

      await this.prisma.clients.update({
        where: { email },
        data: {
          password: hashNewPassword
        }
      })

      return {
        statusCode: HttpStatus.OK,
        message: "Senha atualizada com sucesso!"
      }
    }
    ////////////////////////////////////////////////////////////////////////////
    
    else if (typeValidate === 'provider') {
      const filterProvider = await this.prisma.provider.findUnique({
        where: { email }
      })

      if (!filterProvider) { return { statusCode: HttpStatus.BAD_REQUEST, message: "Email invalido!" } }

      const hashNewPassword = await bcrypt.hash(newPassword, 10);

      await this.prisma.provider.update({
        where: { email },
        data: {
          password: hashNewPassword
        }
      })

      return {
        statusCode: HttpStatus.OK,
        message: "Senha atualizada com sucesso!"
      }
    }

  }

  validateUser(idUser: number, typeValidate: 'clients' | 'provider') {
    console.log(`Validando o tipo: ${typeValidate} com ID: ${idUser}`); // Log para depuração
    
    if (typeValidate === 'clients') {
      const client = this.prisma.clients.findUnique({
        where: { id: idUser }
      });
      console.log("Cliente encontrado:", client); // Log do cliente
      return client;
    } else if (typeValidate === 'provider') {
      const provider = this.prisma.provider.findUnique({
        where: { id: idUser }
      });
      console.log("Provedor encontrado:", provider); // Log do provedor
      return provider;
    }
  }
  


  private async generateToken(user: any,typeValidate: 'clients' | 'provider') {

    if(typeValidate === 'clients'){

      const payload = { email: user.email, sub: user.id }
  
      const updateTokenClient = await this.prisma.clients.update({
        where: {email: user.email},
        data: {
          accessToken: this.jwtService.sign(payload)
        }
      })
  
      return {
        statusCode: HttpStatus.CREATED,
        access_token: this.jwtService.sign(payload),
        data: user
      }
    } else if(typeValidate === 'provider'){
      const payload = { email: user.email, sub: user.id }
  
      const updateTokenProvider = await this.prisma.provider.update({
        where: {email: user.email},
        data: {
          accessToken: this.jwtService.sign(payload)
        }
      })
  
      return {
        statusCode: HttpStatus.CREATED,
        access_token: this.jwtService.sign(payload),
        data: user
      }
    }
  }


}


