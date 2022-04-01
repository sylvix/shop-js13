import { Controller, Get, Param, Post, Req } from "@nestjs/common";
import { Request } from 'express';

@Controller('products')
export class ProductsController {
  @Get()
  getAll() {
    return { message: 'All Products' };
  }

  @Post()
  create() {
    return { message: 'Create product' };
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return { message: `Product ID: ${id}` };
  }
}
