import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from './schema/users.schema';
import { Model } from 'mongoose';
import { CreateUsersDto } from './dto/create-users.dto';
import { HashPass } from 'src/helper/hashpass';

@Injectable()
export class UsersService {
    constructor(@InjectModel(Users.name) private UsersModel: Model<Users>) { }

    async create(createUsersDto: CreateUsersDto): Promise<Users> {
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
    // async findOne(id: string): Promise<Users | null> {
    //     return this.UsersModel.findOne({ id }).exec();
    // }
}   
