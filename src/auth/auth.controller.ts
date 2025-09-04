
import { Body, Controller, Post, HttpCode, HttpStatus, UseGuards, Get, Req, Res, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './passport/local-auth.guard';
import { JwtAuthGuard } from './passport/jwt-auth.guard';
import { Public } from 'src/decorator/custumize';

@Controller()
export class AuthController {
    constructor(private authService: AuthService) { }

    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Request() req) {

        return this.authService.login(req.user);
    }


    @Post('auth/logout')
    async logout(@Request() req) {
        return req.logout();
    }

    @Public()
    @Post('auth/google')
    async googleLogin(@Body() body: { accessToken: string }) {
        return this.authService.HandleLoginWithGoogle(body.accessToken);
    }


}
