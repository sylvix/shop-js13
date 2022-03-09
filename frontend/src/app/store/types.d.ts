import { Product } from '../models/product.model';
import { LoginError, RegisterError, User } from '../models/user.model';

export type ProductsState = {
  products: Product[],
  fetchLoading: boolean,
  fetchError: null | string,
  createLoading: boolean,
  createError: null | string,
};

export type UsersState = {
  user: null | User,
  registerLoading: boolean,
  registerError: null | RegisterError,
  loginLoading: boolean,
  loginError: null | LoginError,
}

export type AppState = {
  products: ProductsState,
  users: UsersState,
}
