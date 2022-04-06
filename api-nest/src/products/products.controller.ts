import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from '../schemas/product.schema';
import { Model } from 'mongoose';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateProductDo } from './create-product.do';

@Controller('products')
export class ProductsController {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  @Get()
  getAll() {
    return this.productModel.find().populate('category', 'title');
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('image', { dest: './public/uploads/products' }),
  )
  create(
    @Body() productData: CreateProductDo,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const product = new this.productModel({
      category: productData.category,
      title: productData.title,
      price: productData.price,
      description: productData.description,
      image: file ? '/uploads/products/' + file.filename : null,
    });

    return product.save();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return { message: `Product ID: ${id}` };
  }
}
