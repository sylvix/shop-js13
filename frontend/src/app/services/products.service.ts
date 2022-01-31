import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product, ProductData } from '../models/product.model';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<Product[]>(environment.apiUrl + '/products').pipe(
      map(response => {
        return response.map(productData => {
          return new Product(
            productData.title,
            productData.price,
            productData.description,
            productData.id
          );
        });
      })
    )
  }

  createProduct(productData: ProductData) {
    return this.http.post(environment.apiUrl + '/products', productData);
  }
}
