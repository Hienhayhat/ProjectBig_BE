import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ComparePass } from 'src/helper/hashpass';
import { UsersService } from 'src/users/users.service';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private http: HttpService
    ) { }
    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findByUsername(username);
        console.log('Validating user:', user);

        if (!user) {
            return null;
        } else {
            const checkPassword: boolean = await ComparePass(pass, user.password);
            if (checkPassword) {
                return user;
            };
            return null;
        }

    }
    async login(user: any) {
        const payload = { username: user.username, sub: user._id };
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                name: user.name || user.username,
                id: user._id,
            }
        };
    }


    async HandleLoginWithGoogle(token: string) {
        try {
            const response = await firstValueFrom(
                this.http.get(`${process.env.GOOGLE_INFO_URL}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }),
            );
            const googleUser = response.data;
            const createUser: any = {
                username: googleUser.email as string,
                name: googleUser.name as string,
                email: googleUser.email as string,
                password: googleUser.id as string, // Use Google ID as password for simplicity
            }
            const checkUser = await this.usersService.checkEmailExists(createUser.email);
            let user;
            if (!checkUser)
                user = await this.usersService.create(createUser);
            else
                user = await this.validateUser(createUser.username, createUser.password);

            const payload = { username: user.username, sub: user._id };
            return {
                access_token: this.jwtService.sign(payload),
                user: {
                    name: user.name || user.username,
                    id: user._id,
                }
            }
        } catch (err) {
            console.error('❌ Invalid Google token:', err.message);
            throw new UnauthorizedException('Invalid Google access token');
        }
    }


}
