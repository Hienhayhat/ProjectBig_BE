import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    price: string;
    @IsNotEmpty()
    type: string;
    @IsNotEmpty()
    description: string;
    @IsOptional()
    img: string;






}
