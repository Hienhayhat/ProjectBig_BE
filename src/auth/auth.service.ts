
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async signIn(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        const checkPassword: boolean = await bcrypt.compare(pass, user?.password);
        console.log(user);

        if (checkPassword) {
            const payload = { username: user.username };
            return {
                access_token: await this.jwtService.signAsync(payload),
            };
        }
    }
}
