import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Product } from './products/schema/product.schema';

@Module({
  imports: [MongooseModule.forRoot('mongodb://root:123456@localhost:27017/'), ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
