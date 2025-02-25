import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateUsersDto {
    @IsNotEmpty()
    username: string;
    @IsNotEmpty()
    password: string;
    @IsOptional()
    name: string;
    @IsOptional()
    email: string;
    @IsOptional()
    phonenumber: string;










}
