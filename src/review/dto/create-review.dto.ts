import { IsInt, IsString } from "class-validator";

export class CreateReviewDto {

    @IsInt()
    rating:number

    @IsString()
    comment?:string

    @IsInt()
    idClient:number

    @IsInt()
    idService:number
}
