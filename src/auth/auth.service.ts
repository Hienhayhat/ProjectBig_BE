
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ComparePass } from 'src/helper/hashpass';
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

}
