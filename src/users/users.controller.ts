import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUsersDto } from './dto/create-users.dto';
import { Public } from 'src/decorator/custumize';
const bcrypt = require('bcrypt');
const saltRounds = 10;

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }
    @Public()
    @Post('register')
    async create(@Body() createUsersDto: CreateUsersDto) {
        try {
            const checkEmailExists = await this.usersService.checkEmailExists(createUsersDto.email);
            const checkUsernameExists = await this.usersService.checkUsernameExists(createUsersDto.username);
            if (!checkEmailExists && !checkUsernameExists) {
                await this.usersService.create(createUsersDto)
                return {
                    status: 201,
                    message: 'User created successfully',
                };
            } else {
                return {
                    status: 400,
                    message: 'Email or Username already exists',

                };
            }
        } catch (err) {
            throw new Error(err);
        }
    }

    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //     return this.usersService.findOne(id);
    // }

    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    //     return this.usersService.update(+id, updateUserDto);
    // }

    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //     return this.usersService.remove(+id);
    // }
}
