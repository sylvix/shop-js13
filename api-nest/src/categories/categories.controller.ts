import { Body, Controller, Get, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from '../schemas/category.schema';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './create-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  @Get()
  getAll() {
    return this.categoryModel.find();
  }

  @Post()
  create(@Body() categoryDto: CreateCategoryDto) {
    const category = new this.categoryModel({
      title: categoryDto.title,
      description: categoryDto.description,
    });

    return category.save();
  }
}
