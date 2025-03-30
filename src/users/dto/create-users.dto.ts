import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateUsersDto {


    @IsNotEmpty()
    username: string;
    @IsNotEmpty()
    password: string;
    @IsOptional()
    name: string;
    @IsNotEmpty()
    email: string;
    @IsOptional()
    phonenumber: string;
    @IsOptional()
    avatarUrl: string;










}
