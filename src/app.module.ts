import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Product } from './products/schema/product.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports:
    [MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DB_URL'),
      }),
      inject: [ConfigService],
    }), ProductsModule, ConfigModule.forRoot(),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }  
