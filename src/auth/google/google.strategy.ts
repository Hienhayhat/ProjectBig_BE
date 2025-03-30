import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { config } from 'dotenv';

import { Inject, Injectable } from '@nestjs/common';
import { log } from 'console';
import { AuthService } from '../auth.service';

config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {


    constructor(
        @Inject()
        private authService: AuthService,) {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: 'http://localhost:8000/google/redirect',
            scope: ['email', 'profile'],
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
        const user = await this.authService.validateGoogleUser({
            username: profile.emails[0].value,
            email: profile.emails[0].value,
            name: profile.name.givenName,
            avatarUrl: profile.photos[0].value,
            password: '',
            phonenumber: '',
        });
        // done(null, user);
        return user;



    }
}