import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schema/product.schema';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
@Module({
  imports: [MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  MulterModule.register({
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const filename = `${file.originalname}`;
        cb(null, filename);
      },
    }),
  }),],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule { }
