import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('review')
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post('createdReview/:idAppointment')
  async create(@Body('idClient') idClient:number, @Body('idAppointment') idAppointment:number,@Body() createReviewDto: CreateReviewDto) {
    
    return await this.reviewService.create(idClient,idAppointment,createReviewDto)

  }

  @Get('findAllReviewService/:idService')
  async findAll(@Param('idService') idService:number) {
    return await this.reviewService.findAllReviewService(idService)
  }

  
  @Patch('updateReview/:idReview')
  async update(@Param('idReview') idReview: number, @Body() updateReviewDto: UpdateReviewDto) {
    return await this.reviewService.update(idReview, updateReviewDto);
  }

  @Delete('deleteReview/:idReview')
  async remove(@Param('idReview') idReview: number) {
    return await this.reviewService.remove(idReview);
  }
}
