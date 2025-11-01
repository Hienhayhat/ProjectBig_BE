import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Product } from './schema/product.schema';
import { Model } from 'mongoose';
import aqp from 'api-query-params';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private ProductModel: Model<Product>) {

  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.ProductModel(createProductDto);
    return createdProduct.save();
  }

  async findAll(query: string, pageSize: number, current: number) {
    const { filter, sort } = aqp(query);
    if (filter.current) delete filter.current
    if (filter.pageSize) delete filter.pageSize
    if (!pageSize) pageSize = null;
    if (!current) current = 1;
    const totalItem = (await this.ProductModel.find(filter)).length;
    const totalPage = Math.ceil(totalItem / pageSize)
    const skip = (current - 1) * (pageSize)
    const Product = await this.ProductModel
      .find(filter)
      .skip(skip)
      .limit(pageSize)
      .sort(sort as any)


    return { Product: Product, totalPage: totalPage };
  }

  findOne(id: string) {
    const data = this.ProductModel.findById(id)
    return data;
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    return this.ProductModel.findByIdAndUpdate(id, updateProductDto, { new: true });
  }

  async remove(id: string): Promise<Product> {
    return this.ProductModel.findByIdAndDelete(id);
  }


}
export class FileSizeValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    // "value" is an object containing the file's attributes and metadata
    const oneKb = 1000;
    return value.size < oneKb;
  }
}
