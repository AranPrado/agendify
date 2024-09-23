import { PartialType } from '@nestjs/mapped-types';
import { CreateReviewDto } from './create-review.dto';
import { IsInt, IsString } from 'class-validator';

export class UpdateReviewDto extends PartialType(CreateReviewDto) {

    @IsInt()
    rating?:number

    @IsString()
    comment?:string
}
