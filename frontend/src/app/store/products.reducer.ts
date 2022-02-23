import { createReducer, on } from '@ngrx/store';
import {
  createProductFailure,
  createProductRequest,
  createProductSuccess,
  fetchProductsFailure,
  fetchProductsRequest,
  fetchProductsSuccess
} from './products.actions';
import { ProductsState } from './types';

const initialState: ProductsState = {
  products: [],
  fetchLoading: false,
  fetchError: null,
  createLoading: false,
  createError: null,
};

export const productsReducer = createReducer(
  initialState,
  on(fetchProductsRequest, state => ({...state, fetchLoading: true})),
  on(fetchProductsSuccess, (state, {products}) => ({
    ...state,
    fetchLoading: false,
    products
  })),
  on(fetchProductsFailure, (state, {error}) => ({
    ...state,
    fetchLoading: false,
    fetchError: error
  })),
  on(createProductRequest, state => ({...state, createLoading: true})),
  on(createProductSuccess, state => ({...state, createLoading: false})),
  on(createProductFailure, (state, {error}) => ({
    ...state,
    createLoading: false,
    createError: error,
  }))
);
