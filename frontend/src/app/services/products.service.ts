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
            productData.id,
            productData.title,
            productData.price,
            productData.description,
            productData.image,
          );
        });
      })
    )
  }

  createProduct(productData: ProductData) {
    const formData = new FormData();
    formData.append('title', productData.title);
    formData.append('price', productData.price.toString());
    formData.append('description', productData.description);

    if (productData.image) {
      formData.append('image', productData.image);
    }

    return this.http.post(environment.apiUrl + '/products', formData);
  }
}
