import { Product } from '../models/product.model';

export type ProductsState = {
  products: Product[],
  fetchLoading: boolean,
  fetchError: null | string,
  createLoading: boolean,
  createError: null | string,
};

export type AppState = {
  products: ProductsState
}
