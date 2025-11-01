import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from './schema/users.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-users.dto';
import { HashPass } from 'src/helper/hashpass';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel(Users.name) private UsersModel: Model<Users>) { }

    async create(createUsersDto: CreateUserDto): Promise<Users> {
        createUsersDto.password = await HashPass(createUsersDto.password);
        const createdUsers = new this.UsersModel(createUsersDto);
        return createdUsers.save();
    }
    async checkEmailExists(email) {
        const user = await this.UsersModel.findOne({ email })
        if (user) {
            return user;
        }
        return false;
    }
    async checkUsernameExists(username) {
        const user = await this.UsersModel.findOne({ username })
        if (user) {
            return user;
        }
        return false;
    }

    async findAll(): Promise<Users[]> {
        return this.UsersModel.find().exec();
    }
    async findByUsername(username: string): Promise<Users | null> {
        return this.UsersModel.findOne({ username }).exec();
    }
    async findByUserId(id: string): Promise<Users | null> {

        return this.UsersModel.findOne({ _id: id }).exec();
    }
    async remove(id: string): Promise<Users> {
        return this.UsersModel.findByIdAndDelete(id);
    }
    async update(id: string, updateUserDto: UpdateUserDto): Promise<Users> {
        return this.UsersModel.findByIdAndUpdate(id, updateUserDto, { new: true });
    }
}

