
import { Body, Controller, Post, HttpCode, HttpStatus, UseGuards, Request, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './passport/local-auth.guard';
import { JwtAuthGuard } from './passport/jwt-auth.guard';
import { Public } from 'src/decorator/custumize';
import { GoogleAuthGuard } from './google/google-oauth.guard';

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
    @Get('google')
    @UseGuards(GoogleAuthGuard)
    async googleAuth(@Req() req) {
        console.log(req);

    }
    @Public()
    @Get('google/redirect')
    @UseGuards(GoogleAuthGuard)
    googleAuthRedirect(@Req() req) {
        console.log(req.user);

        return this.authService.login(req)
    }

}
