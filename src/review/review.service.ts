import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class ReviewService {
  constructor(private prisma:PrismaService){}

  async create(idClient: number, idAppointment: number, createReviewDto: CreateReviewDto) {
    // Verifica se o agendamento existe e se pertence ao cliente
    const filterService = await this.prisma.appointment.findFirst({
      where: {
        id: idAppointment,
        idClient: idClient
      }
    });
  
    if (!filterService) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: "Agendamento não encontrado"
      };
    }

    const createdReview = await this.prisma.review.create({
      data: {
        ...createReviewDto,
        reviewDate: new Date()
      }
    })

    return {
      statusCode: HttpStatus.OK,
      data: createdReview
    }
  
    
  }
  

  async update(idReview: number, updateReviewDto: UpdateReviewDto) {
    const filterReview = await this.prisma.review.findUnique({
      where: {id: idReview}
    })

    if(!filterReview){
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: "Avaliação não encontrada!"
      }
    }

    const clearUpdate = this.removeEmptyFields(updateReviewDto)

    const updateReview = await this.prisma.review.update({
      where: {id: idReview},
      data: clearUpdate
    })

    return {
      statusCode: HttpStatus.OK,
      message: "Avaliação atualizada com sucesso!",
    }
  }

  async remove(idReview: number) {
    const filterReview = await this.prisma.review.findUnique({
      where: {id: idReview}
    })

    if(!filterReview){
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: "Avaliação não encontrada!"
      }
    }

    const deleteReview = await this.prisma.review.delete({
      where: {id: idReview},
      
    })

    return {
      statusCode: HttpStatus.OK,
      message: "Avaliação deletada com sucesso!"
    }
  }

  async findAllReviewService(idService:number){

    const filterReviewAll = await this.prisma.review.findMany({
      where: {idService: idService},
      include: {
        Clients: true
      }
    })


    return {
      statusCode: HttpStatus.OK,
      data: filterReviewAll
    }

  }


  removeEmptyFields<T>(obj: T): T {
    return Object.fromEntries(
      Object.entries(obj).filter(([_, value]) => value !== '' && value !== null && value !== undefined)
    ) as T;
  }
}
