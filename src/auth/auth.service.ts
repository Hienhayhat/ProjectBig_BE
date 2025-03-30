
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ComparePass } from 'src/helper/hashpass';
import { CreateUsersDto } from 'src/users/dto/create-users.dto';
import { UsersService } from 'src/users/users.service';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }
    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);

        const checkPassword: boolean = await ComparePass(pass, user.password);
        if (checkPassword) {
            return user;
        };
        return null;
    }
    async login(user: any) {
        const payload = { username: user.username, sub: user._id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
    async validateGoogleUser(googleUser: CreateUsersDto) {
        const user = await this.usersService.checkDuplicate(googleUser.email);
        if (user) return user;
        return await this.usersService.create(googleUser);
    }


}
