import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, Res, StreamableFile, Req, } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express'
import { GetImgProductDto } from './dto/getImg-product.dto';



@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post('/file')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return file.fieldname
  }
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    console.log(createProductDto);
    return this.productsService.create(createProductDto);
  }
  @Get('/img')
  getFile(@Body() img: GetImgProductDto) {
    console.log(img);

    // const file = createReadStream(join(process.cwd(), `/uploads/${req}`));
    // file.pipe(res);
    return 'good'
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
