import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Product } from './products/schema/product.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports:
    [MongooseModule.forRootAsync({
      imports: [ConfigModule.forRoot({
        isGlobal: true,
      })],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DB_URL'),
      }),
      inject: [ConfigService],

    }), ProductsModule, ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // Path to your images folder
    }),
      AuthModule,
      UsersModule,
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

}  
