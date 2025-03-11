import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUsersDto } from './dto/create-users.dto';
const bcrypt = require('bcrypt');
const saltRounds = 10;

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post('register')
    async create(@Body() createUsersDto: CreateUsersDto) {
        try {
            const checkDuplicate = await this.usersService.checkDuplicate(createUsersDto.email);
            if (!checkDuplicate) {
                return this.usersService.create(createUsersDto);
            }
            return new UnauthorizedException({ message: 'Email already exists' });
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
    //     return this.usersService.findOne(+id);
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
